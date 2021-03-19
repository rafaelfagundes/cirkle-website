import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  /* background-color: ${Colors.VERY_LIGHT_GRAY}; */
  width: 220px;
`;

const Tab = styled.div<{
  active: boolean;
}>`
  height: 44px;
  padding-left: ${(props) => (props.active ? 20 : 0)}px;
  margin-left: ${(props) => (props.active ? -20 : 0)}px;
  background-color: ${(props) =>
    props.active ? Colors.PRIMARY : "transparent"};
  width: 260px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.PRIMARY)};
  font-size: 16px;
  font-family: "Commissioner";
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  letter-spacing: -0.25px;
  text-align: center;
  font-weight: 500;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-bottom: 10px;
  z-index: 1;
`;

export interface ITab {
  title: string;
  id: string;
}

function VerticalSideMenu({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Array<ITab>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const router = useRouter();

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            router.push({
              pathname: "/perfil",
              query: {
                aba: tab?.id?.replace("/", ""),
              },
            });
          }}
        >
          {tab.title}
        </Tab>
      ))}
    </Tabs>
  );
}

export default VerticalSideMenu;
