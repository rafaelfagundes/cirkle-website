import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import CustomButton from "../../../Atoms/CustomButton";

const Hero = styled.div`
  position: relative;
`;

const HeroBackground = styled(Image)`
  position: absolute;
`;

const Headlines = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  margin-right: -30px;
`;

const HeadlinesContent = styled.div`
  position: relative;
  padding: 0 5vw;
`;

const HeadlineBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  transform: matrix(-0.99, 0, -0.12, 1, 0, 0);
`;

const Headline1 = styled.div`
  position: absolute;
  margin-top: 15px;
  font-family: Commissioner;
  font-style: normal;
  font-weight: 700;
  font-size: 6vw;
  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
  margin-left: 12px;
`;

const Headline2 = styled.div`
  position: absolute;
  margin-top: 40px;
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 6vw;

  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
  margin-left: 9px;
`;

const Headline3 = styled.div`
  position: absolute;
  margin-top: 65px;
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 6vw;

  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
  margin-left: 6px;
`;

const Headline4 = styled.div`
  position: absolute;
  margin-top: 90px;
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 6vw;

  line-height: 45px;
  text-transform: capitalize;
  color: ${Colors.PRIMARY};
  z-index: 1;
  margin-left: 3px;
`;

const StyledCustomButton = styled(CustomButton)`
  position: absolute;
  margin-top: 145px;
  margin-left: -7px;
  z-index: 1;
`;

function WannaSellMobileHero(): JSX.Element {
  return (
    <>
      <Hero>
        <HeroBackground
          src="/images/wanna-sell-hero-bg.jpg"
          alt="Background Image"
          width={1920}
          height={1080}
          quality={75}
        ></HeroBackground>
        <Headlines>
          <HeadlinesContent>
            <Headline1>UMA NOVA</Headline1>
            <Headline2>HISTÓRIA</Headline2>
            <Headline3>PARA SUAS</Headline3>
            <Headline4>ROUPAS</Headline4>
            <StyledCustomButton
              variant="contained"
              type="success"
              onClick={null}
              width={150}
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

export default WannaSellMobileHero;
