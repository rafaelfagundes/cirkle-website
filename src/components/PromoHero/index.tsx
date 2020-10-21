import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import PromoHero from "../../modules/promoHero/PromoHero";
import { cloudinaryHeroImage, cloudinaryImage } from "../../utils/image";

const TextPromo = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
`;

const TextPromoText = styled.span<{ color: string }>`
  font-family: Commissioner;
  font-style: italic;
  font-weight: 800;
  font-size: 14px;
  align-items: center;
  text-align: center;
  /* letter-spacing: 0.5px; */
  text-transform: uppercase;
  color: ${(props) => props.color};
`;

const PromoBackground = styled.div<{ image: string }>`
  position: relative;
  background-color: #fff;

  width: 100%;
  height: 563px;

  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
`;

const Content = styled.span`
  position: absolute;
  width: 100%;
  padding: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 563px;

  /* z-index: 100; */
`;

const Tint = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 563px;
  background-color: ${(props) => props.color};
  mix-blend-mode: color;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StripLine = styled.div<{
  backgroundColor: string;
  sizeMultiplier: number;
}>`
  padding: ${(props) => props.sizeMultiplier * 18}px
    ${(props) => props.sizeMultiplier * 24}px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const LineText = styled.div<{ color: string; sizeMultiplier: number }>`
  font-family: Commissioner;
  font-style: italic;
  font-weight: 900;
  font-size: ${(props) => props.sizeMultiplier * 32}px;
  line-height: ${(props) => props.sizeMultiplier * 32}px;

  align-items: center;

  letter-spacing: ${(props) => props.sizeMultiplier * 2.8}px;
  text-transform: uppercase;
  text-align: center;

  color: ${(props) => props.color};
`;

const Button = styled.div<{ backgroundColor: string }>`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 44px;
  width: 150px;

  background-color: ${(props) => props.backgroundColor};

  cursor: pointer;

  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));

  &:hover {
    filter: contrast(200%);
  }
  &:active {
    filter: invert(100%);
  }
`;

const ButtonText = styled.div<{ color: string }>`
  font-family: Commissioner;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${(props) => props.color};
`;

const Tiles = styled.div<{ size: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  width: ${(props) => props.size}px;

  padding: ${(props) =>
    props.size < 960 ? "20px 0px 30px 20px" : "20px 0 30px 0"};

  overflow-x: auto;
`;

const Tile = styled.div<{ size: number }>`
  margin-right: ${(props) => (props.size < 960 ? "20px" : 0)};
  user-select: none;
  background-color: #fff;

  position: static;
  width: 143px;
  height: 230px;
  left: 0px;
  top: 0px;

  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  align-self: center;
  flex-grow: 0;

  cursor: pointer;

  &:hover {
    filter: saturate(120%) contrast(120%);
    transform: translateY(-5px);
  }
  &:active {
    transform: translateY(0px);
  }
  transition: transform 240ms ease-in;
`;

const TileImage = styled.div<{ image: string }>`
  background-color: ${Colors.LIGHT_GRAY};
  width: 143px;
  height: 186px;

  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
`;

const TileTitle = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleText = styled.div`
  font-family: Commissioner;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  color: ${Colors.PRIMARY};
`;

const Spacer = styled.div`
  content: "-";
  width: 0px;
  height: 0px;
  color: transparent;
`;

function PromoHeroComponent({ data }: { data: PromoHero }): JSX.Element {
  const _goto = (url: string) => {
    console.log("_goto -> url", url);
  };

  let backgroundImage: string;
  let sizeMultiplier: number;
  let titlesHolderSize: number;
  let showSpacer = false;

  if (window.innerWidth >= 1920) {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 1;
    titlesHolderSize = 960;
  } else if (window.innerWidth >= 1440) {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 1;
    titlesHolderSize = 960;
  } else if (window.innerWidth >= 1280) {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 1;
    titlesHolderSize = 960;
  } else if (window.innerWidth >= 1024) {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 1;
    titlesHolderSize = 960;
  } else if (window.innerWidth >= 800) {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 1;
    titlesHolderSize = window.innerWidth;
  } else {
    backgroundImage = cloudinaryHeroImage(data.backgroundImage);
    sizeMultiplier = 0.6;
    titlesHolderSize = window.innerWidth;
    showSpacer = true;
  }

  return (
    <>
      {data && (
        <div>
          <TextPromo backgroundColor={data.textPromoBanner.backgroundColor}>
            <TextPromoText color={data.textPromoBanner.textColor}>
              {data.textPromoBanner.text}
            </TextPromoText>
          </TextPromo>
          <PromoBackground image={backgroundImage}>
            <Tint color={data.colorTint} />
            <Content>
              <Lines>
                <StripLine
                  backgroundColor={data.firstLineText.backgroundColor}
                  sizeMultiplier={sizeMultiplier}
                >
                  <LineText
                    color={data.firstLineText.textColor}
                    sizeMultiplier={sizeMultiplier}
                  >
                    {data.firstLineText.text}
                  </LineText>
                </StripLine>
                <StripLine
                  backgroundColor={data.secondLineText.backgroundColor}
                  sizeMultiplier={sizeMultiplier}
                >
                  <LineText
                    color={data.secondLineText.textColor}
                    sizeMultiplier={sizeMultiplier}
                  >
                    {data.secondLineText.text}
                  </LineText>
                </StripLine>
              </Lines>

              <Tiles size={titlesHolderSize}>
                {data.tiles.map((item) => (
                  <Tile
                    key={item.url}
                    onClick={() => _goto(item.url)}
                    size={titlesHolderSize}
                  >
                    <TileImage
                      image={cloudinaryImage(item.image, 200)}
                    ></TileImage>
                    <TileTitle>
                      <TitleText>{item.title}</TitleText>
                    </TileTitle>
                  </Tile>
                ))}
                {showSpacer && <Spacer>-</Spacer>}
              </Tiles>

              <Button
                onClick={() => _goto(data.cta.url)}
                backgroundColor={data.cta.backgroundColor}
              >
                <ButtonText color={data.cta.textColor}>
                  {data.cta.text}
                </ButtonText>
              </Button>
            </Content>
          </PromoBackground>
        </div>
      )}
    </>
  );
}

export default PromoHeroComponent;
