import styled from "styled-components";

const ProductPlaceholder = styled.div<{
  margin: number;
  isSmartphone: boolean;
}>`
  width: ${(props) =>
    props.isSmartphone
      ? process.browser
        ? window.innerWidth - 28
        : 228
      : 228}px;
  height: ${(props) => (props.isSmartphone ? 170 : 388)}px;
  margin-right: ${(props) => props.margin}px;
  margin-bottom: ${(props) => (props.isSmartphone ? 16 : 32)}px;
  margin-left: ${(props) => (props.isSmartphone ? 14.5 : 0)}px;
  border-radius: 4px;

  animation-name: fadeInFadeOut;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes fadeInFadeOut {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #eaeaea;
    }
    100% {
      background-color: #eee;
    }
  }
`;

function ProductsPlaceholder(props: {
  qty: number;
  isSmartphone: boolean;
}): JSX.Element {
  const result: Array<JSX.Element> = [];

  for (let index = 0; index < props.qty; index++) {
    result.push(
      <ProductPlaceholder
        margin={props.isSmartphone ? 0 : (index + 1) % 4 !== 0 ? 16 : 0}
        isSmartphone={props.isSmartphone}
        key={index}
      ></ProductPlaceholder>
    );
  }

  return <>{result}</>;
}

export default ProductsPlaceholder;
