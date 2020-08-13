import { Container, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const Highlights = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HighlightItem = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  cursor: pointer;
  /* align-items: center; */
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
  /* text-align: center; */
`;

const Subtitle = styled.span<{ fontSize: number }>`
  text-transform: uppercase;
  color: ${Colors.RED_PINK};
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
  // const widthHighlightItem = width / (width / 164);

  function calcHighlightItemWidth(): number {
    const width = window.innerWidth;

    const fourTiles = (960 - 3 * 16) / 4;

    if (fourTiles > width / 2) {
      return (width - 3 * 16) / 2;
    } else {
      return fourTiles;
    }
  }

  const widthHighlightItem = calcHighlightItemWidth();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Container maxWidth="md" disableGutters={!matches}>
      <Highlights>
        {data.map((item) => (
          <Link href={item.link} key={item.link}>
            <HighlightItem width={widthHighlightItem}>
              <Image image={item.image} width={widthHighlightItem}></Image>
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
