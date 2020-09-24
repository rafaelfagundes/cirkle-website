import { Container, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import SizedBox from "../../SizedBox";

const Highlights = styled.div<{ padding: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${(props) => (props.padding ? "16px" : 0)};
`;

const HotProductsLoader = (): JSX.Element => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "sm"));

  function calcHighlightItemWidth(): number {
    const width = window.innerWidth;

    let itemSize: number;
    if (isXs) {
      itemSize = (width - 3 * 16) / 2;
    } else if (isSm) {
      itemSize = (768 - 5 * 16) / 4;
    } else {
      itemSize = (960 - 3 * 16) / 4;
    }

    return itemSize;
  }

  const width = calcHighlightItemWidth();
  const imageHeight = width * 1.158536585;
  const height = imageHeight + 66;

  const LoaderItem = () => {
    return (
      <ContentLoader
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        speed={2}
        backgroundColor={Colors.LIGHT_GRAY}
        foregroundColor={Colors.AMARANTH_PINK}
      >
        <rect x="0" y="0" rx="0" ry="0" width={width} height={370} />
      </ContentLoader>
    );
  };

  return (
    <Container maxWidth="md" disableGutters={!isXs}>
      <Highlights padding={isSm}>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
      </Highlights>
      <SizedBox height={24}></SizedBox>
      <Highlights padding={isSm}>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
        <LoaderItem></LoaderItem>
      </Highlights>
    </Container>
  );
};
export default HotProductsLoader;
