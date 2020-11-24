import { AppBar, Container, useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";
import HorizontalLogo from "../../Atoms/HorizontalLogo";
import Icon from "../../Atoms/Icon";
import Padding from "../../Atoms/Padding";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";

const Background = styled.div`
  background-color: #fbeff7;
  min-height: 100vh;
`;

const BarBackground = styled.div`
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex: 1;
`;

const Frame = styled.div`
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Badge = styled.img``;

const BreadCrumbs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BreadCrumb = styled.div<{ active: boolean; isSmartPhone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => (props.isSmartPhone && props.active ? 10 : 0)}px;
`;

const Text = styled.div<{ active: boolean; isSmartPhone: boolean }>`
  color: ${(props) => (props.active ? Colors.PRIMARY : "#a2a2a2")};
  font-size: ${(props) => (props.isSmartPhone ? 14 : 16)}px;
  font-family: Commissioner, sans-serif;
  font-weight: 500;
`;

const NumberHolder = styled.div<{ active: boolean; isSmartPhone: boolean }>`
  width: ${(props) => (props.isSmartPhone ? 22 : 32)}px;
  height: ${(props) => (props.isSmartPhone ? 22 : 32)}px;
  border-radius: 32px;
  background-color: ${(props) => (props.active ? Colors.PRIMARY : "#d2d2d2")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.isSmartPhone ? 5 : 10)}px;
`;

const BreadCrumbNumber = styled.div<{ isSmartPhone: boolean }>`
  color: ${Colors.WHITE};
  font-size: ${(props) => (props.isSmartPhone ? 12 : 16)}px;
  font-family: Commissioner, sans-serif;
  font-weight: 700;
`;

const Line = styled.div`
  width: 64px;
  height: 1px;
  background-color: #d2d2d2;
  margin: 0 16px;
`;

type Breadcrumb = {
  active: boolean;
  position: number;
  desc: string;
};

interface LastMilePageProps {
  breadcrumbs: Array<Breadcrumb>;
  children: JSX.Element | Array<JSX.Element>;
}

function LastMilePage(props: LastMilePageProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Background>
      <AppBar position="static" color="transparent" elevation={0}>
        <BarBackground>
          <Container maxWidth="lg">
            <Padding vertical={10}>
              <Row spaceBetween>
                {!isSmartPhone && <HorizontalLogo></HorizontalLogo>}
                {isSmartPhone && <Icon size={36} type="icon_isolated"></Icon>}
                <BreadCrumbs>
                  {props.breadcrumbs.map((item, index) => (
                    <>
                      <BreadCrumb
                        isSmartPhone={isSmartPhone}
                        active={item.active}
                      >
                        <NumberHolder
                          active={item.active}
                          isSmartPhone={isSmartPhone}
                        >
                          <BreadCrumbNumber isSmartPhone={isSmartPhone}>
                            {item.position}
                          </BreadCrumbNumber>
                        </NumberHolder>
                        {!isSmartPhone && (
                          <Text
                            active={item.active}
                            isSmartPhone={isSmartPhone}
                          >
                            {item.desc}
                          </Text>
                        )}
                        {isSmartPhone && item.active && (
                          <Text
                            active={item.active}
                            isSmartPhone={isSmartPhone}
                          >
                            {item.desc}
                          </Text>
                        )}
                      </BreadCrumb>
                      {index !== props.breadcrumbs.length - 1 &&
                        !isSmartPhone && <Line></Line>}
                    </>
                  ))}
                </BreadCrumbs>
                <Badge src="/images/security_badge_green.svg"></Badge>
              </Row>
            </Padding>
          </Container>
        </BarBackground>
      </AppBar>
      <SizedBox height={isSmartPhone ? 16 : 48}></SizedBox>
      <Container disableGutters={true} maxWidth="md">
        <Frame>{props.children}</Frame>
      </Container>
      <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
    </Background>
  );
}

export default LastMilePage;
