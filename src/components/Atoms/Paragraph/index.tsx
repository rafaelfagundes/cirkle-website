import styled from "styled-components";
import Colors from "../../../enums/Colors";

const Text = styled.p<{
  centered: boolean;
  color: string;
  size: number;
  bold: boolean;
}>`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}rem;
  line-height: ${(props) => props.size * 1.5}rem;
  ${(props) => (props.centered ? "text-align: center;" : null)};
  margin: 0;
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  user-select: none;
  letter-spacing: -0.01px;
  max-width: 65ch;
  margin-bottom: 20px;
`;

function Paragraph({
  children,
  centered = false,
  color = Colors.PRIMARY,
  size = 1,
  bold = false,
}: {
  children: string;
  centered?: boolean;
  color?: string;
  size?: number;
  bold?: boolean;
}): JSX.Element {
  return (
    <Text color={color} size={size} centered={centered} bold={bold}>
      {children}
    </Text>
  );
}

export default Paragraph;
