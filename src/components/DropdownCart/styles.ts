import { Popover } from "@material-ui/core";
import styled from "styled-components";
import Colors from "../../enums/Colors";

export const IconHolder = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const IconCounter = styled.span`
  cursor: pointer;

  position: absolute;
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  font-weight: 700;
  top: 4px;
`;

export const StyledCart = styled(Popover)``;

export const CartHeader = styled.div`
  background-color: ${Colors.PRIMARY};
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
`;

export const CartHeaderText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.WHITE};
  font-weight: 700;
`;

export const CartHeaderNumber = styled.span`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  color: ${Colors.PRIMARY};
  font-weight: 700;
  background-color: ${Colors.WHITE};
  width: 22px;
  height: 22px;
  border-radius: 11px;
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

export const CartText = styled.p`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: 0px;
  font-size: 12px;
  color: ${Colors.RED_PINK};
  font-weight: 700;
  text-align: center;
`;

export const Row = styled.div<{ padding?: boolean; spaceBetween?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "center"};
  padding: ${(props) => (props.padding ? "0 16px" : 0)};
`;

export const CartItems = styled.div<{ height: number }>`
  max-height: ${(props) => props.height - 250}px;
  overflow: scroll;
`;

export const CartItem = styled.div<{ showBackground: boolean }>`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.showBackground ? "rgba(0, 0, 0, 0.025)" : "transparent"};
`;

export const CartItemImage = styled.div<{ image: string; size: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size * 0.75}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 18px;
`;

export const Description = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: ${Colors.PRIMARY};
  /* background-color: ${Colors.PRIMARY}; */
  font-size: 16px;
  max-width: 300px;
`;

export const MoreInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
`;

export const PriceAndButton = styled(MoreInfo)``;

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
