import { Dialog, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import {
  CartItem,
  CartItemImage,
  ImagePrice,
  MoreInfo,
  ProductBrand,
  ProductTitle,
  SpaceBetweenColumn,
  TitleAndRemove,
} from "../../../../styles/pages/cart";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";
import { cloudinaryImage } from "../../../utils/image";
import CustomButton from "../../Atoms/CustomButton";
import Row from "../../Atoms/Row";
import SimpleText from "../../Atoms/SimpleText";
import SizedBox from "../../Atoms/SizedBox";
import Subtitle from "../../Atoms/Subtitle";
import Title from "../../Atoms/Title";

const VerticalLine = styled.div`
  /* position: absolute; */
  width: 1px;
  height: 34px;
  left: 627px;
  top: 447px;
  background: #f1f1f1;
  margin: 0 20px;
`;

const Commission = styled.span`
  font-family: Commissioner, sans-serif;
  color: ${Colors.PRIMARY};
  font-weight: 700;
`;

const Status = styled.span<{ color: string }>`
  font-family: Commissioner, sans-serif;
  color: ${(props) => props.color};
  font-weight: 700;
`;

const StatusMobile = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  margin-left: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 0 6px;
`;

const StatusMobileText = styled.span`
  font-family: Commissioner, sans-serif;
  color: ${Colors.WHITE};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
`;

const DialogContent = styled.div`
  padding: 20px;
  min-width: 300px;
`;

const Fade = styled.div`
  width: 36px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  position: absolute;
  right: 0;
`;

const SalePrice = styled.div`
  font-family: Commissioner, sans-serif;
  color: ${Colors.SECONDARY};
  font-weight: 700;
`;

const BUTTON_SIZE = 140;

interface ClientProduct {
  id: number;
  pid: number;
  puid: string;
  brandName: string;
  title: string;
  image: string;
  comments: string;
  price: number;
  commission: number;
  status: string;
  soldAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

function ClientProductItem({ item }: { item: ClientProduct }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  const _goTo = (route: string) => {
    if (
      item.status === "SELLING" ||
      item.status === "SOLD" ||
      item.status === "DONATED"
    ) {
      typeof window !== "undefined" && router.push(route);
    }
  };

  const getCartButton = (item: ClientProduct) => {
    switch (item.status) {
      case "SELLING":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => _goTo("/produtos/" + item.puid)}
          >
            Ver Produto
          </CustomButton>
        );
      case "SOLD":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => _goTo("/produtos/" + item.puid)}
          >
            Ver Produto
          </CustomButton>
        );
      case "REGISTERING":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
      case "UNAPPROVED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
            type="delete"
          >
            Ver Detalhes
          </CustomButton>
        );
      case "REQUESTED_RETURN":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
      case "RETURNED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
      case "DONATED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => _goTo("/produtos/" + item.puid)}
          >
            Ver Produto
          </CustomButton>
        );
      case "RECEIVED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
      case "AWAITING_PRODUCT":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
      case "CANCELED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
            type="delete"
          >
            Ver Detalhes
          </CustomButton>
        );
      case "NOT_RECEIVED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
            type="delete"
          >
            Ver Detalhes
          </CustomButton>
        );
      case "CREATED":
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );

      default:
        return (
          <CustomButton
            small={isSmartPhone}
            variant="outlined"
            width={BUTTON_SIZE}
            onClick={() => setShowDialog(true)}
          >
            Ver Detalhes
          </CustomButton>
        );
    }
  };

  const getStatus = (item: ClientProduct) => {
    switch (item.status) {
      case "SELLING":
        return <Status color={Colors.MONEY}>À Venda</Status>;
      case "SOLD":
        return <Status color={Colors.BLUE_JEANS}>Vendido</Status>;
      case "REGISTERING":
        return <Status color={Colors.PRIMARY}>Cadastrando produto</Status>;
      case "UNAPPROVED":
        return (
          <Status color={Colors.RED_CRAYOLA}>Produto com restrição</Status>
        );
      case "REQUESTED_RETURN":
        return <Status color={Colors.PRIMARY}>Devolução solicitada</Status>;
      case "RETURNED":
        return <Status color={Colors.PRIMARY}>Devolvido</Status>;
      case "DONATED":
        return <Status color={Colors.PRIMARY}>Doado</Status>;
      case "RECEIVED":
        return <Status color={Colors.PRIMARY}>Recebido</Status>;
      case "AWAITING_PRODUCT":
        return <Status color={Colors.PRIMARY}>Aguardando entrega</Status>;
      case "CANCELED":
        return <Status color={Colors.RED_CRAYOLA}>Cancelado</Status>;
      case "NOT_RECEIVED":
        return <Status color={Colors.RED_CRAYOLA}>Problema na entrega</Status>;
      case "CREATED":
        return <Status color={Colors.PRIMARY}>Analisando</Status>;

      default:
        return <Status color={Colors.PRIMARY}>Sem Info</Status>;
    }
  };

  const getMobileStatus = (item: ClientProduct) => {
    switch (item.status) {
      case "SELLING":
        return (
          <StatusMobile color={Colors.MONEY}>
            <StatusMobileText>À Venda</StatusMobileText>
          </StatusMobile>
        );
      case "SOLD":
        return (
          <StatusMobile color={Colors.BLUE_JEANS}>
            <StatusMobileText>Vendido</StatusMobileText>
          </StatusMobile>
        );
      case "REGISTERING":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Cadastrando produto</StatusMobileText>
          </StatusMobile>
        );
      case "UNAPPROVED":
        return (
          <StatusMobile color={Colors.RED_CRAYOLA}>
            <StatusMobileText>Produto com restrição</StatusMobileText>
          </StatusMobile>
        );
      case "REQUESTED_RETURN":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Devolução solicitada</StatusMobileText>
          </StatusMobile>
        );
      case "RETURNED":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Devolvido</StatusMobileText>
          </StatusMobile>
        );
      case "DONATED":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Doado</StatusMobileText>
          </StatusMobile>
        );
      case "RECEIVED":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Recebido</StatusMobileText>
          </StatusMobile>
        );
      case "AWAITING_PRODUCT":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Aguardando entrega</StatusMobileText>
          </StatusMobile>
        );
      case "CANCELED":
        return (
          <StatusMobile color={Colors.RED_CRAYOLA}>
            <StatusMobileText>Cancelado</StatusMobileText>
          </StatusMobile>
        );
      case "NOT_RECEIVED":
        return (
          <StatusMobile color={Colors.RED_CRAYOLA}>
            <StatusMobileText>Problema na entrega</StatusMobileText>
          </StatusMobile>
        );
      case "CREATED":
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Analisando</StatusMobileText>
          </StatusMobile>
        );

      default:
        return (
          <StatusMobile color={Colors.PRIMARY}>
            <StatusMobileText>Sem Info</StatusMobileText>
          </StatusMobile>
        );
    }
  };

  return (
    <>
      <Dialog onClose={() => setShowDialog(false)} open={showDialog}>
        <DialogContent>
          <Title>Detalhes</Title>
          <SizedBox height={16}></SizedBox>
          <SimpleText>{item.comments}</SimpleText>
          <SizedBox height={24}></SizedBox>
          <CustomButton onClick={() => setShowDialog(false)}>
            Fechar
          </CustomButton>
        </DialogContent>
      </Dialog>
      <CartItem key={item.id}>
        <ImagePrice onClick={() => _goTo("/produtos/" + item.puid)}>
          <CartItemImage
            image={cloudinaryImage(item.image, 130)}
            size={95}
          ></CartItemImage>
        </ImagePrice>
        <SpaceBetweenColumn>
          <div>
            {isSmartPhone && getMobileStatus(item)}
            <TitleAndRemove>
              <ProductBrand>{item.brandName}</ProductBrand>
              <Row>
                <ProductTitle>{item.title}</ProductTitle>
                {isSmartPhone && <Fade></Fade>}
              </Row>
              <SizedBox width={16}></SizedBox>
            </TitleAndRemove>
            <SizedBox height={8}></SizedBox>
            <Row>
              <SizedBox width={10}></SizedBox>
              <div>
                <Subtitle
                  color={Colors.GRAY}
                  size={isSmartPhone ? 11 : 12}
                  bold
                >
                  {isSmartPhone ? "VALOR" : "VALOR VENDA"}
                </Subtitle>
                <SalePrice>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                </SalePrice>
              </div>
              <VerticalLine></VerticalLine>
              <div>
                <Subtitle
                  color={Colors.GRAY}
                  size={isSmartPhone ? 11 : 12}
                  bold
                >
                  {isSmartPhone ? "COMISSÃO" : "SUA COMISSÃO"}
                </Subtitle>
                <Commission>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price * item.commission)}
                </Commission>
              </div>
              {!isSmartPhone && (
                <>
                  <VerticalLine></VerticalLine>
                  <div>
                    <Subtitle
                      color={Colors.GRAY}
                      size={isSmartPhone ? 11 : 12}
                      bold
                    >
                      STATUS
                    </Subtitle>
                    {getStatus(item)}
                  </div>
                </>
              )}
            </Row>
          </div>
          <MoreInfo>{getCartButton(item)}</MoreInfo>
        </SpaceBetweenColumn>
      </CartItem>
      <SizedBox height={30}></SizedBox>
    </>
  );
}

export default ClientProductItem;
