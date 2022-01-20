import '../styles/globals.scss'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return <>

    <div className="container main">
      <Component {...pageProps} />
    </div>

    <Footer />
  </>
}

export default MyApp
