import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Product from "../../../modules/product/Product";
import theme from "../../../theme/theme";
import Padding from "../../Atoms/Padding";
import SizedBox from "../../Atoms/SizedBox";
import Title from "../../Atoms/Title";
import MiniProductItem from "../MiniProductItem";

const Section = styled.div``;

const ItemsHolder = styled.div<{
  disableScroll?: boolean;
  isSmartphone: boolean;
}>`
  padding: ${(props) => (props.isSmartphone ? "0 0 0 16px" : 0)};
  display: flex;
  flex-wrap: ${(props) => (props.disableScroll ? "wrap" : "nowrap")};
  flex-direction: row;
  align-items: center;
  overflow: ${(props) => (props.disableScroll ? "hidden" : "scroll")};
`;

const Spacer = styled.div`
  content: "-";
  width: 0px;
  height: 0px;
  color: transparent;
`;

function RecentItemsCarousel({
  title,
  products,
  large = false,
}: {
  title?: string;
  products: Array<Product>;
  large?: boolean;
}): JSX.Element {
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {title && (
        <>
          <Padding horizontal={isSmartphone ? 16 : 0}>
            <Title>{title}</Title>
          </Padding>
          <SizedBox height={16}></SizedBox>
        </>
      )}
      <Section>
        <ItemsHolder disableScroll={!isSmartphone} isSmartphone={isSmartphone}>
          {products.map((item, index) => (
            <React.Fragment key={item.uid}>
              <MiniProductItem data={item}></MiniProductItem>
              {index + 1 < products.length && (
                <SizedBox width={large ? 24 : 16}></SizedBox>
              )}
            </React.Fragment>
          ))}
          {isSmartphone ? <Spacer>-</Spacer> : null}
        </ItemsHolder>
      </Section>
    </>
  );
}

export default RecentItemsCarousel;
