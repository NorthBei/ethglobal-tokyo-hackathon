import { Button, Col, InputNumber, Row, Typography } from 'antd';
import Image from 'next/image';

import styles from '../styles/Game.module.css';

const { Text } = Typography;

function GameDetail({ amount, setAmount, showModal, img, drawable }) {
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
        <Text>Korem ipsum dolor sit</Text>
      </Col>
      <Col span={24}>
        <Text>
          Korem ipsum dolor sit Korem ipsum dolor sit Korem ipsum dolor sit
          Korem ipsum dolor sit Korem ipsum dolor sit Korem ipsum dolor sit
          Korem ipsum dolor sit Korem ipsum dolor sit Korem ipsum dolor sit
          Korem ipsum dolor sit Korem ipsum dolor sit Korem ipsum dolor sit
          Korem ipsum dolor sit Korem ipsum dolor sit Korem ipsum dolor sit
          Korem ipsum dolor sit
        </Text>
      </Col>
      <Col span={24}>
        <Text>$50.00</Text>
      </Col>
      {drawable ? (
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row justify="center">
                <Button
                  type="primary"
                  style={{ padding: '8px', width: 50, height: 50 }}
                  onClick={() => {
                    setAmount(amount > 1 ? amount - 1 : 1);
                  }}
                >
                  -
                </Button>
                <InputNumber
                  min={1}
                  max={10}
                  value={amount}
                  onChange={setAmount}
                />
                <Button
                  type="primary"
                  style={{ padding: '8px', width: 50, height: 50 }}
                  onClick={() => {
                    setAmount(amount < 10 ? amount + 1 : 10);
                  }}
                >
                  +
                </Button>
              </Row>
            </Col>
            <Col span={12}>
              <Button size="large" onClick={showModal} block>
                Draw
              </Button>
            </Col>
          </Row>
        </Col>
      ) : (
        ''
      )}
    </>
  );
}

export default GameDetail;
