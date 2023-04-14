import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import gamesImg from '../../../public/assets/images/cat.png';
import GameDetail from '../../components/GameDetail';
import PrizeList from '../../components/PrizeList';

const { Title, Text } = Typography;
const textSize = 24;

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
  ].map((prize) => ({ ...prize, img: gamesImg }));

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
                img={gamesImg}
                drawable={false}
              />
            </Row>
          </Col>
          <Col span={12} className="list-area">
            <Row gutter={[24, 24]} justify="center">
              <PrizeList data={collectData} />
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
