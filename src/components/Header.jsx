import { CodeSandboxOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Col, Drawer, Grid, Layout, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useEnsAvatar } from 'wagmi';

import defaultProfile from '../../public/assets/images/default-profile.webp';

const { Header } = Layout;
const { useBreakpoint } = Grid;

function HeaderComponent() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const screens = useBreakpoint();

  const { address } = useAccount();

  const { data: ensAvatar } = useEnsAvatar({ address });

  return (
    <Header className="header">
      <Row justify="space-between" align="middle" className="normal-row">
        <Col>
          <Link href="/">
            <h1>PolyDraw</h1>
          </Link>
        </Col>
        {/* 搜尋 */}

        <Col xl={15} md={15}>
          {screens.sm ? (
            <Row justify="end" align="middle" className="navbar-area">
              <Col className="mr-30">
                <Link href="/about">
                  <span>Upload</span>
                </Link>
              </Col>
              <Col className="mr-30">
                {/* <Button type="primary" size="middle" shape="round">
                    Connect wallet
                  </Button> */}
                <ConnectButton label="Sign in" accountStatus="address" />
              </Col>
              <Col>
                <Link href="/account">
                  <div className="profile">
                    <Image
                      src={ensAvatar || defaultProfile}
                      alt=""
                      className="profile-img"
                    />
                  </div>
                </Link>
              </Col>
            </Row>
          ) : (
            <Row justify="end" align="middle">
              <CodeSandboxOutlined
                className="sandwich"
                onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
              />
            </Row>
          )}
        </Col>
      </Row>
      {!screens.sm ? (
        <Row justify="end" align="middle">
          <ConnectButton label="Sign in" accountStatus="address" />
        </Row>
      ) : null}
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setSideBarIsOpen(false)}
        open={sideBarIsOpen}
        key="right"
        rootClassName="sidebar"
        width={160}
        maskStyle={{ backgroundColor: 'transparent' }}
      >
        <Row className="sidebar__item-area" gutter={[16, 16]}>
          <Col span={24} className="sidebar__item">
            Upload
          </Col>
        </Row>
      </Drawer>
    </Header>
  );
}

export default HeaderComponent;
