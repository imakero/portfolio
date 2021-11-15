import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.scss'
import Prism from 'prismjs'
import '../styles/prism-material-light.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  )
}

export default MyApp
