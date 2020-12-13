import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Column from "../../Atoms/Column";
import Icon from "../../Atoms/Icon";
import SizedBox from "../../Atoms/SizedBox";
import Subtitle from "../../Atoms/Subtitle";
import Title from "../../Atoms/Title";

const StyledSectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.SECONDARY};
  background: linear-gradient(135deg, rgba(201, 66, 119, 1) 0%, #ffbc42 100%);
  padding: 10px 20px;
  border-radius: 4px;
`;

function HotSectionTitle(): JSX.Element {
  return (
    <StyledSectionTitle>
      <Column>
        <Title size={22} color={Colors.WHITE}>
          EM ALTA
        </Title>
        <SizedBox height={2}></SizedBox>
        <Subtitle size={16} color={Colors.VERY_LIGHT_GRAY}>
          Os produtos mais desejados
        </Subtitle>
      </Column>
      <Icon type="profits" size={48}></Icon>
    </StyledSectionTitle>
  );
}

export default HotSectionTitle;
