import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import SizedBox from "../../Atoms/SizedBox";

const Section = styled.div<{ oddBg: boolean; mobile: boolean }>`
  padding: ${(props) => (props.mobile ? "30px 20px" : "50px 20px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.oddBg ? "#F5D6EC" : "#fbeff7")};
`;

const Headline = styled.h1<{ mobile: boolean }>`
  padding: 0 16px;
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: ${(props) => (props.mobile ? 22 : 36)}px;
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin: 0;
  text-align: center;
`;

const Subheadline = styled.h2<{ mobile: boolean }>`
  padding: 0 16px;
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: ${(props) => (props.mobile ? 16 : 22)}px;
  color: ${Colors.SECONDARY};
  margin: 0;
  text-align: center;
  max-width: 589px;
`;

const Content = styled.div``;

interface PageSectionProps {
  headline: string;
  subheadline: string;
  children: any;
  odd?: boolean;
  mobile?: boolean;
}

function PageSection({
  headline,
  subheadline,
  children,
  odd = false,
  mobile = false,
}: PageSectionProps): JSX.Element {
  return (
    <Section mobile={mobile} oddBg={odd}>
      <Headline mobile={mobile}>{headline}</Headline>
      <SizedBox height={mobile ? 5 : 12}></SizedBox>
      <Subheadline mobile={mobile}>{subheadline}</Subheadline>
      <SizedBox height={mobile ? 30 : 50}></SizedBox>
      <Content>{children}</Content>
    </Section>
  );
}

export default PageSection;
