import '@/styles/globals.css'
import '../../public/assets/fonts/font.css'
import '../styles/scss/style.scss'
import dynamic from 'next/dynamic'
const LayoutComponent = dynamic(() => import('../components/Layout'), {
  ssr: false,
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  )
}
