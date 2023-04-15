import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import gamesImg from '../../../public/assets/images/cat.png';
import GameDetail from '../../components/GameDetail';

const { Title, Text } = Typography;
const textSize = 24;
const gamePrice = 10;
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
    { type: 'A', name: 'Fantasty Prize', id: '100001', remainAmount: 5 },
    { type: 'B', name: 'Fantasty Prize', id: '100002', remainAmount: 10 },
    { type: 'C', name: 'Fantasty Prize', id: '100003', remainAmount: 7 },
    { type: 'D', name: 'Fantasty Prize', id: '100004', remainAmount: 7 },
    { type: 'E', name: 'Fantasty Prize', id: '100005', remainAmount: 7 },
  ].map((prize) => ({ ...prize, img: gamesImg }));

  return (
    <main style={{ paddingTop: '60px', paddingBottom: '180px' }}>
      <GameDetail
        title="Fake Name Generator 隨機身分產生器"
        desc="在某些情況下，我們會需要捏造另一個（或一群）不存在的身分，不代表現實生活中的任何人，難以被辨識出來，卻又跟真人幾乎一模一樣，例如在開發網站或程式時會用到的個人資料，在網路上註冊、填寫表單時不想洩漏自己的真實身分，在網路上建立一個假身分，用來和現實生活區隔等等，使用 Fake Name Generator 姓名產生器就能快速幫你產生你所需要的相關資料。"
        img={gamesImg}
        price={gamePrice}
        amount={amount}
        prizeList={collectData}
        onAmountChange={(v) => setAmount(v)}
        onDraw={showModal}
      />
      <ConfirmModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        price={1000}
        amount={amount}
      />
    </main>
  );
}

export default GameItems;
