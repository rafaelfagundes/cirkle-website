import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledStepCard = styled.div<{ mobile: boolean }>`
  background: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  padding: ${(props) => (props.mobile ? 16 : 20)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.mobile ? "" : "600px")};
  border-radius: 4px;
`;

const NumberHolder = styled.div<{ mobile: boolean }>`
  width: ${(props) => (props.mobile ? 16 : 45)}px;
  height: ${(props) => (props.mobile ? 16 : 45)}px;
  border: 3px solid ${Colors.SECONDARY};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  padding: ${(props) => (props.mobile ? 16 : 20)}px;
  margin-right: 10px;
`;

const Number = styled.p<{ mobile: boolean }>`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => (props.mobile ? 16 : 18)}px;
  color: ${Colors.SECONDARY};
  margin: 0;
`;

const Description = styled.div<{ mobile: boolean }>`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => (props.mobile ? 16 : 18)}px;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

interface StepCardProps {
  position: number;
  children: string;
  mobile?: boolean;
}

function StepCard({
  position,
  children,
  mobile = false,
}: StepCardProps): JSX.Element {
  return (
    <StyledStepCard mobile={mobile}>
      <NumberHolder mobile={mobile}>
        <Number mobile={mobile}>{position}</Number>
      </NumberHolder>
      <Description mobile={mobile}>{children}</Description>
    </StyledStepCard>
  );
}

export default StepCard;
