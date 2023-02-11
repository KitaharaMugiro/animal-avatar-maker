import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap" rel="stylesheet" />

          <meta property="og:title" content="アニマルアバターメーカー" />
          <meta property="og:site_name" content="アニマルアバターメーカー" />
          <meta property="og:description" content="大好きなワンちゃんネコちゃんの高品質なイラストをお届けします" />
          <meta property="og:url" content="https://uchinoko.yunomy.com/" />
          <meta property="og:image" content="https://res.cloudinary.com/ddeqwb08j/image/upload/v1673347148/ogp_it9trc.png" />
          <meta property="og:type" content="website" />
          <meta name="twitter:site" content="@ai_avatar_maker" />
          <meta name="twitter:creator" content="@ai_avatar_maker" />
          <meta name="twitter:card" content="summary_large_image" />

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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
