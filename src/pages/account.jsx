import { Button, Col, Modal, QRCode, Row, Space, Typography } from 'antd';
import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import {
  useAccount,
  useContractRead,
  useEnsAvatar,
  useEnsName,
  useSignMessage,
} from 'wagmi';

import defaultProfile from '../../public/assets/images/default-profile.webp';
import ichiban from '../contracts/ichiban';
import cidToImageUrl from '../utils/cidToImageUrl';

const { Text } = Typography;

function ClaimModal({ isOpen, onClose, gameId, prize }) {
  const { address } = useAccount();

  const userNonce = useContractRead({
    address: ichiban.address,
    abi: ichiban.abi,
    functionName: 'getUsedNonces',
    args: [
      // player
      address,
    ],
  });

  const nonce = useMemo(() => {
    if (!userNonce.data) return null;
    // eslint-disable-next-line no-underscore-dangle
    if (userNonce.data._isBigNumber) {
      return userNonce.data.toNumber() + 1;
    }
    return userNonce.data + 1;
  }, [userNonce.data]);

  const expireTime = 123456789;
  const message = useMemo(() => {
    if (!nonce) return null;

    const hex = ethers.utils.solidityKeccak256(
      ['address', 'uint256', 'uint256', 'address', 'uint256', 'uint256'],
      [ichiban.address, gameId, prize.id, address, nonce, expireTime]
    );

    return ethers.utils.arrayify(hex);
  }, [gameId, prize.id, address, nonce]);

  const {
    data: signature,
    isLoading,
    signMessage,
  } = useSignMessage({
    message,
  });

  const deepLink = useMemo(() => {
    if (
      window &&
      gameId !== null &&
      prize &&
      address &&
      nonce &&
      expireTime &&
      signature
    ) {
      return `https://metamask.app.link/dapp/${window.location.host}/redeem?gameId=${gameId}&prizeType=${prize.id}&prizeOwner=${address}&nonce=${nonce}&expireTime=${expireTime}&signature=${signature}`;
    }
    return null;
  }, [gameId, prize, address, nonce, expireTime, signature]);

  return (
    <Modal
      title="Claim QRCode"
      open={isOpen}
      closable
      onCancel={onClose}
      footer={null}
      centered
    >
      <Space direction="vertical" size="middle">
        <p>Sign to generate claim QRcode</p>

        {deepLink && (
          <QRCode
            value={deepLink || '-'}
            isLoading={isLoading}
            size={200}
            style={{ margin: 'auto' }}
          />
        )}

        <Button
          onClick={() => {
            if (message) signMessage({ message });
          }}
          disabled={isLoading}
        >
          Sign
        </Button>
      </Space>
    </Modal>
  );
}

function List({ type, listTitle, data, onPrizeClaim }) {
  return (
    <>
      <Text style={{ fontSize: '24px' }}>{listTitle}</Text>
      <Col span={24} className="item-block">
        <Row gutter={[16, 12]}>
          {data.map((prize, j) => (
            <Col span={24} key={j}>
              <Row gutter={[20, 12]} justify="space-between" align="middle">
                <Col span={5}>
                  <div className="item-img-wrapper">
                    <Image
                      src={cidToImageUrl(prize.ipfs)}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                </Col>
                <Col span={10} className="prize">
                  {`${String.fromCharCode(prize.id + 65)} prize`}
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    shape="round"
                    size="middle"
                    onClick={() => {
                      if (type === 'prizes' && onPrizeClaim)
                        onPrizeClaim(prize);
                    }}
                  >
                    {type === 'prizes' ? 'Claim' : 'Details'}
                  </Button>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
}

async function fetcher(url, address, status) {
  if (address) {
    const res = await axios.get(
      `https://maildeep.info/app/game/player/prize?address=${address}&status=${
        status === 'prizes' ? 'ENABLE' : 'DISABLE'
      }`
    );
    if (res.data.code === 'G_0000') return res.data.data;
  }
  return null;
}

function Account() {
  const [type, setType] = useState('prizes'); // prizes / collected
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [claimPrize, setClaimPrize] = useState(null);
  const [isClaimModalOpen, setClaimModalOpen] = useState(false);

  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });

  const { data: gameList } = useSWR(
    ['PlayerGameList', address, type],
    ([url, addr, tabType]) => fetcher(url, addr, tabType)
  );

  return (
    <section className="account">
      <div className="content">
        <Row justify="space-between" gutter={32}>
          {/* 個人資訊 */}
          <Col span={5} className="content__info">
            <Row gutter={[16, 16]} style={{ position: 'sticky', top: '80px' }}>
              <Col span={24} className="profile-wrapper">
                <div className="profile">
                  <Image src={ensAvatar || defaultProfile} alt="" />
                </div>
              </Col>
              <Col span={24}>
                <Text className="name">{ensName || address}</Text>
              </Col>
            </Row>
          </Col>
          {/* 列表 */}
          <Col span={14}>
            <Row gutter={[24, 24]}>
              <Col span={24} className="list-area">
                {gameList &&
                Object.values(gameList.playerGameMap)[0] &&
                Object.values(gameList.playerGameMap)[0].length !== 0 ? (
                  <>
                    {Object.entries(gameList.playerGameMap).map((game) => (
                      <List
                        key={game[0]}
                        type={type}
                        data={game[1]}
                        listTitle={gameList.gameMap[game[0]].title}
                        onPrizeClaim={(prize) => {
                          setSelectedGameId(game[0]);
                          setClaimPrize(prize);
                          setClaimModalOpen(true);
                        }}
                      />
                    ))}
                  </>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
          {/* 頁籤 */}
          <Col sm={4} className="cate-area">
            <Row gutter={[36, 36]} style={{ position: 'sticky', top: '80px' }}>
              <Col span={24}>
                <Button
                  type="text"
                  shape="round"
                  className={type === 'prizes' ? 'active' : ''}
                  onClick={() => {
                    setType('prizes');
                    setSelectedGameId(null);
                  }}
                >
                  Prizes
                </Button>
              </Col>
              <Col span={24}>
                <Button
                  type="text"
                  shape="round"
                  className={type === 'collected' ? 'active' : ''}
                  onClick={() => {
                    setType('collected');
                    setSelectedGameId(null);
                  }}
                >
                  Collected
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {selectedGameId !== null && claimPrize && isClaimModalOpen && (
        <ClaimModal
          isOpen={isClaimModalOpen}
          onClose={() => {
            setClaimModalOpen(false);
          }}
          gameId={selectedGameId}
          prize={claimPrize}
        />
      )}
    </section>
  );
}

export default Account;
