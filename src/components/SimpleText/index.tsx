import styled from "styled-components";
import Colors from "../../enums/Colors";

const Text = styled.p<{ centered: boolean; color: string; size: number }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}rem;
  line-height: ${(props) => props.size * 1.3}rem;
  ${(props) => (props.centered ? "text-align: center;" : null)};
  margin: 0;
`;

function SimpleText({
  children,
  centered = false,
  color = Colors.PRIMARY,
  size = 1,
}: {
  children: string;
  centered?: boolean;
  color?: string;
  size?: number;
}): JSX.Element {
  return (
    <Text color={color} size={size} centered={centered}>
      {children}
    </Text>
  );
}

export default SimpleText;
