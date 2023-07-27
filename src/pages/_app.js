import CombineProviders from '../context'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CombineProviders>
      <Component {...pageProps} />
    </CombineProviders>
  )
}

export default MyApp
