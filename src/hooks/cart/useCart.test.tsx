import { act, renderHook } from "@testing-library/react-hooks";
import _cloneDeep from "lodash/cloneDeep";
import React from "react";
import PaymentType from "../../enums/PaymentType";
import Address from "../../modules/address/Address";
import Shipping from "../../modules/cart/CartShipping";
import Payment from "../../modules/payment/Payment";
import Product from "../../modules/product/Product";
import useCart from "./useCart";

const product: Product = {
  brand: {
    id: "80ebff07-687a-48fa-a8d8-b57a5c40e353",
    name: "Apple",
    image: "apple.png",
  },
  colors: [
    { id: "68f82d5f-6823-412b-9581-264c2e6fb495", name: "Gray" },
    { id: "66af13c3-390f-4ab1-828c-b3b0af43e2af", name: "White" },
    { id: "19dc594d-26dc-48ad-9999-3784c946ab56", name: "Red" },
    { id: "f207fc8c-d606-47c5-81f9-814132c2acc7", name: "Green" },
  ],
  description:
    "Expedita officiis impedit deleniti omnis sint labore perferendis debitis eaque. Architecto velit eius repellendus excepturi. Laborum magnam quo voluptas dicta similique quod. Non eum voluptatem ullam consequatur reiciendis repudiandae vel illo assumenda. Et corporis in.",
  enabled: true,
  id: "68638439-f23f-4ba4-9b60-dde6e4052b5f",
  image: "http://lorempixel.com/640/480/animals",
  price: 500,
  priceWhenNew: 700,
  qty: 10,
  sizes: [
    { id: "a2715b6d-26b0-4082-954d-07def627b09a", value: "Normal" },
    { id: "44b5fc1a-9fc4-4c75-b46a-3af81b8d3d07", value: "Max" },
  ],
  uid: "srilanka123",
  title: "iPhone 11 Pro",
  viewCount: 0,
  cartColor: "Gray",
  cartQty: 1,
  cartSize: "Max",
  _id: "bc2c40e1843d42c09463c6b2e532d834",
};

const product2: Product = {
  brand: {
    id: "80ebff07-687a-48fa-a8d8-b57a5c40e353",
    name: "Apple",
    image: "apple.png",
  },
  colors: [
    { id: "68f82d5f-6823-412b-9581-264c2e6fb495", name: "Gray" },
    { id: "66af13c3-390f-4ab1-828c-b3b0af43e2af", name: "White" },
    { id: "19dc594d-26dc-48ad-9999-3784c946ab56", name: "Red" },
    { id: "f207fc8c-d606-47c5-81f9-814132c2acc7", name: "Green" },
  ],
  description:
    "Expedita officiis impedit deleniti omnis sint labore perferendis debitis eaque. Architecto velit eius repellendus excepturi. Laborum magnam quo voluptas dicta similique quod. Non eum voluptatem ullam consequatur reiciendis repudiandae vel illo assumenda. Et corporis in.",
  enabled: true,
  id: "401ab7fb-12d2-487d-a9a4-0d1cbc851af1",
  image: "http://lorempixel.com/640/480/animals",
  price: 400,
  priceWhenNew: 600,
  qty: 5,
  sizes: [
    { id: "a2715b6d-26b0-4082-954d-07def627b09a", value: "Normal" },
    { id: "44b5fc1a-9fc4-4c75-b46a-3af81b8d3d07", value: "Max" },
  ],
  uid: "srilanka123",
  title: "iPhone 11 Pro",
  viewCount: 0,
  cartColor: "White",
  cartQty: 1,
  cartSize: "Normal",
  _id: "c0155ff2d60d47189cc2e08369e05bb5",
};

test("should add an item to cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[0]).toMatchObject(product);
});

test("should add two items to cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[0]).toMatchObject(product);

  act(() => {
    result.current.props.value.addToCart(product2);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[1]).toMatchObject(product2);
  expect(result.current.props.value.cart.items.length).toEqual(2);
});

