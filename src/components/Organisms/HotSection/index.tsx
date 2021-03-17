import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Product from "../../../modules/product/Product";
import Center from "../../Atoms/Center";
import CustomButton from "../../Atoms/CustomButton";
import SizedBox from "../../Atoms/SizedBox";
import ProductItem from "../../Molecules/ProductItem";
import Brand from "./brand";

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
  /* justify-content: space-between; */
`;

const BrandsHolder = styled.div<{ isSmartphone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.isSmartphone ? "0 16px" : 0)};
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
  }[];
}): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  // let randomBrands = _shuffle(brands);
  // randomBrands = randomBrands.slice(0, 6);

  return (
    <Section>
      <ItemsHolder disableScroll={!isSmartphone} isSmartphone={isSmartphone}>
        {isSmartphone && (
          <>
            {products.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 244,
                }}
                key={item.id}
              >
                <ProductItem
                  data={item}
                  numberPosition={index + 1}
                ></ProductItem>
                <SizedBox width={16}></SizedBox>
              </div>
            ))}
            <Spacer>-</Spacer>
          </>
        )}

        {!isSmartphone && (
          <>
            {products.map((item, index) => (
              <span
                style={{
                  width: !isSmartphone && (index + 1) % 4 !== 0 ? 244 : 228,
                }}
                key={item.id}
              >
                <ProductItem
                  data={item}
                  numberPosition={index + 1}
                ></ProductItem>
                {!isSmartphone && (index + 1) % 4 !== 0 && (
                  <SizedBox width={16}></SizedBox>
                )}
                {isSmartphone && <SizedBox width={16}></SizedBox>}
              </span>
            ))}
            <Spacer>-</Spacer>
          </>
        )}
      </ItemsHolder>
      {/* <SizedBox height={10}></SizedBox> */}
      <Center>
        <>
          <CustomButton
            width={250}
            type="secondary"
            variant="outlined"
            onClick={() =>
              router.push({
                pathname: "/pesquisa",
              })
            }
          >
            Ver Mais Produtos
          </CustomButton>
          {isSmartphone ? <SizedBox width={16}></SizedBox> : null}
        </>
      </Center>
      <SizedBox height={48}></SizedBox>
      <BrandsHolder isSmartphone={isSmartphone}>
        {brands.map((item) => (
          <Brand key={item.image} data={item}></Brand>
        ))}
      </BrandsHolder>
      <SizedBox height={15}></SizedBox>
      <Center>
        <>
          <CustomButton
            width={250}
            type="secondary"
            variant="outlined"
            onClick={() => router.push("/marcas")}
          >
            Ver Todas as Marcas
          </CustomButton>
          {isSmartphone ? <SizedBox width={16}></SizedBox> : null}
        </>
      </Center>
    </Section>
  );
}

export default HotSection;
