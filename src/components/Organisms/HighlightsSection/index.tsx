import { Container, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import { cloudinaryImage } from "../../../utils/image";
import Padding from "../../Atoms/Padding";
import SizedBox from "../../Atoms/SizedBox";

const Highlights = styled.div<{ padding: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${(props) => (props.padding ? "16px" : 0)};
`;

const HighlightItem = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const Image = styled.div<{ image: string; width: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${(props) => props.width * 1.158536585}px;
  width: ${(props) => props.width}px;
  border-radius: 4px;
`;

const Title = styled.span<{ fontSize: number }>`
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  font-family: "Commissioner";
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  letter-spacing: -0.1px;
  /* text-align: center; */
`;

const Subtitle = styled.span<{ fontSize: number }>`
  /* text-transform: uppercase; */
  color: ${Colors.SECONDARY};
  font-family: "Commissioner";
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  /* text-align: center; */
`;

function HighlightsSection({
  data,
}: {
  data: {
    image: string;
    title: string;
    subtitle: string;
    link: string;
  }[];
}): JSX.Element {
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

  const widthHighlightItem = calcHighlightItemWidth();

  return (
    <Container maxWidth="md" disableGutters={!isXs}>
      <Highlights padding={isSm}>
        {data.map((item) => (
          <Link href={item.link} key={item.link}>
            <HighlightItem width={widthHighlightItem}>
              <Image
                image={cloudinaryImage(item.image, 230)}
                width={widthHighlightItem}
              ></Image>
              <SizedBox height={8}></SizedBox>
              <Padding horizontal={8}>
                <Title fontSize={14}>{item.title}</Title>
                <SizedBox height={2}></SizedBox>
                <Subtitle fontSize={14}>{item.subtitle}</Subtitle>
              </Padding>
            </HighlightItem>
          </Link>
        ))}
      </Highlights>
    </Container>
  );
}

export default HighlightsSection;
