import { Button, Col, Row, Typography } from 'antd';
import axios from 'axios';
import find from 'lodash/find';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

import ichibanContract from '../../../contracts/ichiban';
import styles from '../../../styles/Game.module.css';
import cidToImageUrl from '../../../utils/cidToImageUrl';

const { Title } = Typography;

function Prizes({ data }) {
  return (
    <>
      {data.map((prize, i) => (
        <Col span={24} className="item-block" key={i}>
          <Row gutter={[20, 12]} justify="space-between" align="middle">
            <Col span={12}>
              <div className={styles['item-img-wrapper']}>
                <Image src={prize.img} width={150} height={150} alt="item" />
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24} className="type">
                  <Title level={3}>{prize.type} Prize</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      ))}
    </>
  );
}

function Result() {
  const router = useRouter();
  const { ids } = router.query;
  const [stage, setStage] = useState(0);
  const [prizeData, setPrizeData] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [prizeList, setPrizeList] = useState([]);
  const [isGotPrizesSet, setIsGotPrizeSet] = useState(false);
  const [isIntervalRunning, setIsIntervalRunning] = useState(true);

  const stageTexts = ['Waiting for drawing  🚀', 'Congrats 🎉'];

  const {
    data: requestIdStatus,
    isError: isRequestIdStatusError,
    isSuccess: isRequestIdStatusSuccess,
    refetch: refetchRequestIdStatus,
  } = useContractRead({
    address: ichibanContract.address,
    abi: ichibanContract.abi,
    functionName: 'getRequestStatus',
    args: [ids[1]],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isIntervalRunning) {
        refetchRequestIdStatus();
      }
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isIntervalRunning, refetchRequestIdStatus]);

  useEffect(() => {
    if (!gameList.length) {
      axios({
        baseURL: 'https://maildeep.info/app',
        url: '/game/list',
      }).then((res) => {
        const list = res.data?.data.map((i) => ({ ...i, name: i.title })) || [];
        setGameList(list);
      });
    }
    if (gameList.length && !prizeList.length) {
      const detail = find(gameList, { gameId: parseInt(ids[0], 10) });
      const prizes = detail?.prizeInfo.map((prize, index) => ({
        type: String.fromCharCode(97 + index).toUpperCase(),
        img: cidToImageUrl(prize.ipfs),
      }));
      setPrizeList(prizes);
    }
    if (isRequestIdStatusSuccess && requestIdStatus[0] && prizeList.length) {
      const gotPrizes = requestIdStatus[1].map((prize) => ({
        ...prizeList[prize.toNumber()],
      }));
      setIsIntervalRunning(false);
      setIsGotPrizeSet(true);
      setPrizeData(gotPrizes);
      setStage(1);
    }
  }, [
    requestIdStatus,
    isRequestIdStatusError,
    isRequestIdStatusSuccess,
    refetchRequestIdStatus,
    gameList,
    prizeList,
    ids,
    setIsIntervalRunning,
    isGotPrizesSet,
  ]);
  return (
    <section className="account">
      <div className="content">
        <Row align="middle" gutter={[0, 24]}>
          <Col span={12} offset={6}>
            <Row justify="center">
              <Title level={2} style={{ color: 'black' }}>
                {stageTexts[stage]}
              </Title>
            </Row>
          </Col>
          {stage === 1 ? (
            <Col span={12} offset={6}>
              <Row justify="center">
                <Prizes data={prizeData} />
              </Row>
            </Col>
          ) : (
            ''
          )}
          {stage === 1 ? (
            <Col span={8} offset={8}>
              <Link href="/account">
                <Button type="primary" block size="large">
                  Check
                </Button>
              </Link>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </div>
    </section>
  );
}

export default Result;
