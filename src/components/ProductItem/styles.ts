import styled from "styled-components";
import Colors from "../../enums/Colors";

export const Item = styled.div<{ isSmartphone: boolean }>`
  cursor: pointer;
  width: 228px;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
  margin-bottom: 16px;
`;

export const Image = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 220px;
  width: 228px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 900000000;
`;

export const BrandName = styled.div`
  align-items: center;
  background-color: ${Colors.SECONDARY};
  display: flex;
  flex-direction: row;
  height: 18px;
  justify-content: center;
  padding: 0 10px;
`;

export const BrandNameText = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${Colors.WHITE};
`;

export const TitleHolder = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const Title = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: flex-end;
  color: ${Colors.PRIMARY};
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 16px 0 16px;
  font-weight: 500;
`;

export const FavoriteIconHolder = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 5px 0 0;
  cursor: pointer;
`;

export const AnimatedHeart = styled.div<{ isSmartphone: boolean }>`
  user-select: none;
  position: absolute;
  left: ${(props) =>
    props.isSmartphone ? "calc(50% - 0.5px);" : "calc(50% - 0.5px);"};
  top: 110px;
`;

export const RemoveIconHolder = styled(FavoriteIconHolder)`
  cursor: pointer;
`;

export const RemoveButton = styled.div`
  background-color: ${Colors.VERY_LIGHT_GRAY};
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

export const NumberPosition = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 24px;
`;

export const NumberPositionText = styled.span`
  font-family: "Commissioner", Lato, sans-serif;
  color: ${Colors.WHITE};
  font-weight: 700;
  padding: 0 6px 0 8px;
  z-index: 1;
`;

export const NumberPositionDetail = styled.div`
  transform: skew(-24deg);
  width: 48px;
  height: 24px;
  background-color: ${Colors.PARADISE_PINK};
  display: flex;
  position: absolute;
`;
