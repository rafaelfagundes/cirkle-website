import { Link } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const SellButton = styled.div`
  width: 140px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  /* border: 1px solid #a3e0d9; */
  background-color: #c94277;
  height: 45px;
  /* border-radius: 16px; */
`;

const SellText = styled.p`
  font-family: "FuturaPT";
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
`;

function SellLink({ children }: { children: string }): JSX.Element {
  return (
    <Link href="/sell">
      <SellButton>
        <SellText>{children}</SellText>
      </SellButton>
    </Link>
  );
}

SellLink.propTypes = {
  children: PropTypes.string,
};

export default SellLink;
