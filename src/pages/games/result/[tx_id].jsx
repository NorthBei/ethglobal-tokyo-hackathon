import { Button, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import gamesImg from '../../../../public/assets/images/cat.png';
import styles from '../../../styles/Game.module.css';

const { Text } = Typography;

function Prize({ data }) {
  return (
    <>
      {data.map((pack, i) => (
        <Col span={24} className="item-block" key={i}>
          <Row gutter={[20, 12]} justify="space-between" align="middle">
            <Col span={12}>
              <div className={styles['item-img-wrapper']}>
                <Image src={gamesImg} width={150} height={150} alt="item" />
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24} className="type">
                  <Text>{pack.type}</Text>
                </Col>
                <Col span={24} className="name">
                  <Text>{pack.name}</Text>
                </Col>
                <Col span={24} className="id">
                  <Text>{pack.id}</Text>
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
  const { tx_id } = router.query;
  const [stage, setStage] = useState(0);
  const stageTexts = ['Waiting for drawing  🚀', 'Congrats 🎉'];
  const data = [
    { type: 'A', name: 'Fantasty Prize', id: '100001' },
    { type: 'B', name: 'Fantasty Prize', id: '100002' },
    { type: 'C', name: 'Fantasty Prize', id: '100003' },
  ];

  setTimeout(() => {
    setStage(1);
  }, 5000);
  return (
    <section className="account">
      <div className="content">
        <Row align="middle" gutter={[0, 24]}>
          <Col span={12} offset={6}>
            <Row justify="center">
              <Text style={{ color: 'black' }}>{tx_id}</Text>
            </Row>
          </Col>
          <Col span={12} offset={6}>
            <Row justify="center">
              <Text style={{ color: 'black' }}>{stageTexts[stage]}</Text>
            </Row>
          </Col>
          {stage === 1 ? (
            <Col span={12} offset={6}>
              <Row justify="center">
                <Prize data={data} />
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
