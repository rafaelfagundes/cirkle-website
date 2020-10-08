import { act, renderHook } from "@testing-library/react-hooks";
import Product from "../../modules/product/Product";
import useWishlist from "./useWishlist";

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

test("should be empty", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  expect(result.current.props.value.wishlist.items.length).toEqual(0);
});

test("should be able to add an item to wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);
});

test("should be able to add two or more items to wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);

  act(() => {
    result.current.props.value.addToWishlist(product2);
  });

  expect(result.current.props.value.wishlist.items[1].id).toEqual(product2.id);
});

test("should be able to remove an item from wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);

  act(() => {
    result.current.props.value.removeFromWishlist(product.id);
  });

  expect(result.current.props.value.wishlist.items.length).toEqual(0);
});

test("should be able to check if an item is in the wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);
  expect(result.current.props.value.isItemInWishlist(product.id)).toBeTruthy();
});

test("should be able to check if an item is not in the wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);
  expect(
    result.current.props.value.isItemInWishlist("SOMEOTHERID")
  ).toBeFalsy();
});
