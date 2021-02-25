import { useRouter } from "next/router";
import React from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import SearchItemType from "../../../modules/searchItem/SearchItem";
import Column from "../Column";
import Row from "../Row";

const StyledCategoryItem = styled.div`
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

const RootCategory = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.505px;
  text-transform: uppercase;
  color: ${Colors.SECONDARY};
`;

const Category = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.505px;
  text-transform: uppercase;
  color: rgba(86, 22, 67, 0.75);
`;

const SubCategory = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.505px;
  text-transform: uppercase;
  color: ${Colors.PRIMARY};
  margin-left: 5px;
`;

function SearchCategoryItem({
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
    <StyledCategoryItem
      onClick={() => {
        router.push(
          `/categorias/${item.category0slug}/${item.category1slug}/${item.category2slug}`
        );
        closePanel();
      }}
    >
      <Column>
        <RootCategory>
          <Highlighter
            searchWords={[query]}
            autoEscape={true}
            textToHighlight={item.category0}
          />
        </RootCategory>
        <Row>
          <Category>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={item.category1}
            />
          </Category>
          <SubCategory>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={"> " + item.category2}
            />
          </SubCategory>
        </Row>
      </Column>
    </StyledCategoryItem>
  );
}

export default SearchCategoryItem;
