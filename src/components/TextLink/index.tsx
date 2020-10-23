import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledLink = styled.span<{
  color: string;
  size: number;
}>`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size * 1.125}px;
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function TextLink({
  href,
  children,
  color = Colors.PRIMARY,
  size = 16,
}: {
  href: string;
  children: string;
  color?: string;
  size?: number;
}): JSX.Element {
  return (
    <Link href={href}>
      <StyledLink color={color} size={size}>
        {children}
      </StyledLink>
    </Link>
  );
}

export default TextLink;
