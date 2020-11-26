import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Menu from "../../../modules/menu/Menu";
import theme from "../../../theme/theme";
import SizedBox from "../../Atoms/SizedBox";
import Layout from "../Layout";

const BackgroundBanner = styled.div<{ bgImage: string; mobile: boolean }>`
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: ${(props) => (props.mobile ? 20 : 25)}vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerText = styled.div<{ mobile: boolean }>`
  font-size: ${(props) => (props.mobile ? 24 : 36)}px;
  color: ${Colors.WHITE};
  font-weight: 700;
  text-transform: uppercase;
  font-family: Commissioner, sans-serif;
  z-index: 1;
  text-align: center;
  padding: 20px;
  margin-top: ${(props) => (props.mobile ? 0 : -64)}px;
`;

const BannerTint = styled.div<{ mobile: boolean; tint: string }>`
  width: 100%;
  height: ${(props) => (props.mobile ? 20 : 25)}vh;
  position: absolute;
  background-color: ${(props) => props.tint};
  opacity: 0.75;
`;

const PanelHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Panel = styled.div<{
  mobile: boolean;
  noPadding: boolean;
  maxWidth: number;
}>`
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
  background-color: ${Colors.WHITE};
  z-index: 2;
  padding: ${(props) => (props.noPadding ? 0 : "0 20px")};
  margin-top: ${(props) => (props.mobile ? 0 : -64)}px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

function Page({
  menu,
  title,
  image,
  children,
  noPadding = false,
  maxWidth = 960,
  tintColor = Colors.PRIMARY,
}: {
  menu?: Menu;
  title: string;
  image: string;
  children: any;
  noPadding?: boolean;
  maxWidth?: number;
  tintColor?: string;
  doNotAutoScroll?: boolean;
}): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout containerMargin={false} menu={menu}>
      <>
        <BackgroundBanner bgImage={image} mobile={isSmartPhone}>
          <BannerTint mobile={isSmartPhone} tint={tintColor}></BannerTint>
          <BannerText mobile={isSmartPhone}>{title}</BannerText>
        </BackgroundBanner>
        <PanelHolder>
          <Panel
            noPadding={noPadding}
            mobile={isSmartPhone}
            maxWidth={maxWidth}
          >
            {children}
          </Panel>
        </PanelHolder>
        <SizedBox height={isSmartPhone ? 16 : 72}></SizedBox>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 1440,
  };
}

export default Page;
