import React from "react";
import styled from "styled-components";
import Column from "../Column";
import Icon from "../Icon";
import SizedBox from "../SizedBox";
import Subtitle from "../Subtitle";
import Title from "../Title";

const StyledSectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;
  margin-left: -10px;
`;

function HotSectionTitle(): JSX.Element {
  return (
    <StyledSectionTitle>
      <Icon type="thermometer" size={48}></Icon>
      <Column>
        <Title size={18}>EM ALTA</Title>
        <SizedBox height={6}></SizedBox>
        <Subtitle size={18}>Produtos que todo mundo está de olho</Subtitle>
      </Column>
    </StyledSectionTitle>
  );
}

export default HotSectionTitle;
