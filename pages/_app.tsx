import { MantineProvider } from "@mantine/core"
import type { AppProps } from "next/app"
import Head from "next/head"
import NextNProgress from "nextjs-progressbar"
import "../styles/index.css"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>アニマルアバターメーカー</title>
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "light",
                    fontFamily: "zen maru gothic",
                }}
            >
                <NextNProgress />
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}
