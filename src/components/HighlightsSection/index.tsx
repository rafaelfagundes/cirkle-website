import { Container, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { cloudinaryImage } from "../../utils/image";

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
`;

const Image = styled.div<{ image: string; width: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${(props) => props.width * 1.158536585}px;
  width: ${(props) => props.width}px;
`;

const Title = styled.span<{ fontSize: number }>`
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  font-family: "FuturaPT";
  font-size: ${(props) => props.fontSize}px;
  font-weight: bold;
  padding-top: 5px;
`;

const Subtitle = styled.span<{ fontSize: number }>`
  text-transform: uppercase;
  color: ${Colors.SECONDARY};
  font-family: "FuturaPT";
  font-size: ${(props) => props.fontSize}px;
  font-weight: bold;
  padding-bottom: 16px;
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
              <Title fontSize={widthHighlightItem * 0.073170732}>
                {item.title}
              </Title>
              <Subtitle fontSize={widthHighlightItem * 0.06097561}>
                {item.subtitle}
              </Subtitle>
            </HighlightItem>
          </Link>
        ))}
      </Highlights>
    </Container>
  );
}

export default HighlightsSection;
