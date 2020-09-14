import styled from "styled-components";

export const TextPlaceholder = styled.div<{ width: number; color: string }>`
  width: ${(props) => props.width}px;
  height: 18px;
  background-color: ${(props) => props.color};

  animation: FadeInFadeOut 1500ms linear infinite;

  @keyframes FadeInFadeOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
`;
