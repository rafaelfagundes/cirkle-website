import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import SizedBox from "../../Atoms/SizedBox";

const Section = styled.div<{ oddBg: boolean }>`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.oddBg ? "#F5D6EC" : "#fbeff7")};
`;

const Headline = styled.h1`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin: 0;
`;

const Subheadline = styled.h2`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: ${Colors.SECONDARY};
  margin: 0;
  text-align: center;
  width: 589px;
`;

const Content = styled.div``;

interface PageSectionProps {
  headline: string;
  subheadline: string;
  children: any;
  odd?: boolean;
}

function PageSection({
  headline,
  subheadline,
  children,
  odd = false,
}: PageSectionProps): JSX.Element {
  return (
    <Section oddBg={odd}>
      <Headline>{headline}</Headline>
      <SizedBox height={12}></SizedBox>
      <Subheadline>{subheadline}</Subheadline>
      <SizedBox height={50}></SizedBox>
      <Content>{children}</Content>
    </Section>
  );
}

export default PageSection;
