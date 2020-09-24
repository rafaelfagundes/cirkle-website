import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import Product from "../../modules/product/Product";
import Center from "../Center";
import CustomButton from "../CustomButton";
import ProductItem from "../ProductItem";
import SizedBox from "../SizedBox";
import Brand from "./brand";

const Section = styled.div<{ isSmartphone: boolean }>`
  padding: ${(props) =>
    props.isSmartphone ? "0px 0 32px 16px" : "0px 0 32px 0"};
`;

const ItemsHolder = styled.div<{ disableScroll?: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.disableScroll ? "wrap" : "nowrap")};
  flex-direction: row;
  align-items: center;
  overflow: ${(props) => (props.disableScroll ? "hidden" : "scroll")};
  justify-content: space-between;
`;

const BrandsHolder = styled.div<{ isSmartphone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  content: "-";
  width: 0px;
  height: 0px;
  color: transparent;
`;

function HotSection({
  products,
  brands,
}: {
  products: Array<Product>;
  brands: {
    id: string;
    name: string;
    image: string;
    link: string;
  }[];
}): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  let randomBrands = _.shuffle(brands);
  randomBrands = randomBrands.slice(0, 6);

  return (
    <Section isSmartphone={isSmartphone}>
      <ItemsHolder disableScroll={!isSmartphone}>
        {products.map((item) => (
          <ProductItem data={item} key={item._id}></ProductItem>
        ))}
        {isSmartphone ? <Spacer>-</Spacer> : null}
      </ItemsHolder>
      <Center>
        <>
          <CustomButton
            width={250}
            type="secondary"
            variant="outlined"
            onClick={null}
          >
            VER MAIS PRODUTOS
          </CustomButton>
          {isSmartphone ? <SizedBox width={16}></SizedBox> : null}
        </>
      </Center>
      <SizedBox height={48}></SizedBox>
      <BrandsHolder isSmartphone={isSmartphone}>
        {randomBrands.map((item) => (
          <Brand key={item.image} data={item}></Brand>
        ))}
      </BrandsHolder>
      <SizedBox height={12}></SizedBox>
      <Center>
        <>
          <CustomButton
            width={250}
            type="secondary"
            variant="outlined"
            onClick={null}
          >
            VER TODAS MARCAS
          </CustomButton>
          {isSmartphone ? <SizedBox width={16}></SizedBox> : null}
        </>
      </Center>
    </Section>
  );
}

export default HotSection;
