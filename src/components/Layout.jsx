import { Layout } from 'antd';

import HeaderComponent from './Header';

const { Content } = Layout;

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <HeaderComponent />
      <Content>{children}</Content>
      {/* <FooterComponent /> */}
    </Layout>
  );
}
