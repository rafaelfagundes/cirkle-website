import styled from "styled-components";
import Colors from "../../../enums/Colors";

export const Item = styled.div<{ isSmartphone: boolean }>`
  cursor: pointer;
  width: 100%;
  background-color: ${Colors.WHITE};
  /* margin-right: 8px; */
  margin-left: 14px;
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

export const Image = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 170px;
  width: 120px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 900000000;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Content = styled.div`
  padding: 16px;
  height: 168px;
`;

export const BrandName = styled.div`
  align-items: center;
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
  color: #838383;
  text-transform: uppercase;
  margin-bottom: 3px;
`;

export const Title = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  display: flex;
  align-items: flex-end;
  color: ${Colors.PRIMARY};

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 92px;
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
  padding: 4px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 24px;
  /* margin-top: 16px; */
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  background-color: ${Colors.PARADISE_PINK};
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

export const Price = styled.span`
  margin: 0;
  font-family: "Commissioner", Lato, sans-serif;
  color: ${Colors.SECONDARY};
  font-weight: 700;
  font-size: 16px;
  margin-right: 6px;
`;

export const OldPrice = styled.span`
  margin: 0;
  font-family: "Commissioner", Lato, sans-serif;
  color: ${Colors.SECONDARY};
  font-weight: 700;
  font-size: 12px;
  margin-right: 6px;
  text-decoration: line-through;
  opacity: 0.5;
`;

export const SizeContainer = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  top: 190px;
  left: 16px;
`;

export const SizeHolder = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  height: 20px;
  min-width: 20px;
  padding: 0 3px;
  border-radius: 4px;
  border: 1px solid ${Colors.SECONDARY};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 5px;

  z-index: 3;
`;

export const Size = styled.span`
  color: ${Colors.PRIMARY};
  margin: 0;
  font-family: "Commissioner", Lato, sans-serif;
  font-weight: 700;
  font-size: 12px;
`;
