/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import Layout from "../src/components/Layout/index";
import AuthProvider from "../src/hooks/use-auth";
import CartProvider from "../src/hooks/use-cart";
import DialogProvider from "../src/hooks/use-dialog";
import WishlistProvider from "../src/hooks/use-wishlist";
import theme from "../src/theme/theme";
import "../styles/global.css";
import "../styles/nprogress.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChnageError triggered');
  NProgress.done();
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cirkle</title>

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1"
        />
        {/* <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        ></meta> */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#80D0C7" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#80D0C7"></meta>
      </Head>
      <DialogProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SWRConfig
                  value={{
                    refreshInterval: 1000,
                    refreshWhenHidden: false,
                    refreshWhenOffline: false,
                    revalidateOnFocus: true,
                    revalidateOnMount: true,
                    revalidateOnReconnect: true,
                    // dedupingInterval: 5000,
                    // focusThrottleInterval: 15000,
                    errorRetryCount: 3,
                    fetcher,
                  }}
                >
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </SWRConfig>
              </ThemeProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </DialogProvider>
    </>
  );
}

// MyApp.getInitialProps = async function (ctx) {
//   const controller = new MenuController();
//   const data = await controller.getMenu();

//   return {
//     menuData: data,
//     pageProps: ctx?.pageProps ? ctx.pageProps : {},
//   };
// };

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
