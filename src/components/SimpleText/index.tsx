import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const Text = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 1rem;
  line-height: 1rem;
`;

function SimpleText({ children }: { children: string }): JSX.Element {
  return <Text>{children}</Text>;
}

export default SimpleText;
