import React from "react";
import styled from "styled-components";

const StyledAnimation = styled.div<{ image: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: spin 750ms linear infinite;
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

function LoadingAnimation({
  size,
  color,
}: {
  size: number;
  color?: boolean;
}): JSX.Element {
  return (
    <span data-test="loading-animation">
      <StyledAnimation
        size={size}
        image={
          color
            ? "/images/loading/loading_color.png"
            : "/images/loading/loading_white.png"
        }
      ></StyledAnimation>
    </span>
  );
}

export default LoadingAnimation;
