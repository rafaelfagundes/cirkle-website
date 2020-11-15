import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Product from "../../../modules/product/Product";
import theme from "../../../theme/theme";
import Padding from "../../Atoms/Padding";
import SizedBox from "../../Atoms/SizedBox";
import Title from "../../Atoms/Title";
import ProductItem from "../../Molecules/ProductItem";

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

function ProductCarousel({
  title,
  products,
}: {
  title?: string;
  products: Array<Product>;
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
          {!isSmartphone &&
            products.map((item, index) => (
              <React.Fragment key={index}>
                <ProductItem data={item}></ProductItem>
                {index + 1 < products.length && (
                  <SizedBox width={16}></SizedBox>
                )}
              </React.Fragment>
            ))}
          {isSmartphone &&
            products.map((item, index) => (
              <div key={index} style={{ marginRight: 16 }}>
                <ProductItem data={item}></ProductItem>
                <SizedBox width={16}></SizedBox>
              </div>
            ))}
          {isSmartphone ? <Spacer>-</Spacer> : null}
        </ItemsHolder>
      </Section>
    </>
  );
}

export default ProductCarousel;
