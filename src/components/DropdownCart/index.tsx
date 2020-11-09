import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useCart } from "../../hooks/cart/useCart";
import { cloudinaryProductImage } from "../../utils/image";
import Column from "../Column";
import CustomButton from "../CustomButton";
import EmptyPage from "../EmptyPage";
import Icon from "../Icon";
import Padding from "../Padding";
import SizedBox from "../SizedBox";
import Title from "../Title";
import Bag from "./bag";
import {
  CartHeader,
  CartHeaderText,
  CartItem,
  CartItemImage,
  CartItems,
  CartText,
  Description,
  Label,
  Price,
  PriceAndButton,
  Row,
  StyledCart,
  Value,
} from "./styles";

function DropdownCart(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const cartContext = useCart();
  const cartButton = useRef<HTMLDivElement>(null);

  const _goToHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  const goToCart = () => {
    typeof window !== "undefined" && router.push("/sacola");
    setIsOpen(false);
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Bag
        counter={cartContext.cart.items.length}
        setIsOpen={setIsOpen}
        ref={cartButton}
      ></Bag>
      <StyledCart
        id="cart-dropdown"
        open={isOpen}
        anchorEl={cartButton.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          onMouseLeave: () => setTimeout(() => setIsOpen(false), 125),
        }}
        transitionDuration={{ appear: 400, enter: 400, exit: 500 }}
      >
        {cartContext.cart.items.length > 0 && (
          <>
            <CartHeader>
              <CartHeaderText>Minha Sacola</CartHeaderText>
            </CartHeader>
            <CartItems height={window.innerHeight}>
              {cartContext.cart.items.map((item, index) => (
                <CartItem key={item.id} showBackground={index % 2 !== 0}>
                  <Link href={`/produtos/${item.uid}`}>
                    <CartItemImage
                      image={cloudinaryProductImage(item.image, 75)}
                      size={75}
                    ></CartItemImage>
                  </Link>
                  <Column spaceBetween minHeight={75}>
                    <Link href={`/produtos/${item.uid}`}>
                      <div style={{ cursor: "pointer" }}>
                        <SizedBox height={4}></SizedBox>
                        <Title size={12}>
                          {item.cartQty > 1
                            ? `${item.cartQty}x ${item.title}`
                            : item.title}
                        </Title>
                        <SizedBox height={2}></SizedBox>
                        <Description>{item.description}</Description>
                        <SizedBox height={2}></SizedBox>
                      </div>
                    </Link>
                    <PriceAndButton>
                      <Price>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </Price>
                      <Icon
                        size={16}
                        type="delete"
                        onClick={() => cartContext.removeFromCart(item.id)}
                      ></Icon>
                    </PriceAndButton>
                  </Column>
                </CartItem>
              ))}
            </CartItems>
            <SizedBox height={16}></SizedBox>

            <Row spaceBetween padding>
              <Label>Subtotal</Label>
              <Value>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(cartContext.cart.subtotal)}
              </Value>
            </Row>
            <SizedBox height={16}></SizedBox>
            <Row padding>
              <CustomButton
                width={200}
                variant="outlined"
                type="primary"
                onClick={() => goToCart()}
              >
                Ver Sacola
              </CustomButton>
              <SizedBox width={16}></SizedBox>
              <CustomButton
                width={200}
                variant="contained"
                type="success"
                onClick={null}
              >
                Comprar
              </CustomButton>
            </Row>
            {!cartContext.cart.freeShipping && (
              <SizedBox height={16}></SizedBox>
            )}
            {cartContext.cart.freeShipping && (
              <>
                <SizedBox height={8}></SizedBox>
                <Row>
                  <CartText>{`Frete grátis para pedidos acima de ${new Intl.NumberFormat(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  ).format(cartContext.cart.freeShippingValue)}`}</CartText>
                </Row>
              </>
            )}
          </>
        )}
        {cartContext.cart.items.length === 0 && (
          <>
            <Column>
              <SizedBox height={56}></SizedBox>
              <Padding horizontal={36}>
                <EmptyPage
                  buttonAction={_goToHome}
                  buttonText="Explorar"
                  icon="bag"
                  subtitle="Não perca tempo, adicione os melhores produtos."
                  title="A sacola está vazia"
                ></EmptyPage>
              </Padding>
              <SizedBox height={56}></SizedBox>
            </Column>
          </>
        )}
      </StyledCart>
    </div>
  );
}

export default DropdownCart;
