import Head from 'next/head';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../components/Header'), { ssr: false });
const WorksPage = dynamic(() => import('../components/WorksPage'), { ssr: false });

export default function Works() {
  return (
    <>
      <Head>
        <title>PF2025 - Works</title>
      </Head>
      <Header />
      <WorksPage />
    </>
  );
}
