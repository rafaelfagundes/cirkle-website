import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledTitleAndData = styled.div<{ minWidth: number }>`
  min-width: ${(props) => (props.minWidth ? props.minWidth : 0)}px;
`;

const Title = styled.div<{ titleCentered: boolean }>`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
  color: ${Colors.SECONDARY};
  text-align: ${(props) => (props.titleCentered ? "center" : "left")};
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Data = styled.div<{ dataCentered: boolean }>`
  font-weight: 500;
  text-align: ${(props) => (props.dataCentered ? "center" : "left")};
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.PRIMARY};
`;

function TitleAndData({
  title,
  children,
  dataCentered,
  titleCentered,
  minWidth,
}: {
  title: string;
  children: string | JSX.Element;
  dataCentered?: boolean;
  titleCentered?: boolean;
  minWidth?: number;
}): JSX.Element {
  return (
    <StyledTitleAndData minWidth={minWidth}>
      <Title titleCentered={titleCentered}>{title}</Title>
      <Data dataCentered={dataCentered}>{children}</Data>
    </StyledTitleAndData>
  );
}

export default TitleAndData;
