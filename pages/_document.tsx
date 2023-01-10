import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Animal avatar maker"
          />
          <meta property="og:site_name" content="アニマルアバターメーカー" />
          <meta
            property="og:description"
            content="アニマルアバターメーカー"
          />
          <meta property="og:title" content="アニマルアバターメーカー" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="アニマルアバターメーカー" />
          <meta
            name="twitter:description"
            content="アニマルアバターメーカー"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
