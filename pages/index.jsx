import Head from 'next/head';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../components/Header'), { ssr: false });
const HomeContent = dynamic(() => import('../components/HomeContent'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>PF2025 - Home</title>
      </Head>
      <Header />
      <HomeContent />
      
    </>
  );
}
