import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useCart } from "../../../hooks/cart/useCart";
import Column from "../../Atoms/Column";
import CustomButton from "../../Atoms/CustomButton";
import Padding from "../../Atoms/Padding";
import SizedBox from "../../Atoms/SizedBox";
import EmptyPage from "../../Templates/EmptyPage";
import CartItem from "../CartItem";
import Bag from "./bag";
import {
  CartHeader,
  CartHeaderText,
  CartItems,
  CartText,
  Label,
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
          <div style={{ maxWidth: 450 }}>
            <CartHeader>
              <CartHeaderText>Minha Sacola</CartHeaderText>
            </CartHeader>
            <CartItems height={window.innerHeight}>
              {cartContext.cart.items.map((item, index) => (
                <CartItem
                  key={item.id}
                  showBackground={index % 2 !== 0}
                  item={item}
                  showSelects={false}
                ></CartItem>
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
          </div>
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
