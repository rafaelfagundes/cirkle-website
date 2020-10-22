import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Image from "../../modules/image/Image";
import { cloudinaryProductImage } from "../../utils/image";

const SelectorHolder = styled.div<{ horizontal: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  background-color: ${(props) =>
    props.horizontal ? Colors.BLACK2 : "transparent"};
  min-width: 80px;
  align-items: center;
`;

const SelectorImage = styled.div<{
  active: boolean;
  image: string;
  horizontal: boolean;
}>`
  cursor: pointer;
  width: 64px;
  height: 64px;
  margin: ${(props) => (props.horizontal ? "0 8px 0 0" : "0 16px 16px 0")};

  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  opacity: ${(props) => (props.active ? 1 : 0.35)};

  transition: opacity 1000ms, border 1000ms;
`;

interface ImageSelectorProps {
  images: Array<Image>;
  activeImage: string;
  setActive: (url: string) => void;
  horizontal?: boolean;
}

function ImageSelector(props: ImageSelectorProps): JSX.Element {
  return (
    <SelectorHolder
      horizontal={props.horizontal === undefined ? undefined : props.horizontal}
    >
      {props.images.map((item) => (
        <SelectorImage
          horizontal={
            props.horizontal === undefined ? undefined : props.horizontal
          }
          key={item.url}
          active={item.url === props.activeImage}
          onClick={() => props.setActive(item.url)}
          image={cloudinaryProductImage(item.url, 64)}
        ></SelectorImage>
      ))}
    </SelectorHolder>
  );
}

export default ImageSelector;
