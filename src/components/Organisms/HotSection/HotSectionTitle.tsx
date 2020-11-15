import React from "react";
import styled from "styled-components";
import Column from "../../Atoms/Column";
import Icon from "../../Atoms/Icon";
import SizedBox from "../../Atoms/SizedBox";
import Subtitle from "../../Atoms/Subtitle";
import Title from "../../Atoms/Title";

const StyledSectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 375px;
  margin-left: -10px;
`;

function HotSectionTitle(): JSX.Element {
  return (
    <StyledSectionTitle>
      <Icon type="thermometer" size={48}></Icon>
      <Column>
        <Title size={18}>EM ALTA</Title>
        <SizedBox height={2}></SizedBox>
        <Subtitle size={16}>Os produtos mais desejados</Subtitle>
      </Column>
    </StyledSectionTitle>
  );
}

export default HotSectionTitle;
