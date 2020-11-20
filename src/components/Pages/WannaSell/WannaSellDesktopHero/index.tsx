import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import CustomButton from "../../../Atoms/CustomButton";
import HorizontalLogo from "../../../Atoms/HorizontalLogo";

const Hero = styled.div`
  position: relative;
`;

const HeroBackground = styled(Image)`
  position: absolute;
`;

const Headlines = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  width: 45%;
  height: 55%;
`;

const HeadlinesContent = styled.div`
  position: relative;
  padding: 0 3vw;
`;

const HeadlineBg = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  transform: matrix(-1, 0.12, 0, 0.99, 0, 0);
`;

const StyledHorizontalLogo = styled(HorizontalLogo)`
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 1;
`;

const Headline1 = styled.div`
  position: absolute;
  margin-top: 20%;
  font-family: Commissioner;
  font-style: normal;
  font-weight: 700;
  font-size: 3.3vw;
  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
`;

const Headline2 = styled.div`
  position: absolute;
  margin-top: 28%;
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 3.3vw;
  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
`;

const Subheadline = styled.div`
  position: absolute;
  font-family: Commissioner, sans-serif;
  font-weight: bold;
  font-size: 1.3vw;
  line-height: 142%;
  color: ${Colors.SECONDARY};
  margin-top: 38%;
  z-index: 1;
  padding-right: 20px;
`;

const StyledCustomButton = styled(CustomButton)`
  position: absolute;
  margin-top: 54%;
  z-index: 1;
`;

function WannaSellDesktopHero(): JSX.Element {
  const getLogo = () => {
    if (process.browser) {
      return window.innerWidth * 0.140625;
    } else {
      return 180;
    }
  };

  return (
    <>
      <Hero>
        <HeroBackground
          src="/images/wanna-sell-hero-bg.jpg"
          alt="Background Image"
          width={1920}
          height={1080}
          quality={100}
        ></HeroBackground>
        <Headlines>
          <HeadlinesContent>
            <StyledHorizontalLogo width={getLogo()}></StyledHorizontalLogo>
            <Headline1>UMA NOVA HISTÓRIA</Headline1>
            <Headline2>PARA SUAS ROUPAS</Headline2>
            <Subheadline>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </Subheadline>
            <StyledCustomButton
              variant="contained"
              type="success"
              onClick={null}
              width={200}
            >
              Quero Vender
            </StyledCustomButton>
          </HeadlinesContent>
          <HeadlineBg></HeadlineBg>
        </Headlines>
      </Hero>
    </>
  );
}

export default WannaSellDesktopHero;
