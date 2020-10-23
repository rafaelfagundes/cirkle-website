import styled from "styled-components";
import Colors from "../../enums/Colors";

export const Item = styled.div<{ isSmartphone: boolean }>`
  cursor: pointer;
  width: 106px;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
`;

export const Image = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 118px;
  width: 106px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 900000000;
`;

export const TitleHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
`;

export const Title = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: ${Colors.PRIMARY};
  line-height: 120%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: -0.25px;
  text-align: center;
  font-weight: 500;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 10px 0 10px;
  font-weight: 500;
`;
