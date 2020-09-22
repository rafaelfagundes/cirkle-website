import { act, renderHook } from "@testing-library/react-hooks";
import Product from "../../modules/product/Product";
import useWishlist from "./useWishlist";

const product: Product = {
  brand: "Apple",
  colors: ["Gray", "White", "Red", "Green"],
  description:
    "Expedita officiis impedit deleniti omnis sint labore perferendis debitis eaque. Architecto velit eius repellendus excepturi. Laborum magnam quo voluptas dicta similique quod. Non eum voluptatem ullam consequatur reiciendis repudiandae vel illo assumenda. Et corporis in.",
  enabled: true,
  id: "68638439-f23f-4ba4-9b60-dde6e4052b5f",
  image: "http://lorempixel.com/640/480/animals",
  price: 500,
  priceWhenNew: 700,
  qty: 10,
  sizes: ["Normal", "Max"],
  sku: "srilanka123",
  title: "iPhone 11 Pro",
  viewCount: 0,
  cartColor: "Gray",
  cartQty: 1,
  cartSize: "Max",
  _id: "bc2c40e1843d42c09463c6b2e532d834",
};

const product2: Product = {
  brand: "Apple",
  colors: ["Gray", "White", "Red", "Green"],
  description:
    "Expedita officiis impedit deleniti omnis sint labore perferendis debitis eaque. Architecto velit eius repellendus excepturi. Laborum magnam quo voluptas dicta similique quod. Non eum voluptatem ullam consequatur reiciendis repudiandae vel illo assumenda. Et corporis in.",
  enabled: true,
  id: "401ab7fb-12d2-487d-a9a4-0d1cbc851af1",
  image: "http://lorempixel.com/640/480/animals",
  price: 400,
  priceWhenNew: 600,
  qty: 5,
  sizes: ["Normal", "Max"],
  sku: "srilanka123",
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
    result.current.props.value.removeFromWishlist(product._id);
  });

  expect(result.current.props.value.wishlist.items.length).toEqual(0);
});

test("should be able to check if an item is in the wishlist", () => {
  const { result } = renderHook(() => useWishlist({ children: <span></span> }));

  act(() => {
    result.current.props.value.addToWishlist(product);
  });

  expect(result.current.props.value.wishlist.items[0].id).toEqual(product.id);
  expect(result.current.props.value.isItemInWishlist(product._id)).toBeTruthy();
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
