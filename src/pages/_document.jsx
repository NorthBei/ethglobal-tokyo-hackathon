import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="title"
          content="PolyDraw | on-chain transparent & fairness lottery"
        />
        <meta
          name="description"
          content="PolyDraw is a fair vending machine that makes the lottery transparent. Everyone can know the remaining number of each prize and win prizes for their draw.."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
