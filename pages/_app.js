/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../src/components/Layout/index";
import theme from "../src/theme";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Raleway:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
