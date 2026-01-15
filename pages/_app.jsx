import '../styles/main.scss';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="layout">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