test("should remove an item from the cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[0]).toMatchObject(product);

  act(() => {
    result.current.props.value.removeFromCart(product.id);
  });

  expect(result.current.props.value.cart.items.length).toEqual(0);
});

test("should update an item in the cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[0]).toMatchObject(product);

  const newProduct: Product = _cloneDeep(product);
  newProduct.cartColor = "Green";
  newProduct.cartQty = 2;
  newProduct.cartSize = "Normal";

  act(() => {
    result.current.props.value.updateItem(newProduct);
  });

  expect(result.current.props.value.cart.items[0].brand.name).toEqual("Apple");
  expect(result.current.props.value.cart.items[0].sizes[0].value).toEqual(
    "Normal"
  );
  expect(result.current.props.value.cart.items[0].colors[0].name).toEqual(
    "Gray"
  );
  expect(result.current.props.value.cart.items[0].id).toEqual(product.id);
  expect(result.current.props.value.cart.items[0].cartColor).toEqual("Green");
  expect(result.current.props.value.cart.items[0].cartQty).toEqual(2);
  expect(result.current.props.value.cart.items[0].cartSize).toEqual("Normal");
});

test("should find an item that is in the cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.isItemInCart(product.id)).toBeTruthy();
});

test("should not find an item that is not in the cart", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(
    result.current.props.value.isItemInCart("Buckinghamshire")
  ).toBeFalsy();
});

test("should update a quantity of an item", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].cartQty).toEqual(1);

  act(() => {
    result.current.props.value.updateQuantity(product.id, 2);
  });

  expect(result.current.props.value.cart.items[0].cartQty).toEqual(2);
});

test("should update a color of an item", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].cartColor).toEqual("Gray");

  act(() => {
    result.current.props.value.updateColor(
      product.id,
      result.current.props.value.cart.items[0].colors[2].name
    );
  });

  expect(result.current.props.value.cart.items[0].cartColor).toEqual("Red");
});

test("should update a size of an item", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.items[0].cartSize).toEqual("Max");

  act(() => {
    result.current.props.value.updateSize(
      product.id,
      result.current.props.value.cart.items[0].sizes[0].value
    );
  });

  expect(result.current.props.value.cart.items[0].cartSize).toEqual("Normal");
});

test("should enabled and set free shipping value to 999", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  expect(result.current.props.value.cart.freeShipping).toBeFalsy();
  expect(result.current.props.value.cart.freeShippingValue).toEqual(0);

  act(() => {
    result.current.props.value.updateFreeShipping(true, 999);
  });

  expect(result.current.props.value.cart.freeShipping).toBeTruthy();
  expect(result.current.props.value.cart.freeShippingValue).toEqual(999);
});

test("should disable free shipping", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  expect(result.current.props.value.cart.freeShipping).toBeFalsy();
  expect(result.current.props.value.cart.freeShippingValue).toEqual(0);

  act(() => {
    result.current.props.value.updateFreeShipping(true, 999);
  });

  expect(result.current.props.value.cart.freeShipping).toBeTruthy();
  expect(result.current.props.value.cart.freeShippingValue).toEqual(999);

  act(() => {
    result.current.props.value.updateFreeShipping(false, 0);
  });

  expect(result.current.props.value.cart.freeShipping).toBeFalsy();
  expect(result.current.props.value.cart.freeShippingValue).toEqual(0);
});

test("should set shipping correctly", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  expect(result.current.props.value.cart.shipping).toBeFalsy();

  const newShipping: Shipping = {
    postalCode: "87654321",
    type: "PAC",
    value: 89.9,
  };

  act(() => {
    result.current.props.value.setShipping(newShipping);
  });

  expect(result.current.props.value.cart.shipping.type).toEqual(
    newShipping.type
  );
  expect(result.current.props.value.cart.shipping.value).toEqual(
    newShipping.value
  );
  expect(result.current.props.value.cart.shipping.postalCode).toEqual(
    newShipping.postalCode
  );
});

