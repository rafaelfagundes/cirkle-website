import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import animationData from "../../public/animations/frog_lottie.json";
import CartDescItem from "../../src/components/Atoms/CartDescItem";
import CartHeaderDataItem from "../../src/components/Atoms/CartHeaderDataItem";
import CartInstallments from "../../src/components/Atoms/CartInstallments";
import CartTotal from "../../src/components/Atoms/CartTotal";
import Center from "../../src/components/Atoms/Center";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import Row from "../../src/components/Atoms/Row";
import SimpleText from "../../src/components/Atoms/SimpleText";
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

const LoadingAnimationCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #440044;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  overflow: hidden;
`;

function FinishPage(): JSX.Element {
  const cartContext = useCart();
  const orderContext = useOrder();
  const router = useRouter();
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [purchaseDisabled, setPurchaseDisabled] = useState(false);

  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  if (cartContext.cart.items.length === 0) {
    if (process.browser) {
      router.push("/");
      return <></>;
    }
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

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

  const goToSuccess = (paymentData: any): void => {
    orderContext.setOrderResult(paymentData);
    // setLoadingPurchase(false);
    router.push("/comprar/sucesso");
  };

  const goToError = (errorData): void => {
    orderContext.setOrderResult(errorData);
    // setLoadingPurchase(false);

    router.push("/comprar/erro");
  };

  const authContext = useAuth();

  const getPaymentIcon = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return "payment-cc";
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "payment-barcode";
      } else {
        return "ticket-dark";
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
        return "À vista";
      } else {
        return "À vista";
      }
    }
  };

  const getPaymentBrand = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return capitalizeFirstLetter(payment?.paymentMethodId);
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "";
      } else {
        return "Não precisa imprimir boleto";
      }
    }
  };

  const finishOrder = async () => {
    setPurchaseDisabled(true);
    setLoadingPurchase(true);
    const _finalOrder = orderContext.order;
    // console.log("_finalOrder", _finalOrder);

    try {
      const response = await Axios.post("/orders", _finalOrder);
      setPurchaseDisabled(false);
      if (response.data.status.code === 0) {
        goToSuccess(response.data);
      } else {
        setPurchaseDisabled(false);
        console.error(response.data);
        goToError(response.data);
      }
    } catch (error) {
      setPurchaseDisabled(false);
      console.error(error);
      goToError(error);
    }
  };

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      {loadingPurchase && (
        <>
          <SizedBox height={72}></SizedBox>
          <Center>
            <LoadingAnimationCircle>
              <Lottie
                options={defaultAnimationOptions}
                height={250}
                width={250}
                isStopped={false}
                isPaused={false}
              />
            </LoadingAnimationCircle>
          </Center>
          <SizedBox height={32}></SizedBox>
          <Center>
            <Subtitle color={Colors.SECONDARY}>
              SÓ MAIS UM POUQUINHO...
            </Subtitle>
          </Center>
          <SizedBox height={16}></SizedBox>
          <Center>
            <Title>Estamos concluindo o pedido</Title>
          </Center>
          <SizedBox height={72}></SizedBox>
        </>
      )}
      {!loadingPurchase && (
        <>
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
          <Subtitle color={Colors.SECONDARY}>{`${
            orderContext.order.products.length
          } ${
            orderContext.order.products.length === 1 ? "ITEM" : "ITENS"
          }`}</Subtitle>
          <SizedBox height={20}></SizedBox>
          <>
            {orderContext.order.products.map((item, index) => (
              <React.Fragment key={item.id}>
                <>
                  <CartItem
                    item={item}
                    showBackground={false}
                    showSelects={false}
                    isImmutable={true}
                  ></CartItem>
                </>
                {index !== orderContext.order.products.length - 1 && (
                  <>
                    <SizedBox height={16}></SizedBox>
                    <HorizontalLine></HorizontalLine>
                    <SizedBox height={24}></SizedBox>
                  </>
                )}
              </React.Fragment>
            ))}
          </>
          <SizedBox height={48}></SizedBox>
          <HorizontalLine></HorizontalLine>
          <SizedBox height={20}></SizedBox>
          <CartDescItem title="subtotal">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(orderContext.getSubtotal())}
          </CartDescItem>
          <SizedBox height={20}></SizedBox>

          {/* <CartDescItem title="desconto" negative subtitle="Cupom #TRINTAO">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(30)}
      </CartDescItem>
      <SizedBox height={20}></SizedBox> */}

          {!cartContext.isShippingFree() && (
            <CartDescItem
              title="frete"
              subtitle={`${orderContext?.order?.shipping?.company?.name} ${orderContext?.order?.shipping?.name} - ${orderContext?.order?.shipping?.custom_delivery_range.min} à ${orderContext?.order?.shipping?.custom_delivery_range.max} dias úteis`}
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(orderContext.getShippingValue())}
            </CartDescItem>
          )}
          {cartContext.isShippingFree() && (
            <CartDescItem
              title="frete"
              subtitle={`${orderContext?.order?.shipping?.company?.name} ${orderContext?.order?.shipping?.name} - ${orderContext?.order?.shipping?.custom_delivery_range.min} à ${orderContext?.order?.shipping?.custom_delivery_range.max} dias úteis`}
            >
              <SimpleText bold color={Colors.ORANGE_PANTONE}>
                GRÁTIS
              </SimpleText>
            </CartDescItem>
          )}
          <SizedBox height={40}></SizedBox>
          <CartTotal>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(orderContext.getTotal(cartContext.isShippingFree()))}
          </CartTotal>
          {orderContext?.order?.payment?.hasOwnProperty("paymentMethodId") && (
            <>
              <SizedBox height={20}></SizedBox>
              <CartInstallments
                singlePayment={
                  orderContext?.order?.payment?.installments === "1" || false
                }
              >
                {getPaymentInstallments(orderContext?.order?.payment)}
              </CartInstallments>
            </>
          )}
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
                onClick: finishOrder,
                type: "edit",
                width: loadingPurchase ? 100 : 200,
                loading: loadingPurchase,
                disabled: purchaseDisabled,
                icon: "done",
              },
            ]}
          ></CartFooterButtons>
        </>
      )}
    </LastMilePage>
  );
}

export default FinishPage;
