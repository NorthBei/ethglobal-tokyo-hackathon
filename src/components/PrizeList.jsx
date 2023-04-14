import { Col, Row, Typography } from 'antd';
import Image from 'next/image';

import styles from '../styles/Game.module.css';

const { Text } = Typography;

function PrizeList({ data }) {
  return (
    <>
      {data.map((pack, i) => (
        <Col span={24} className="item-block" key={i}>
          <Row gutter={[20, 12]} justify="space-between" align="middle">
            <Col span={12}>
              <div className={styles['item-img-wrapper']}>
                <Image src={pack.img} width={150} height={150} alt="item" />
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

export default PrizeList;
