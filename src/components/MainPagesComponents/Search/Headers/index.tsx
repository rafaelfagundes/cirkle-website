import { NextRouter } from "next/router";
import React from "react";
import FiltersToggle from "../../../Atoms/FiltersToggle";
import ListOrderSwitch, { OPTIONS } from "../../../Atoms/ListOrderSwitch";
import Padding from "../../../Atoms/Padding";
import Row from "../../../Atoms/Row";
import StaticBreadcrumbs from "../../../Molecules/StaticBreadcrumbs";

function MobileHeader(
  showMobileFilters: boolean,
  filtersActive: boolean,
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>
): JSX.Element {
  return (
    <Padding horizontal={20}>
      <FiltersToggle
        active={showMobileFilters}
        hasFilters={filtersActive}
        toggle={() => setShowMobileFilters(!showMobileFilters)}
      ></FiltersToggle>
    </Padding>
  );
}

function DesktopHeader(
  router: NextRouter,
  sortOrder: string | string[],
  setSortOrder: React.Dispatch<React.SetStateAction<OPTIONS>>
): JSX.Element {
  return (
    <Padding horizontal={0}>
      <Row spaceBetween>
        <StaticBreadcrumbs
          showHome
          root={{
            link: "pesquisa",
            title: router.query.q ? "Pesquisa" : "Produtos",
          }}
          category={
            router.query.q
              ? {
                  link: process.browser
                    ? `?${String(window.location).split("?")[1]}`
                    : null,
                  title: `"${router.query.q}"`,
                }
              : null
          }
        ></StaticBreadcrumbs>
        <ListOrderSwitch
          value={sortOrder}
          setValue={setSortOrder}
        ></ListOrderSwitch>
      </Row>
    </Padding>
  );
}

export { MobileHeader, DesktopHeader };
