import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Column from "../../Atoms/Column";
import Icon from "../../Atoms/Icon";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";

const StyledStepItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 326px;
  height: 110px;
`;

const StepItemBg = styled.div`
  position: absolute;
  width: 326px;
  height: 110px;
  background-color: ${Colors.WHITE};
  transform: matrix(0.96, 0, -0.31, 1, 0, 0);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin: 0;
`;

const Description = styled.p`
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.5px;
  color: ${Colors.SECONDARY};
  margin: 0;
`;

interface StepItemProps {
  icon: string;
  title: string;
  children: string;
}

function StepItem(props: StepItemProps): JSX.Element {
  return (
    <StyledStepItem>
      <StepItemBg></StepItemBg>
      <div style={{ zIndex: 1, width: 260 }}>
        <Row>
          <Icon type={props.icon} size={64}></Icon>
          <SizedBox width={12}></SizedBox>
          <Column>
            <Title>{props.title}</Title>
            <SizedBox height={5}></SizedBox>
            <Description>{props.children}</Description>
          </Column>
        </Row>
      </div>
    </StyledStepItem>
  );
}

export default StepItem;
