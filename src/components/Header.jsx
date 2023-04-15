import { CodeSandboxOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Col, Drawer, Grid, Layout, Row, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useEnsAvatar } from 'wagmi';

import defaultProfile from '../../public/assets/images/default-profile.webp';

const { Header } = Layout;
const { useBreakpoint } = Grid;

function HeaderComponent({ style }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const screens = useBreakpoint();

  const { address } = useAccount();

  const { data: ensAvatar } = useEnsAvatar({ address });

  return (
    <Header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
      }}
    >
      <div style={style}>
        <Row justify="space-between" align="middle" className="normal-row">
          <Col>
            <Link href="/">
              <h1>PolyDraw</h1>
            </Link>
          </Col>

          <Col style={{ flex: '1' }}>
            {screens.sm ? (
              <Row justify="end">
                <Space size={20}>
                  <Link href="/vc">Become Vendor</Link>
                  <Link href="/upload">Create Game</Link>
                  <ConnectButton label="Sign in" accountStatus="address" />
                  <Link href="/account">
                    <div className="profile">
                      <Image
                        src={ensAvatar || defaultProfile}
                        alt="profile"
                        className="profile-img"
                      />
                    </div>
                  </Link>
                </Space>
              </Row>
            ) : (
              <Row justify="end" align="middle">
                {!screens.sm && (
                  <Row justify="end" align="middle">
                    <ConnectButton label="Sign in" accountStatus="address" />
                  </Row>
                )}
                <CodeSandboxOutlined
                  className="sandwich"
                  onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
                />
              </Row>
            )}
          </Col>
        </Row>
      </div>
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
