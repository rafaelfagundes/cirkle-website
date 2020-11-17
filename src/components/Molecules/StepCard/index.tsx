import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledStepCard = styled.div`
  background: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  width: 600px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberHolder = styled.div`
  width: 45px;
  height: 45px;
  border: 2px solid ${Colors.SECONDARY};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  padding: 20px;
  margin-right: 10px;
`;

const Number = styled.p`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: ${Colors.SECONDARY};
  margin: 0;
`;

const Description = styled.div`
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

interface StepCardProps {
  position: number;
  children: string;
}

function StepCard(props: StepCardProps): JSX.Element {
  return (
    <StyledStepCard>
      <NumberHolder>
        <Number>{props.position}</Number>
      </NumberHolder>
      <Description>{props.children}</Description>
    </StyledStepCard>
  );
}

export default StepCard;
