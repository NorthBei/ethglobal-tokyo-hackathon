import { useState, useEffect, useContext } from 'react'
import HeaderComponent from './Header'
import dynamic from 'next/dynamic'

import { Layout } from 'antd'
const { Content, Sider } = Layout

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <HeaderComponent />
      <Content>{children}</Content>
      {/* <FooterComponent /> */}
    </Layout>
  )
}
