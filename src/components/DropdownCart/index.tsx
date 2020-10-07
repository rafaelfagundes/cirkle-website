import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useCart } from "../../hooks/cart/useCart";
import { cloudinaryImage } from "../../utils/image";
import Column from "../Column";
import CustomButton from "../CustomButton";
import EmptyPage from "../EmptyPage";
import Icon from "../Icon";
import Padding from "../Padding";
import SizedBox from "../SizedBox";
import Bag from "./bag";
import {
  CartHeader,
  CartHeaderText,
  CartItem,
  CartItemImage,
  CartItems,
  CartText,
  Color,
  Description,
  Label,
  MoreInfo,
  Price,
  PriceAndButton,
  Qty,
  Row,
  Size,
  StyledCart,
  Title,
  Value,
} from "./styles";

function DropdownCart(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const cartContext = useCart();
  const cartButton = useRef<HTMLDivElement>(null);

  const _goToProducts = () => {
    typeof window !== "undefined" && router.push("/products");
  };

  const goToCart = () => {
    typeof window !== "undefined" && router.push("/cart");
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
          onMouseLeave: () => setTimeout(() => setIsOpen(false), 250),
        }}
      >
        {cartContext.cart.items.length > 0 && (
          <>
            <CartHeader>
              <CartHeaderText>Minha Sacola</CartHeaderText>
              {/* <CartHeaderNumber>
                {cartContext.cart.items.length}
              </CartHeaderNumber> */}
            </CartHeader>
            <CartItems height={window.innerHeight}>
              {cartContext.cart.items.map((item, index) => (
                <CartItem key={item.id} showBackground={index % 2 !== 0}>
                  <CartItemImage
                    image={cloudinaryImage(item.image, 120)}
                    size={120}
                  ></CartItemImage>
                  <Column>
                    <Title>{item.title}</Title>
                    <SizedBox height={2}></SizedBox>
                    <Description>{item.description}</Description>
                    <SizedBox height={4}></SizedBox>
                    <MoreInfo>
                      <Color>Cor: {item.cartColor}</Color>
                      <Size>Tam.: {item.cartSize}</Size>
                      <Qty>Qtd.: {item.cartQty}</Qty>
                    </MoreInfo>
                    <SizedBox height={4}></SizedBox>
                    <PriceAndButton>
                      <Price>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </Price>
                      <Icon
                        size={16}
                        type="remove"
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
                  buttonAction={_goToProducts}
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
