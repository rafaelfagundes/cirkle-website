import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../Icon";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

const StyledFiltersToggle = styled.div<{ hasFilters: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.hasFilters ? Colors.POOL_GREEN : Colors.WHITE};
  padding: 3px 20px;
  border-radius: 4px;
`;

interface Props {
  active: boolean;
  hasFilters: boolean;
  toggle: () => void;
}

function FiltersToggle(props: Props): JSX.Element {
  function getText(active, hasFilters) {
    if (active) {
      return "Fechar Filtros";
    }
    if (hasFilters) {
      return "Mostrar Filtros Ativos";
    } else {
      return "Filtrar";
    }
  }

  return (
    <StyledFiltersToggle onClick={props.toggle} hasFilters={props.hasFilters}>
      <SizedBox height={8}></SizedBox>
      <Row spaceBetween>
        <Row>
          <Icon type={props.hasFilters ? "filter-filled" : "filter"}></Icon>
          <SizedBox width={5}></SizedBox>
          <SimpleText>{getText(props.active, props.hasFilters)}</SimpleText>
        </Row>
        <Icon
          type={props.active ? "chevron-up" : "chevron-down"}
          size={16}
        ></Icon>
      </Row>
      <SizedBox height={8}></SizedBox>
    </StyledFiltersToggle>
  );
}

export default FiltersToggle;
