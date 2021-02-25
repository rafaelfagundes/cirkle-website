import { useRouter } from "next/router";
import React from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledPageItem = styled.div`
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

const Item = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.505px;
  color: ${Colors.PRIMARY};
`;

function SearchPageItem({
  item,
  query,
  closePanel,
}: {
  item: { title: string; href: string };
  query: string;
  closePanel: () => void;
}): JSX.Element {
  const router = useRouter();

  return (
    <StyledPageItem
      onClick={() => {
        router.push(item.href);
        closePanel();
      }}
    >
      <Item>
        <Highlighter
          searchWords={[query]}
          autoEscape={true}
          textToHighlight={item.title}
        />
      </Item>
    </StyledPageItem>
  );
}

export default SearchPageItem;
