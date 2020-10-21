import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledMarkdownText = styled.div`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  color: ${Colors.PRIMARY};

  & > p {
    font-size: 14px;
    margin: 0 0 22px 0;
  }

  & > ul {
    margin: 6px 0 22px 0;
    padding: 0 0 0 18px;
  }

  & > ul > li {
    font-size: 14px;
    margin: 0;
  }

  & > h1 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    margin: 0 0 6px 0;
  }

  & > h2 {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    margin: 0 0 6px 0;
  }

  & > h3 {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.005em;
    margin: 0 0 6px 0;
  }
`;

function MarkdownText({ children }: { children: string }): JSX.Element {
  return (
    <StyledMarkdownText>
      <ReactMarkdown source={children} />
    </StyledMarkdownText>
  );
}

export default MarkdownText;
