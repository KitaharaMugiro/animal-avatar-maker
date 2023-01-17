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

          {/* Microsoft Clarity */}
          <script
            dangerouslySetInnerHTML={
              {
                __html: `
                    (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "fcov0h93ee");
                    `}} />
        </Head>
        <body className="bg-slate-100 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
