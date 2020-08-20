import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

const StyledInput = styled.div`
  border: 2px solid ${Colors.PRIMARY};
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "FuturaPT",
    fontSize: 18,
  },
}));

function CustomTextField({
  children,
  iconType = "",
  value = null,
}: {
  children: string;
  iconType?: string;
  value?: string;
}): JSX.Element {
  return (
    <StyledInput>
      {iconType !== "" && (
        <>
          <Icon type={iconType}></Icon>
          <SizedBox width={5}></SizedBox>
        </>
      )}
      <InputBase
        value={value}
        className={useStyles().input}
        placeholder={children}
      />
    </StyledInput>
  );
}

export default CustomTextField;
