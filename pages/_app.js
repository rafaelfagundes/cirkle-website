/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "styled-components";
import Layout from "../src/components/Layout/index";
import MenuController from "../src/modules/menu/menu.controller";
import theme from "../src/theme/theme";
import "../styles/global.css";

export default function MyApp(props) {
  const { Component, pageProps, menuData } = props;

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
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout menuData={menuData}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async function (ctx) {
  const controller = new MenuController();
  const data = await controller.getMenu();

  return {
    menuData: data,
    pageProps: ctx?.pageProps ? ctx.pageProps : {},
  };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
};
