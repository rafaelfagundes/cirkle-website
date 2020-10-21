import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const SeparatorHolder = styled.div`
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  background-image: url("/images/separator.svg");
  height: 25px;
  width: 100%;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.1;
`;

const OrHolder = styled.div`
  margin: 0 10px;
`;

const OrText = styled.div`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 14px;
  font-weight: bold;
`;

function TextSeparator({ children }: { children: string }): JSX.Element {
  return (
    <SeparatorHolder>
      <Line></Line>
      <OrHolder>
        <OrText>{children}</OrText>
      </OrHolder>
      <Line></Line>
    </SeparatorHolder>
  );
}

export default TextSeparator;