test("should set address correctly", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  expect(result.current.props.value.cart.address).toBeFalsy();

  const newAddress: Address = {
    city: "New York",
    neighborhood: "Manhattan",
    number: 1500,
    postalCode: "36309012",
    state: "New York",
    street: "First Street Ever",
    complement: "Near Apple Store",
  };

  act(() => {
    result.current.props.value.setAddress(newAddress);
  });

  expect(result.current.props.value.cart.address.city).toEqual(newAddress.city);
  expect(result.current.props.value.cart.address.neighborhood).toEqual(
    newAddress.neighborhood
  );
  expect(result.current.props.value.cart.address.number).toEqual(
    newAddress.number
  );
  expect(result.current.props.value.cart.address.postalCode).toEqual(
    newAddress.postalCode
  );
  expect(result.current.props.value.cart.address.state).toEqual(
    newAddress.state
  );
  expect(result.current.props.value.cart.address.street).toEqual(
    newAddress.street
  );
  expect(result.current.props.value.cart.address.complement).toEqual(
    newAddress.complement
  );
});

test("should set payment correctly", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  expect(result.current.props.value.cart.payment).toBeFalsy();

  const boletoPayment: Payment = {
    type: PaymentType.BOLETO,
  };

  act(() => {
    result.current.props.value.setPayment(boletoPayment);
  });

  expect(result.current.props.value.cart.payment.type).toEqual(
    PaymentType.BOLETO
  );

  const cashPayment: Payment = {
    type: PaymentType.CASH,
  };

  act(() => {
    result.current.props.value.setPayment(cashPayment);
  });

  expect(result.current.props.value.cart.payment.type).toEqual(
    PaymentType.CASH
  );

  const creditCardPayment: Payment = {
    type: PaymentType.CREDIT_CARD,
    cardHolderName: "Rafael C F Lima",
    creditCardNumber: "5169967824807651",
    cvv: 123,
    validUntil: "02/2020",
  };

  act(() => {
    result.current.props.value.setPayment(creditCardPayment);
  });

  expect(result.current.props.value.cart.payment.type).toEqual(
    PaymentType.CREDIT_CARD
  );
  expect(result.current.props.value.cart.payment.cardHolderName).toEqual(
    creditCardPayment.cardHolderName
  );
  expect(result.current.props.value.cart.payment.creditCardNumber).toEqual(
    creditCardPayment.creditCardNumber
  );
  expect(result.current.props.value.cart.payment.cvv).toEqual(
    creditCardPayment.cvv
  );
  expect(result.current.props.value.cart.payment.validUntil).toEqual(
    creditCardPayment.validUntil
  );
});

test("should calculate values correctly", () => {
  const { result } = renderHook(() => useCart({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToCart(product);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(product.price);

  act(() => {
    result.current.props.value.updateQuantity(product.id, 2);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(product.price * 2);

  act(() => {
    result.current.props.value.addToCart(product2);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(
    product.price * 2 + product2.price
  );

  act(() => {
    result.current.props.value.updateQuantity(product.id, 1);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(
    product.price + product2.price
  );

  act(() => {
    result.current.props.value.updateQuantity(product2.id, 2);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(
    product.price + product2.price * 2
  );

  act(() => {
    result.current.props.value.removeFromCart(product2.id);
  });

  expect(result.current.props.value.cart.subtotal).toEqual(product.price);

  const newShipping: Shipping = {
    postalCode: "87654321",
    type: "PAC",
    value: 89.9,
  };

  act(() => {
    result.current.props.value.setShipping(newShipping);
  });

  expect(result.current.props.value.cart.total).toEqual(
    product.price + newShipping.value
  );

  act(() => {
    result.current.props.value.updateFreeShipping(true, 500);
  });

  expect(result.current.props.value.cart.total).toEqual(
    result.current.props.value.cart.subtotal
  );
});
