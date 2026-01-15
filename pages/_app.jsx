// pages/_app.jsx
import '../styles/main.scss';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <SmoothScroll>    <div className="layout">
      <Component {...pageProps} />
      <Footer />
    </div></SmoothScroll>

      
    </>
  );
}
