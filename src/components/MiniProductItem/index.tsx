import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React from "react";
import Product from "../../modules/product/Product";
import { cloudinaryProductImage } from "../../utils/image";
import SizedBox from "../SizedBox";
import { Description, Image, Item, Title, TitleHolder } from "./styles";

function MiniProductItem({ data }: { data: Product }): JSX.Element {
  const theme = useTheme();
  const smartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const _goToProduct = (id: string) => {
    router.push(`/produtos/${id}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <Item isSmartphone={smartphone}>
        <span onClick={() => _goToProduct(data.uid)}>
          <Image image={cloudinaryProductImage(data.image, 110)}></Image>
          <Description>
            <TitleHolder>
              <Title>{data.title}</Title>
            </TitleHolder>
          </Description>
          <SizedBox height={8}></SizedBox>
        </span>
      </Item>
    </div>
  );
}

export default MiniProductItem;
