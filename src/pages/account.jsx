import { Button, Col, Row, Space, Typography } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

// import { shortenAddress } from '@/utils/shortenAddress';
import defaultProfile from '../../public/assets/images/default-profile.webp';
import productImg from '../../public/assets/images/product.jpg';

const { Text } = Typography;

function List({ type, data }) {
  return (
    <>
      {data.map((pack, i) => (
        <Col span={24} className="item-block" key={`col-${i}`}>
          <Row gutter={[16, 12]}>
            {pack.map((item, j) => (
              <Col span={24} key={j}>
                <Row gutter={[20, 12]} justify="space-between" align="middle">
                  <Col span={5}>
                    <div className="item-img-wrapper">
                      <Image src={productImg} alt="" className="item-img" />
                    </div>
                  </Col>
                  <Col span={4} className="prize">
                    {item.type}
                  </Col>
                  <Col span={6} className="id">
                    {item.id}
                  </Col>
                  <Col span={6}>
                    {pack.length === j + 1 ? (
                      <Button type="primary" shape="round" size="middle">
                        {type === 'prizes' ? 'Claim' : 'Details'}
                      </Button>
                    ) : (
                      ''
                    )}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </>
  );
}

function Account() {
  const [type, setType] = useState('prizes'); // prizes / collected

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
            <Row gutter={[24, 15]}>
              <Space size={[12, 8]} wrap>
                <Button>Game 1</Button>
                <Button>Game 2</Button>
                <Button>Game 3</Button>
                <Button>Game 4</Button>
                <Button>Game 5</Button>
                <Button>Game 6</Button>
              </Space>
            </Row>
            <Row gutter={[24, 15]} className="list-area">
              {type === 'prizes' && <List type={type} data={prizeData} />}
              {type === 'collected' && <List type={type} data={collectData} />}
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
