import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  )
}

export default MyApp
