// import { useMediaQuery } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import { cloudinaryImage } from "../../../utils/image";

const StyledBrand = styled.div<{ width: number; noMargin: boolean }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  background-color: ${Colors.WHITE};
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05); */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => (props.noMargin ? 0 : 16)}px;
  cursor: pointer;
  border-radius: 4px;
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
  noMargin = false,
}: {
  data: {
    id: string;
    name: string;
    image: string;
  };
  noMargin?: boolean;
}): JSX.Element {
  function calcHighlightItemWidth(): number {
    const width = window.innerWidth;

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

  const widthHighlightItem = calcHighlightItemWidth();

  const router = useRouter();

  return (
    <span
      onClick={() =>
        router.push({
          pathname: "/pesquisa",
          query: {
            brands: data.name,
          },
        })
      }
    >
      <StyledBrand width={widthHighlightItem} key={data.id} noMargin={noMargin}>
        <BrandImage
          width={widthHighlightItem}
          image={cloudinaryImage(data.image, 140)}
        ></BrandImage>
      </StyledBrand>
    </span>
  );
}

export default Brand;
