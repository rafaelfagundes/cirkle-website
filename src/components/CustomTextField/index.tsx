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

const StyledInputBase = styled(InputBase)`
  flex: 1;
`;

const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "FuturaPT",
    fontSize: 18,
  },
}));

type Props = {
  children: string;
  type?: string;
};

function getConfig(type: string): { icon: string; inputType: string } {
  switch (type) {
    case "password":
      return { icon: "key", inputType: "password" };
    case "email":
      return { icon: "email", inputType: "email" };
    case "user":
      return { icon: "person", inputType: "text" };

    default:
      return { icon: null, inputType: "text" };
  }
}

const CustomTextField = React.forwardRef((props: Props, ref) => {
  const config = getConfig(props.type);

  return (
    <StyledInput>
      {config.icon && (
        <>
          <Icon type={config.icon}></Icon>
          <SizedBox width={5}></SizedBox>
        </>
      )}
      <StyledInputBase
        ref={ref}
        className={useStyles().input}
        placeholder={props.children}
        type={config.inputType}
      />
    </StyledInput>
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
