import styled from "styled-components";
import Colors from "../../src/enums/Colors";

export const MainColumn = styled.div<{ isSmartPhone: boolean }>`
  margin: ${(props) => (props.isSmartPhone ? "0 0 16px 0" : "32px 0")};
  display: flex;
  flex: 2;
  flex-direction: column;
`;

export const SideColumn = styled(MainColumn)`
  flex: 1;
  position: relative;
  top: 0px;
`;

export const StyledCartContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Label = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.PRIMARY};
  font-weight: 700;
`;

export const Value = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.MONEY};
  font-weight: 700;
`;

export const Subvalue = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  letter-spacing: -0.25px;
  font-size: 13px;
  color: ${Colors.PRIMARY};
  font-weight: 400;
`;

export const Row = styled.div<{ padding?: boolean; spaceBetween?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};
  padding: ${(props) => (props.padding ? "0 16px" : 0)};
`;

export const CouponCheckboxRow = styled.div<{
  padding?: boolean;
  spaceBetween?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -12px;
`;

export const CartItems = styled.div``;

export const CartItem = styled.div<{ showBackground?: boolean }>`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${(props) =>
    props.showBackground ? "rgba(0, 0, 0, 0.015)" : "transparent"};
`;

export const CartItemImage = styled.div<{ image: string; size: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: ${(props) => props.size * 1.25}px;
  width: ${(props) => props.size}px;
  min-width: 90px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

export const Description = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 16px;
  margin-left: 6px;
`;

export const MoreInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Price = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.MONEY};
  font-weight: 700;
`;

export const Color = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
`;

export const Size = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
`;

export const Qty = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
`;

export const TitleAndRemove = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: calc(100% - 6px);
  margin-left: 6px;
`;

export const ImagePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export const CartFooter = styled.div<{ isSmartPhone: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props) => (props.isSmartPhone ? `width: 100%;` : "")};
  margin-bottom: ${(props) => (props.isSmartPhone ? "32px" : 0)};
`;

export const OpacityAnimation = styled.div<{ animate: boolean }>`
  height: ${(props) => (props.animate ? "44px" : 0)};
  opacity: ${(props) => (props.animate ? 1 : 0)};
  transition: 250ms opacity ease-in, 250ms height ease-in;
`;
