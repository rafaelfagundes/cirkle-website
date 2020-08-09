import { Link } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const SellButton = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border: 2px solid ${Colors.EMERALD};
  height: 45px;
`;

const SellText = styled.p`
  font-family: "FuturaPT";
  color: ${Colors.EMERALD};
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
`;

function SellLink({
  children,
  width = 140,
}: {
  children: string;
  width?: number;
}): JSX.Element {
  return (
    <Link href="/sell">
      <SellButton width={width}>
        <SellText>{children}</SellText>
      </SellButton>
    </Link>
  );
}

SellLink.propTypes = {
  children: PropTypes.string,
};

export default SellLink;
