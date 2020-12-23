import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import CartDescItem from "../../src/components/Atoms/CartDescItem";
import CartHeaderDataItem from "../../src/components/Atoms/CartHeaderDataItem";
import CartTotal from "../../src/components/Atoms/CartTotal";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import Row from "../../src/components/Atoms/Row";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Subtitle from "../../src/components/Atoms/Subtitle";
import Title from "../../src/components/Atoms/Title";
import CartFooterButtons from "../../src/components/Molecules/CartFooterButtons";
import CartItem from "../../src/components/Molecules/CartItem";
import LastMilePage from "../../src/components/Templates/LastMilePage";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import theme from "../../src/theme/theme";
import { capitalizeFirstLetter } from "../../src/utils/string";

const WrapRow = styled.div``;

function FinishPage(): JSX.Element {
  const cartContext = useCart();
  const router = useRouter();

  if (cartContext.cart.items.length === 0) {
    if (process.browser) {
      router.push("/");
      return <></>;
    }
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const orderContext = useOrder();

  const breadcrumbs = [
    {
      active: false,
      position: 1,
      desc: "Endereço",
    },
    {
      active: false,
      position: 2,
      desc: "Pagamento",
    },
    {
      active: true,
      position: 3,
      desc: "Revisão",
    },
  ];

  const goToPayment = (): void => {
    router.push("/comprar/pagamento");
  };

  const authContext = useAuth();

  const getPaymentIcon = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return "payment-cc";
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "payment-barcode";
      } else {
        return "banker";
      }
    }
  };

  const getPaymentType = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return "Cartão de Crédito";
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "Boleto Bancário";
      } else {
        return "Pagamento na Lotérica";
      }
    }
  };

  const getPaymentInstallments = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return `${payment?.installments}x ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(payment?.installmentValue)}`;
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "À Vista";
      } else {
        return "Não Precisa de Boleto";
      }
    }
  };

  const getPaymentBrand = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return capitalizeFirstLetter(payment?.paymentMethodId);
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "À Vista";
      } else {
        return "Não Precisa de Boleto";
      }
    }
  };

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <SizedBox height={10}></SizedBox>
      <Title>Revise seu Pedido</Title>
      <SizedBox height={32}></SizedBox>
      {!isSmartPhone && (
        <Row spaceBetween>
          <CartHeaderDataItem
            icon="user"
            line1={
              orderContext?.order?.user?.firstName +
              " " +
              orderContext?.order?.user?.lastName
            }
            line2={orderContext?.order?.user?.phone}
            line3={orderContext?.order?.user?.email}
          ></CartHeaderDataItem>
          <CartHeaderDataItem
            icon="map-pin"
            line1={`${orderContext?.order?.address?.street}, ${orderContext?.order?.address?.number}`}
            line2={`${orderContext?.order?.address?.neighborhood}, ${orderContext?.order?.address?.city} - ${orderContext?.order?.address?.state}`}
            line3={orderContext?.order?.address?.postalCode}
          ></CartHeaderDataItem>
          <CartHeaderDataItem
            icon={getPaymentIcon(orderContext?.order?.payment)}
            line1={getPaymentType(orderContext?.order?.payment)}
            line2={getPaymentInstallments(orderContext?.order?.payment)}
            line3={getPaymentBrand(orderContext?.order?.payment)}
          ></CartHeaderDataItem>
        </Row>
      )}
      {isSmartPhone && (
        <WrapRow>
          <CartHeaderDataItem
            icon="user"
            line1={
              orderContext?.order?.user?.firstName +
              " " +
              orderContext?.order?.user?.lastName
            }
            line2={orderContext?.order?.user?.phone}
            line3={orderContext?.order?.user?.email}
          ></CartHeaderDataItem>
          <SizedBox height={20}></SizedBox>
          <CartHeaderDataItem
            icon="map-pin"
            line1={`${orderContext?.order?.address?.street}, ${orderContext?.order?.address?.number}`}
            line2={`${orderContext?.order?.address?.neighborhood}, ${orderContext?.order?.address?.city} - ${orderContext?.order?.address?.state}`}
            line3={orderContext?.order?.address?.postalCode}
          ></CartHeaderDataItem>
          <SizedBox height={20}></SizedBox>
          <CartHeaderDataItem
            icon={getPaymentIcon(orderContext?.order?.payment)}
            line1={getPaymentType(orderContext?.order?.payment)}
            line2={getPaymentInstallments(orderContext?.order?.payment)}
            line3={getPaymentBrand(orderContext?.order?.payment)}
          ></CartHeaderDataItem>
        </WrapRow>
      )}
      <SizedBox height={20}></SizedBox>
      <HorizontalLine></HorizontalLine>
      <SizedBox height={32}></SizedBox>
      <Subtitle color={Colors.SECONDARY}>{`${cartContext.cart.items.length} ${
        cartContext.cart.items.length === 1 ? "ITEM" : "ITENS"
      }`}</Subtitle>
      <SizedBox height={20}></SizedBox>
      <>
        {cartContext.cart.items.map((item, index) => (
          <React.Fragment key={item.id}>
            <CartItem
              item={item}
              showBackground={false}
              showSelects={false}
              isImmutable={true}
            ></CartItem>
            {index !== cartContext.cart.items.length - 1 && (
              <SizedBox height={24}></SizedBox>
            )}
          </React.Fragment>
        ))}
      </>
      <SizedBox height={32}></SizedBox>
      <HorizontalLine></HorizontalLine>
      <SizedBox height={20}></SizedBox>
      <CartDescItem title="subtotal">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(cartContext.cart.subtotal)}
      </CartDescItem>
      <SizedBox height={20}></SizedBox>

      <CartDescItem title="desconto" negative subtitle="Cupom #TRINTAO">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(30)}
      </CartDescItem>
      <SizedBox height={20}></SizedBox>

      <CartDescItem title="frete" subtitle="JadLog .Package - 2 à 4 dias úteis">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(
          cartContext.cart.shippingList.filter((o) => o.selected)[0]
            ?.secondaryValue
        )}
      </CartDescItem>
      <SizedBox height={40}></SizedBox>
      <CartTotal>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(cartContext.cart.total)}
      </CartTotal>
      <CartFooterButtons
        buttons={[
          {
            text: "Alterar Pagamento",
            onClick: goToPayment,
            type: "text",
            width: 180,
            isBackButton: true,
          },
          {
            text: "CONCLUIR COMPRA",
            onClick: null,
            type: "cta",
            width: 200,
          },
        ]}
      ></CartFooterButtons>
    </LastMilePage>
  );
}

export default FinishPage;
