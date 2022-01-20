import '../styles/globals.scss'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return <>
    <Navigation />

    <div className="container main">
      <Component {...pageProps} />
    </div>

    <Footer />
  </>
}

export default MyApp
