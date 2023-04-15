import { Button, Col, Row, Space, Tag, Typography } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

// import { shortenAddress } from '@/utils/shortenAddress';
import defaultProfile from '../../public/assets/images/default-profile.webp';
import productImg from '../../public/assets/images/product.jpg';

const { Text } = Typography;

function List({ type, data }) {
  return (
    <Col span={24} className="item-block">
      <Row gutter={[16, 12]}>
        {data.map((item, j) => (
          <Col span={24} key={j}>
            <Row gutter={[20, 12]} justify="space-between" align="middle">
              <Col span={5}>
                <div className="item-img-wrapper">
                  <Image src={productImg} alt="" className="item-img" />
                </div>
              </Col>
              <Col span={4} className="prize">
                {item.id}
              </Col>
              <Col span={6} className="id">
                {item.ipfs}
              </Col>
              <Col span={6}>
                <Button type="primary" shape="round" size="middle">
                  {type === 'prizes' ? 'Claim' : 'Details'}
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

const fetcher = async (url, address, status) => {
  try {
    if (!address) return;
    const res = await axios.get(
      `http://35.243.96.89:9001/app/game/player/prize?address=${`0xB926660866633fe4D83E94Dd09E9e775999722b4`}&status=${
        status === 'prizes' ? 'ENABLE' : 'DISABLE'
      }`
    );
    if (res.data.code === 'G_0000') return res.data.data;
  } catch (err) {
    return err;
  }
};

function Account() {
  const [type, setType] = useState('prizes'); // prizes / collected
  const [selectedGameId, setSelectedGameId] = useState('');
  console.log({ selectedGameId });
  const prizeData = [
    [
      { type: 'A', id: '1240123123123' },
      { type: 'C', id: '1240123123123' },
    ],
    [{ type: 'E', id: '1240123123123' }],
    [
      { type: 'G', id: '1240123123123' },
      { type: 'G', id: '1240123123123' },
      { type: 'B', id: '1240123123123' },
    ],
    [{ type: 'E', id: '1240123123123' }],
    [
      { type: 'G', id: '1240123123123' },
      { type: 'G', id: '1240123123123' },
      { type: 'B', id: '1240123123123' },
    ],
  ];

  const collectData = [
    [
      { type: 'A', id: '1240123123123' },
      { type: 'C', id: '1240123123123' },
    ],
    [{ type: 'E', id: '1240123123123' }],
  ];

  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });

  const { data: gameList, mutate: gameListMutate } = useSWR(
    ['PlayerGameList', address, type],
    ([url, addr, tabType]) => fetcher(url, addr, tabType)
  );
  console.log(gameList);
  useEffect(() => {
    if (!gameList) return;
    if (selectedGameId) return;
    console.log(gameList.gameMap[0].gameId);
    setSelectedGameId(`${gameList.gameMap[0].gameId}`);
  }, [gameList]);

  return (
    <section className="account">
      <div className="content">
        <Row justify="space-between" gutter={32}>
          {/* 個人資訊 */}
          <Col span={5} className="content__info">
            <Row gutter={[16, 16]}>
              <Col span={24} className="profile-wrapper">
                <div className="profile">
                  <Image src={ensAvatar || defaultProfile} alt="" />
                </div>
              </Col>
              <Col span={24}>
                <Text className="name">
                  {ensName || address}
                  {/* {ensName
                    ? `${ensName} (${shortenAddress(address, 5, 5)})`
                    : shortenAddress(address, 5, 5)} */}
                </Text>
              </Col>
              <Col span={24}>
                {/* <div>
                    <Input
                      className="balance"
                      prefix={
                        <>
                          <Image src={polygon} alt="" width={25} />
                        </>
                      }
                    />
                  </div> */}
              </Col>
            </Row>
          </Col>
          {/* 列表 */}
          <Col span={13}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                {gameList ? (
                  <Space size={[12, 8]} wrap>
                    {Object.entries(gameList.gameMap).map((gameArr) => (
                      <Tag
                        key={gameArr[1].gameId}
                        onClick={() => setSelectedGameId(gameArr[1].gameId)}
                      >
                        {gameArr[1].title}
                      </Tag>
                    ))}
                  </Space>
                ) : (
                  ''
                )}
              </Col>
              <Col span={24} className="list-area">
                {`${selectedGameId}` && gameList ? (
                  <List
                    type={type}
                    data={gameList.playerGameMap[selectedGameId]}
                  />
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
          {/* 頁籤 */}
          <Col sm={5} className="cate-area">
            <Row gutter={[36, 36]}>
              <Col span={24}>
                <Button
                  type="text"
                  shape="round"
                  className={type === 'prizes' ? 'active' : ''}
                  onClick={() => {
                    setType('prizes');
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
                  }}
                >
                  Collected
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Account;
