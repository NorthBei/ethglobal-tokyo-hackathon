import { Col, Row, Select, Input, Layout, Button } from 'antd'
import { Divider, Steps } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import defaultProfile from '../../public/assets/images/default-profile.webp'
import polygon from '../../public/assets/images/polygon.png'

const Account = () => {
  const [type, setType] = useState('prizes') // prizes / collected
  return (
    <>
      <section className="account">
        <div className="content">
          <Row justify="space-between" gutter={32}>
            <Col span={5} className="content__info">
              <Row gutter={[16, 16]}>
                <Col span={24} className="profile-wrapper">
                  <div className="profile">
                    <Image src={defaultProfile} alt="" />
                  </div>
                </Col>
                <Col span={24}>
                  <p className="name">ens name</p>
                </Col>
                <Col span={24}>
                  <div>
                    <Input
                      className="balance"
                      prefix={
                        <>
                          <Image src={polygon} alt="" width={25} />
                        </>
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={14}>2</Col>
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
