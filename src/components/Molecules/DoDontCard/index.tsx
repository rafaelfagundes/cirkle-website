import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../../Atoms/Icon";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";

const StyledCard = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  background-color: ${Colors.WHITE};
  /* padding: 40px 20px; */
  padding: 20px;
  min-width: 440px;
  min-height: 713px;
`;

const Title = styled.div<{ positive: boolean }>`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  text-transform: uppercase;

  color: ${(props) => (props.positive ? "#4DA167" : "#FF1654")};
`;

const Subtitle = styled.div`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 31px;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 10px;

  color: ${Colors.PRIMARY};
`;

const StyledSection = styled.div``;

const StyledItem = styled.p`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: ${Colors.PRIMARY};
  margin: 0;
  letter-spacing: -0.5px;
`;

type Section = {
  title?: string;
  items: Array<string>;
};

interface DoDontCardProps {
  positive?: boolean;
  title: string;
  sections: Array<Section>;
}

function DoDontCard({
  positive = true,
  title,
  sections,
}: DoDontCardProps): JSX.Element {
  return (
    <StyledCard>
      <Icon type={positive ? "sell-do" : "sell-dont"} size={96}></Icon>
      <SizedBox height={16}></SizedBox>
      <Title positive={positive}>{title}</Title>
      {sections.map((section, index) => (
        <StyledSection key={index}>
          {section.title && <Subtitle>{section.title}</Subtitle>}
          {!section.title && <SizedBox height={20}></SizedBox>}
          {section.items.map((item, index) => (
            <Row key={index}>
              <Icon
                type={positive ? "checking-mark" : "forbidden-mark"}
                size={12}
              ></Icon>
              <SizedBox width={5}></SizedBox>
              <StyledItem key={item}>{item}</StyledItem>
            </Row>
          ))}
        </StyledSection>
      ))}
    </StyledCard>
  );
}

export default DoDontCard;
