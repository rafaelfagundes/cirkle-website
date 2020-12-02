import { useRouter } from "next/router";
import React from "react";
import CartDescItem from "../../src/components/Atoms/CartDescItem";
import CartHeaderDataItem from "../../src/components/Atoms/CartHeaderDataItem";
import CartTotal from "../../src/components/Atoms/CartTotal";
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

function FinishPage(): JSX.Element {
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

  const router = useRouter();

  const goToPayment = (): void => {
    router.push("/comprar/pagamento");
  };

  const cartContext = useCart();
  const authContext = useAuth();

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <SizedBox height={10}></SizedBox>
      <Title>Revise seu Pedido</Title>
      <SizedBox height={32}></SizedBox>
      <Row spaceBetween>
        <CartHeaderDataItem
          icon="user"
          line1={authContext.user.name}
          line2={authContext.user.phoneNumber}
          line3={authContext.user.email}
        ></CartHeaderDataItem>
        <CartHeaderDataItem
          icon="map-pin"
          line1="Av. Borges de Medeiros, 997"
          line2="Gávea, Rio de Janeiro - RJ"
          line3="22430-041"
        ></CartHeaderDataItem>
        <CartHeaderDataItem
          icon="payment-cc"
          line1="Forma de Pagamento"
          line2="À Vista"
          line3="PIX"
        ></CartHeaderDataItem>
      </Row>
      <SizedBox height={48}></SizedBox>
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
      <SizedBox height={48}></SizedBox>
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
