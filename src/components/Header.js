import { Col, Row, Select, Input, Layout, Button } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
// import logo from '@/images/web/img/img_logo_01.svg';
// import lang from '@/images/web/btn/btn_language_nor_01.png';
import defaultProfile from '../../public/assets/images/default-profile.webp'

const { Header } = Layout

const HeaderComponent = () => {
  return (
    <>
      <Header className={'header'}>
        <Row justify="space-between" align="middle" className="normal-row">
          <Col>
            <Link href="/">
              <h1>IchibanDAO</h1>
            </Link>
          </Col>
          {/* 搜尋 */}

          <Col xl={15} md={15}>
            <Row justify="end" align="middle" className="navbar-area">
              <Col className="mr-30">
                <Link href="/about">
                  <span>Upload</span>
                </Link>
              </Col>
              <Col className="mr-30">
                <Button type="primary" size="middle" shape="round">
                  Connect wallet
                </Button>
              </Col>
              <Col>
                <Link href="/account">
                  <div className="profile">
                    <Image
                      src={defaultProfile}
                      alt=""
                      className="profile-img"
                    />
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    </>
  )
}

export default HeaderComponent
