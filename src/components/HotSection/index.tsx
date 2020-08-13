import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import SizedBox from "../SizedBox/index";
import HotItem from "./item";

const Section = styled.div`
  background-color: #f0f0f0;
  padding: 32px 0 16px 16px;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  font-family: "FuturaPT";
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
`;

const ItemsHolder = styled.div<{ disableScroll?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: ${(props) => (props.disableScroll ? "hidden" : "scroll")};
  justify-content: space-between;
  padding-bottom: 16px;
`;

const BrandsHolder = styled.div``;

const Spacer = styled.div`
  content: "-";
  width: 0px;
  height: 0px;
  color: transparent;
`;

function HotSection({
  data,
}: {
  data: {
    image: string;
    brandName: string;
    title: string;
    price: number;
    oldPrice: number;
    link: string;
  }[];
}): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Section>
      <SectionTitle>
        <Title>EM ALTA</Title>
        <Icon type="thermometer"></Icon>
      </SectionTitle>
      <SizedBox height={24}></SizedBox>
      <ItemsHolder disableScroll={!matches}>
        {data.map((item) => (
          <HotItem data={item} key={item.image}></HotItem>
        ))}
        <Spacer>-</Spacer>
      </ItemsHolder>
      <BrandsHolder></BrandsHolder>
    </Section>
  );
}

export default HotSection;
