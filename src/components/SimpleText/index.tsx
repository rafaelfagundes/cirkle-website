import styled from "styled-components";
import Colors from "../../enums/Colors";

const Text = styled.p<{ centered: boolean }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 1rem;
  line-height: 1.3rem;
  ${(props) => (props.centered ? "text-align: center;" : null)};
  margin: 0;
`;

function SimpleText({
  children,
  centered = false,
}: {
  children: string;
  centered?: boolean;
}): JSX.Element {
  return <Text centered={centered}>{children}</Text>;
}

export default SimpleText;
