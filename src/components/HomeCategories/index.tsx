import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${Colors.WHITE};
`;

const CategoryItem = styled.div<{ last?: boolean }>`
  flex: 1;
  border-color: ${Colors.ULTRA_RED};
  border-width: 2px;
  border-style: solid;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.last ? 0 : 16)}px;
`;

const CategoryItemText = styled.div`
  color: ${Colors.ULTRA_RED};
  font-family: "Raleway";
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

function HomeCategories(): JSX.Element {
  return (
    <CategoriesContainer>
      <CategoryItem>
        <CategoryItemText>roupas</CategoryItemText>
      </CategoryItem>
      <CategoryItem>
        <CategoryItemText>bolsas</CategoryItemText>
      </CategoryItem>
      <CategoryItem last={true}>
        <CategoryItemText>calçados</CategoryItemText>
      </CategoryItem>
    </CategoriesContainer>
  );
}

export default HomeCategories;
