import { Col, Row, Select, Input, Layout, Button } from 'antd'
import { Divider, Steps } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { shortenAddress } from '@/utils/shortenAddress'
import defaultProfile from '../../public/assets/images/default-profile.webp'
import polygon from '../../public/assets/images/polygon.png'
import productImg from '../../public/assets/images/product.jpg'

const Account = () => {
  const [type, setType] = useState('prizes') // prizes / collected

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
  ]

  const collectData = [
    [
      { type: 'A', id: '1240123123123' },
      { type: 'C', id: '1240123123123' },
    ],
    [{ type: 'E', id: '1240123123123' }],
  ]

  const { address } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })

  const List = ({ type, data }) => {
    return (
      <>
        {data.map((pack, i) => (
          <Col span={24} className="item-block" key={i}>
            <Row gutter={[16, 12]}>
              {pack.map((item, i) => (
                <Col span={24} key={i}>
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
                      {pack.length === i + 1 ? (
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
    )
  }

  return (
    <>
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
                  <p className="name">
                    {ensName
                      ? `${ensName} (${shortenAddress(address, 5, 5)})`
                      : shortenAddress(address, 5, 5)}
                  </p>
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
            <Col span={13} className="list-area">
              <Row gutter={[24, 15]}>
                {type === 'prizes' && <List type={type} data={prizeData} />}
                {type === 'collected' && (
                  <List type={type} data={collectData} />
                )}
              </Row>
            </Col>
            {/* 頁籤 */}
            <Col sm={5} className="cate-area">
              <Row gutter={[36, 36]}>
                <Col span={24}>
                  <p
                    className={type === 'prizes' ? 'active' : ''}
                    onClick={() => {
                      setType('prizes')
                    }}
                  >
                    Prizes
                  </p>
                </Col>
                <Col span={24}>
                  <p
                    className={type === 'collected' ? 'active' : ''}
                    onClick={() => {
                      setType('collected')
                    }}
                  >
                    Collected
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default Account
