import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Padding from "../Padding";
import Title from "../Title";

const CategoriesContainer = styled.div``;

const CategoriesHolder = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px 16px 16px;
`;

const CategoryItem = styled.div<{ last?: boolean }>`
  flex: 1;
  border-color: ${Colors.SECONDARY};
  border-width: 2px;
  border-style: solid;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.last ? 0 : 16)}px;
`;

const CategoryItemText = styled.div`
  color: ${Colors.SECONDARY};
  font-family: "FuturaPT";
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

function HomeCategories(): JSX.Element {
  return (
    <CategoriesContainer>
      <Padding vertical={10} horizontal={16}>
        <Title color={Colors.SECONDARY}>Confira as novidades </Title>
      </Padding>
      <CategoriesHolder>
        <CategoryItem>
          <CategoryItemText>roupas</CategoryItemText>
        </CategoryItem>
        <CategoryItem>
          <CategoryItemText>bolsas</CategoryItemText>
        </CategoryItem>
        <CategoryItem last={true}>
          <CategoryItemText>calçados</CategoryItemText>
        </CategoryItem>
      </CategoriesHolder>
    </CategoriesContainer>
  );
}

export default HomeCategories;
