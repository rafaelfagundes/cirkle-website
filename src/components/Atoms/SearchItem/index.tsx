import { useRouter } from "next/router";
import React from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import SearchItemType from "../../../modules/searchItem/SearchItem";
import Row from "../Row";
import SizedBox from "../SizedBox";

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  cursor: pointer;
  border-radius: 4px;
  padding: 10px;
  &:hover {
    background-color: #eee;
  }
`;

const SearchContent = styled.div`
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.div<{ image: string }>`
  width: 56px;
  height: 56px;
  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  margin-right: 10px;
`;

const Brand = styled.div`
  font-family: Commissioner, sans-serif;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.505px;
  text-transform: uppercase;
  color: #8b8b8b;
  font-weight: 700;
`;

const Title = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.PRIMARY};
`;

const Price = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.MONEY};
  margin-right: 5px;
`;

const PriceWhenNew = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: line-through;
  color: #a8a8a8;
`;

function SearchItem({
  item,
  query,
  closePanel,
}: {
  item: SearchItemType;
  query: string;
  closePanel: () => void;
}): JSX.Element {
  const router = useRouter();

  return (
    <StyledItem
      onClick={() => {
        router.push(`/produtos/${item.puid}`);
        closePanel();
      }}
    >
      <Row>
        <Image image={item.image}></Image>
        <SearchContent>
          <Brand>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={item.brandname}
            />
          </Brand>
          <SizedBox height={2}></SizedBox>
          <Title>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={item.title}
            />
          </Title>
          <Row>
            <Price>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </Price>
            <PriceWhenNew>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.priceWhenNew)}
            </PriceWhenNew>
          </Row>
        </SearchContent>
      </Row>
    </StyledItem>
  );
}

export default SearchItem;
