import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledLink = styled.div`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${Colors.PRIMARY};
  cursor: pointer;
`;

function TextLink({
  href,
  children,
}: {
  href: string;
  children: string;
}): JSX.Element {
  return (
    <Link href={href}>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
}

export default TextLink;
