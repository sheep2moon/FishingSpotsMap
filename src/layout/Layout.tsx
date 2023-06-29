import Head from "next/head";
import Script from "next/script";
import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Łowiska</title>
        <meta name="description" content="Mapa łowisk" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      ></Script>

      <Nav />
      <main className="flex min-h-screen flex-col items-center pt-16 dark:bg-dark dark:text-light ">
        {children}
      </main>
    </>
  );
};

export default Layout;
