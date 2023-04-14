import { Col, Row, Typography } from 'antd';
import Image from 'next/image';
import { Children } from 'react';

import styles from '../styles/Game.module.css';

const { Text } = Typography;

function GameDetail({ title, desc, img, price, children }) {
  return (
    <>
      <Col span={24}>
        <Row justify="center">
          <div className={styles['item-img-wrapper']}>
            <Image src={img} alt="game" width={300} height={300} />
          </div>
        </Row>
      </Col>
      <Col span={24}>
        <Text>{title}</Text>
      </Col>
      <Col span={24}>
        <Text>{desc}</Text>
      </Col>
      <Col span={24}>
        <Text>{`$${price}`}</Text>
      </Col>
      {Children.map(children, (child) => child)}
    </>
  );
}

export default GameDetail;
