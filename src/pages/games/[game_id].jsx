import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Typography,
} from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import gamesImg from '../../../public/assets/images/cat.png';
import styles from '../../styles/Game.module.css';

const { Title, Text } = Typography;
const textSize = 24;

function GameDetail({ amount, setAmount, showModal }) {
  return (
    <>
      <Col span={24}>
        <Row justify="center">
          <div className={styles['item-img-wrapper']}>
            <Image src={gamesImg} alt="game" width={300} height={300} />
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
    </>
  );
}
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
function ConfirmModal({ open, onOk, onCancel, price, amount }) {
  return (
    <Modal footer={null} title="Draw" open={open}>
      <Row justify="center">
        <Title level={1}>Total Spend</Title>
      </Row>
      <Row gutter={24} justify="center">
        <Col justify="center" span={15}>
          <Text fontSize={textSize}>Price per draw:</Text>
          <Text fontSize={textSize}>{price}</Text>
        </Col>
        <Col justify="center" span={15}>
          <Text fontSize={textSize}>Amount:</Text>
          <Text fontSize={textSize}>{amount}</Text>
        </Col>
        <Col justify="center" span={15}>
          <Text fontSize={textSize}>Total:</Text>
          <Text fontSize={textSize}>{price * amount}</Text>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" gutter={12}>
        <Col span={10}>
          <Button onClick={onCancel} block>
            Cancel
          </Button>
        </Col>
        <Col span={10}>
          <Button type="primary" onClick={onOk} block>
            Confirm
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

function GameItems() {
  const router = useRouter();
  const { game_id } = router.query;
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const tx_id = '0xng9843fn9823nff3290fj2';
    router.push(`/games/result/${tx_id}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const collectData = [
    { type: 'A', name: 'Fantasty Prize', id: '100001' },
    { type: 'B', name: 'Fantasty Prize', id: '100002' },
    { type: 'C', name: 'Fantasty Prize', id: '100003' },
    { type: 'D', name: 'Fantasty Prize', id: '100004' },
    { type: 'E', name: 'Fantasty Prize', id: '100005' },
  ];

  return (
    <section className="account">
      <div className="content">
        <Row justify="space-between" gutter={32} style={{ padding: '24px 0' }}>
          <Col span={12}>
            <Row gutter={[24, 40]}>
              <GameDetail
                amount={amount}
                setAmount={setAmount}
                showModal={showModal}
              />
            </Row>
          </Col>
          <Col span={12} className="list-area">
            <Row gutter={[24, 24]} justify="center">
              <Prize data={collectData} />
            </Row>
          </Col>
        </Row>
        <ConfirmModal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          price={price}
          amount={amount}
        />
      </div>
    </section>
  );
}

export default GameItems;
