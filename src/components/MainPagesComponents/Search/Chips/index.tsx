import { Chip, withStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import Padding from "../../../Atoms/Padding";
import SizedBox from "../../../Atoms/SizedBox";

const ChipsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledChip = withStyles({
  root: {
    backgroundColor: Colors.LIGHT_GRAY,
    fontFamily: "Commissioner, sans-serif",
    fontWeight: 700,
    color: Colors.DARK_GRAY,
    marginRight: 5,
    marginBottom: 10,
  },
})(Chip);

const StyledRemoveAllChip = withStyles({
  root: {
    backgroundColor: Colors.RED_PINK,
    fontFamily: "Commissioner, sans-serif",
    fontWeight: 700,
    color: Colors.WHITE,
  },
})(Chip);

function Chips(
  chips: any[],
  removeParam: (param: string) => void,
  removeAllParams: () => void,
  removePrices: () => void,
  isSmartphone: boolean
): JSX.Element {
  return (
    <>
      {chips.length > 0 && <SizedBox height={16}></SizedBox>}
      <Padding horizontal={isSmartphone ? 20 : 0}>
        <ChipsRow>
          {chips.map((chip: { param: string; value: string }) => (
            <React.Fragment key={chip.param}>
              <StyledChip
                label={chip.value}
                size="small"
                onDelete={() =>
                  chip.param === "minPrice" || chip.param === "maxPrice"
                    ? removePrices()
                    : removeParam(chip.param)
                }
                onClick={() =>
                  chip.param === "minPrice" || chip.param === "maxPrice"
                    ? removePrices()
                    : removeParam(chip.param)
                }
              />
            </React.Fragment>
          ))}
          {chips.length > 0 && (
            <StyledRemoveAllChip
              size="small"
              onClick={removeAllParams}
              onDelete={removeAllParams}
              label="Remover Filtros"
              color="secondary"
            />
          )}
        </ChipsRow>
      </Padding>
    </>
  );
}

export default Chips;
