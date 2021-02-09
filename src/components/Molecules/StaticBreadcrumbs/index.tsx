import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../../Atoms/Icon";

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
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;

  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin: 0 6px;
`;

const Breadcrumb = styled.div<{ last: boolean }>`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: ${(props) => (props.last ? Colors.GRAY : Colors.PRIMARY)};
  margin: 0 8px;
  cursor: ${(props) => (props.last ? "default" : "pointer")};

  &:hover {
    text-decoration: ${(props) => (props.last ? "none" : "underline")};
  }
`;

type BreadcrumbsLink = {
  title: string;
  link: string;
};

interface BreadcrumbsProps {
  showHome: boolean;
  root: BreadcrumbsLink;
  category?: BreadcrumbsLink;
  subCategory?: BreadcrumbsLink;
  product?: BreadcrumbsLink;
}

function StaticBreadcrumbs(props: BreadcrumbsProps): JSX.Element {
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
        onClick={() => goTo(`/${props.root.link}`)}
      >
        {props.root.title}
      </Breadcrumb>
      {props.category && (
        <>
          <Separator>›</Separator>
          <Breadcrumb
            last={!props.subCategory}
            onClick={() => goTo(`/${props.root.link}/${props.category.link}`)}
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
                `/${props.root.link}/${props.category.link}/${props.subCategory.link}`
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

export default StaticBreadcrumbs;
