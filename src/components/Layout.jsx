import { Layout } from 'antd';

import HeaderComponent from './Header';

const { Content } = Layout;

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <HeaderComponent />
      <Content
        style={{
          paddingTop: '60px',
          paddingBottom: '180px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '1232px',
          paddingLeft: 'calc(16px + env(safe-area-inset-left))',
          paddingRight: 'calc(16px + env(safe-area-inset-right))',
        }}
      >
        {children}
      </Content>
      {/* <FooterComponent /> */}
    </Layout>
  );
}
