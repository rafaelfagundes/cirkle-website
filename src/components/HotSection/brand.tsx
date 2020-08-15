// import { useMediaQuery } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledBrand = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const BrandImage = styled.div<{ image: string; width: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: ${Colors.WHITE};
  width: ${(props) => props.width * 0.72}px;
  height: ${(props) => props.width * 0.72}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

function Brand({
  data,
}: {
  data: {
    id: string;
    name: string;
    image: string;
    link: string;
  };
}): JSX.Element {
  function calcHighlightItemWidth(isXs: boolean, isSm: boolean): number {
    const width = window.innerWidth;

    // const sixTiles = (960 - 7 * 16) / 6;

    // if (sixTiles > width / 3) {
    //   return (width - 4 * 16) / 3;
    // } else {
    //   return sixTiles;
    // }

    let itemSize: number;
    if (isXs) {
      itemSize = (width - 4 * 16) / 3;
    } else if (isSm) {
      itemSize = (768 - 7 * 16) / 6;
    } else {
      itemSize = (960 - 7 * 16) / 6;
    }

    return itemSize;
  }

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "sm"));

  const widthHighlightItem = calcHighlightItemWidth(isXs, isSm);

  return (
    <Link href={data.link}>
      <StyledBrand width={widthHighlightItem} key={data.id}>
        <BrandImage width={widthHighlightItem} image={data.image}></BrandImage>
      </StyledBrand>
    </Link>
  );
}

export default Brand;
