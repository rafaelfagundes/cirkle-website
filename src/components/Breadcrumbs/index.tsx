import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Product, {
  Category,
  RootCategory,
  SubCategory,
} from "../../modules/product/Product";
import Icon from "../Icon";

const BreadcrumbsHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
`;

const Home = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Separator = styled.div`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  /* font-weight: 700; */
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin: 0 6px;
`;

const Breadcrumb = styled.div<{ last: boolean }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  /* font-weight: 700; */
  /* text-transform: uppercase; */
  color: ${(props) => (props.last ? Colors.GRAY : Colors.PRIMARY)};
  margin: 0 8px;
  cursor: ${(props) => (props.last ? "default" : "pointer")};
  /* font-weight: ${(props) => (props.last ? "700" : "400")}; */

  &:hover {
    text-decoration: ${(props) => (props.last ? "none" : "underline")};
  }
`;

interface BreadcrumbsProps {
  showHome: boolean;
  root: RootCategory;
  category?: Category;
  subCategory?: SubCategory;
  product?: Product;
}

function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  const router = useRouter();

  function goTo(route: string) {
    router.push(route);
  }

  return (
    <BreadcrumbsHolder>
      {props.showHome && (
        <Home onClick={() => goTo("/")}>
          <Icon type="home" size={16}></Icon>
          <Breadcrumb last={false}>Página Inicial</Breadcrumb>
        </Home>
      )}
      <Separator>›</Separator>
      <Breadcrumb
        last={!props.category}
        onClick={() => goTo(`/${props.root.slug}`)}
      >
        {props.root.title}
      </Breadcrumb>
      {props.category && (
        <>
          <Separator>›</Separator>
          <Breadcrumb
            last={!props.subCategory}
            onClick={() => goTo(`/${props.root.slug}/${props.category.slug}`)}
          >
            {props.category.title}
          </Breadcrumb>
        </>
      )}
      {props.subCategory && (
        <>
          <Separator>›</Separator>
          <Breadcrumb
            last={!props.product}
            onClick={() =>
              goTo(
                `/${props.root.slug}/${props.category.slug}/${props.subCategory.slug}`
              )
            }
          >
            {props.subCategory.title}
          </Breadcrumb>
        </>
      )}
      {props.product && (
        <>
          <Separator>›</Separator>
          <Breadcrumb last>{props.product.title}</Breadcrumb>
        </>
      )}
    </BreadcrumbsHolder>
  );
}

export default Breadcrumbs;
