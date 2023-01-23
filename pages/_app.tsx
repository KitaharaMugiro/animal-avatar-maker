import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'light',
      fontFamily: "zen maru gothic"
    }}
  >
    <Component {...pageProps} />
  </MantineProvider>
}
