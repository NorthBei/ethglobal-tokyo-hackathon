import '../styles/globals.css';
import '../../public/assets/fonts/font.css';
import '../styles/scss/style.scss';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const LayoutComponent = dynamic(() => import('../components/Layout'), {
  ssr: false,
});

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'PolyDraw',
  projectId: '797094a993c03074bb359fac45f6d6df',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
