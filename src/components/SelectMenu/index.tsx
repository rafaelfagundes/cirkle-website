import Popover from "@material-ui/core/Popover";
import _ from "lodash";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React, { useEffect } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Icon from "../Icon";
import RadioButton from "../RadioButton";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";
import Subtitle from "../Subtitle";

export enum AssetType {
  COLOR = "color",
  IMAGE = "image",
  ICON = "icon",
  NONE = "none",
}

export type SelectItem = {
  text: string;
  value: string;
  selected: boolean;
  assetType: AssetType;
  assetValue?: string;
};

const SelectBox = styled.div<{ width: number; error: boolean }>`
  height: 44px;
  border: 2px solid ${(props) => (props.error ? Colors.ERROR : Colors.PRIMARY)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 6px;
  min-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  max-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  background-color: ${Colors.WHITE};
  user-select: none;
  cursor: pointer;
`;

const SelectBoxText = styled.div<{ error: boolean }>`
  font-family: Commissioner;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => (props.error ? Colors.ERROR : Colors.PRIMARY)};
  margin-left: 10px;
`;

const MenuHolder = styled.div<{ width: number }>`
  min-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  max-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${Colors.VERY_LIGHT_GRAY};
  }
`;

const MenuAssetText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuAssetColor = styled.div<{ color: string }>`
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.color};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: 10px;
`;

const MenuAssetImage = styled.div<{ image: string }>`
  position: relative;
  background-color: #fff;
  width: 28px;
  height: 28px;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  margin-right: 10px;
`;

interface SelectMenuProps {
  title?: string;
  placeholder?: string;
  items: Array<SelectItem>;
  setSelected: (value: Array<SelectItem>) => void;
  width?: number;
  errorText?: string;
}

function SelectMenu(props: SelectMenuProps): JSX.Element {
  function getAsset(type: string, value: string) {
    switch (type) {
      case AssetType.COLOR:
        return <MenuAssetColor color={value}></MenuAssetColor>;
      case AssetType.IMAGE:
        return <MenuAssetImage image={value}></MenuAssetImage>;
      case AssetType.ICON:
        return <Icon type={value}></Icon>;
      default:
        return <SizedBox width={10}></SizedBox>;
    }
  }

  function setSelected(item: SelectItem) {
    const _items = _.cloneDeep(props.items);

    _items.forEach((o: SelectItem) => {
      if (o.value === item.value) {
        o.selected = true;
      } else {
        o.selected = false;
      }
    });

    props.setSelected(_items);
  }

  function getLabel(items: Array<SelectItem>) {
    const result = _.find(items, (o: SelectItem) => o.selected);

    if (result) {
      return (
        <MenuAssetText>
          {getAsset(result.assetType, result.assetValue)}
          <SimpleText
            color={props.errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
          >
            {result.text}
          </SimpleText>
          <SizedBox width={16}></SizedBox>
        </MenuAssetText>
      );
    } else {
      return (
        <SelectBoxText error={props.errorText !== ""}>
          {props.placeholder || props.title}
        </SelectBoxText>
      );
    }
  }

  useEffect(() => {
    if (props.items.length === 1) {
      // console.log("props.items.length", props.items.length);

      const _items = _.cloneDeep(props.items);
      _items[0].selected = true;

      props.setSelected(_items);
    }
  }, []);

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          {props.title && (
            <>
              <Subtitle
                size={16}
                bold
                color={props.errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
              >
                {props.title}
              </Subtitle>
              <SizedBox height={4}></SizedBox>
            </>
          )}
          <SelectBox
            {...bindTrigger(popupState)}
            width={props.width}
            error={props.errorText !== ""}
          >
            {getLabel(props.items)}
            <Icon
              type={
                props.errorText !== ""
                  ? "triangle-down-fill-red"
                  : "triangle-down-fill-dark"
              }
              size={16}
              onClick={() => null}
            ></Icon>
          </SelectBox>
          {props.errorText !== "" && (
            <>
              <SizedBox height={4}></SizedBox>
              <SimpleText color={Colors.ERROR}>{props.errorText}</SimpleText>
            </>
          )}
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuHolder onClick={() => popupState.close()} width={props.width}>
              {props.items &&
                props.items.map((item: SelectItem) => (
                  <MenuItem key={item.value} onClick={() => setSelected(item)}>
                    <MenuAssetText>
                      {getAsset(item.assetType, item.assetValue)}
                      <SimpleText>{item.text}</SimpleText>
                      <SizedBox width={16}></SizedBox>
                    </MenuAssetText>
                    <RadioButton
                      value={item.selected}
                      onClick={null}
                    ></RadioButton>
                  </MenuItem>
                ))}
            </MenuHolder>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default SelectMenu;
