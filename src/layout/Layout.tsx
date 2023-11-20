import Head from "next/head";
import Script from "next/script";
import Nav from "../components/nav/nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Łowiska</title>
      </Head>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      ></Script>
      <Nav />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
