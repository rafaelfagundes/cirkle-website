import { Popover } from "@material-ui/core";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

export const QtyHolder = styled.div`
  background-color: ${Colors.SECONDARY};
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -5px 0 0 -5px;
`;

export const QtyText = styled.span`
  font-family: Commissioner;
  color: ${Colors.WHITE};
  font-weight: 700;
  font-size: 12px;
`;

export const IconHolder = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const IconCounter = styled.span`
  cursor: pointer;
  position: absolute;
  color: ${Colors.WHITE};
  font-family: Commissioner;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 12px;
  font-weight: 700;
  top: 16px;
`;
export const StyledCart = styled(Popover)``;

export const CartHeader = styled.div`
  background-color: ${Colors.SECONDARY};
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
`;
export const CartHeaderText = styled.span`
  font-family: Commissioner;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  color: ${Colors.WHITE};
  font-weight: 700;
`;
export const CartHeaderNumber = styled.span`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Commissioner;
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
  font-family: Commissioner;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  color: ${Colors.PRIMARY};
  font-weight: 700;
`;
export const Value = styled.span`
  font-family: Commissioner;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  color: ${Colors.MONEY};
  font-weight: 700;
`;
export const CartText = styled.p`
  font-family: Commissioner;
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
  overflow-y: scroll;
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #cccccc;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size * 0.75}px;
  margin-right: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.span`
  font-family: Commissioner;
  color: ${Colors.PRIMARY};
  font-size: 18px;
`;
export const Description = styled.span`
  font-family: Commissioner;
  color: ${Colors.PRIMARY};
  /* background-color: ${Colors.PRIMARY}; */
  font-size: 14px;
  max-width: 300px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
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
  font-family: Commissioner;
  color: ${Colors.MONEY};
  font-weight: 700;
`;
export const Color = styled.span`
  font-family: Commissioner;
  color: ${Colors.PRIMARY};
`;
export const Size = styled.span`
  font-family: Commissioner;
  color: ${Colors.PRIMARY};
`;
export const Qty = styled.span`
  font-family: Commissioner;
  color: ${Colors.GRAY};
`;
