import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/lib/utils/api";
import "~/styles/globals.css";
import "~/styles/markdown.css";
import Layout from "../layout/Layout";
import { ThemeProvider } from "next-themes";
import ReportForm from "../components/report-form/report-form";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
          <ReportForm />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
