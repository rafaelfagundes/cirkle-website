import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const Line = styled.div`
  height: 2px;
  background-color: ${Colors.PRIMARY};
  margin-top: -2px;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.div<{
  size: number;
  active: boolean;
}>`
  height: 44px;
  padding: 0 16px;
  background-color: ${(props) =>
    props.active ? Colors.PRIMARY : "transparent"};
  width: ${(props) => props.size}px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.PRIMARY)};
  text-transform: uppercase;
  font-size: 12px;
  font-family: "Commissioner";
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  cursor: pointer;
  letter-spacing: -0.25px;
  text-align: center;
  font-weight: 700;
`;

export interface ITab {
  title: string;
  id: string;
}

function FormTabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Array<ITab>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  return (
    <>
      <Tabs>
        {tabs.map((tab) => (
          <Link href={tab.id} key={tab.id}>
            <Tab
              size={window.innerWidth / 2 - 16}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </Tab>
          </Link>
        ))}
      </Tabs>
      <Line></Line>
    </>
  );
}

export default FormTabs;
