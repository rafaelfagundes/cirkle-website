import styled from "styled-components";
import Colors from "../../enums/Colors";

export const Item = styled.div<{ isSmartphone: boolean }>`
  width: 228px;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
  margin-bottom: 28px;
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
  margin-bottom: 6px;
  padding: 0 10px;
`;

export const BrandNameText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${Colors.WHITE};
`;

export const Title = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 110%;
  display: flex;
  align-items: flex-end;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

export const Description = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 66px;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  border-top-width: 0px;
  border-top-color: ${Colors.VERY_LIGHT_GRAY};
  border-top-style: solid;
`;

export const PriceText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${Colors.MAGENTA};
  letter-spacing: -0.5px;
`;

export const OldPrice = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 10px;
  text-decoration-line: line-through;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 3px;
  letter-spacing: -0.5px;
`;

export const Discount = styled.div`
  background: ${Colors.RED_CRAYOLA};
  border-radius: 12px;
  padding: 3px 6px;
`;

export const DiscountText = styled.span`
  align-items: center;
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 90%;
  text-align: center;
  display: flex;
`;

export const FavoriteIconHolder = styled.div`
  width: 228px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 5px 0 0;
`;

export const AnimatedHeart = styled.div<{ isSmartphone: boolean }>`
  position: absolute;
  left: ${(props) =>
    props.isSmartphone ? "calc(50% - 56px);" : "calc(50% - 48px);"};
  top: calc(110px - 48px);
`;

export const RemoveIconHolder = styled(FavoriteIconHolder)``;

export const RemoveButton = styled.div`
  background-color: ${Colors.VERY_LIGHT_GRAY};
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;
