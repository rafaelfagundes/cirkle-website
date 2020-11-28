import Popover from "@material-ui/core/Popover";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React, { useEffect } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import RadioButton from "../../Atoms/RadioButton";
import SimpleText from "../../Atoms/SimpleText";
import SizedBox from "../../Atoms/SizedBox";
import Subtitle from "../../Atoms/Subtitle";
import Column from "../Column";
import Icon from "../Icon";

export enum AssetType {
  COLOR = "color",
  IMAGE = "image",
  ICON = "icon",
  NONE = "none",
}

export type SelectItem = {
  text: string;
  value: any;
  selected: boolean;
  assetType: AssetType;
  assetValue?: string;
  secondaryText?: string;
  secondaryValue?: number;
};

const SelectBox = styled.div<{ width: number; error: boolean }>`
  height: 44px;
  border: 2px solid ${(props) => (props.error ? Colors.ERROR : Colors.PRIMARY)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 0px;
  min-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  max-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  background-color: ${Colors.WHITE};
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
`;

const SelectBoxText = styled.div<{ error: boolean }>`
  font-family: Commissioner;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 18px;
  color: ${(props) => (props.error ? Colors.ERROR : Colors.PRIMARY)};
  margin-left: 10px;
`;

const MenuHolder = styled.div<{ width: number }>`
  min-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
  max-width: ${(props) => (props.width ? `${props.width}px` : `343px`)};
`;

const SingleItem = styled.div``;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 16px 8px 6px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:hover {
    background-color: ${Colors.VERY_LIGHT_GRAY};
  }
`;

const MenuAssetText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
`;

const MenuAssetColor = styled.div<{ color: string; marginLeft: boolean }>`
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.color};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: 10px;
  margin-left: ${(props) => (props.marginLeft ? 6 : 0)}px;
`;

const MenuAssetImage = styled.div<{
  image: string;
  size?: number;
  marginLeft: boolean;
}>`
  position: relative;
  background-color: #fff;
  width: ${(props) => (props.size ? props.size : 28)}px;
  height: ${(props) => (props.size ? props.size : 28)}px;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: contain;
  background-size: 80%;
  margin-right: 10px;
  margin-left: ${(props) => (props.marginLeft ? 6 : 0)}px;
`;

const ShippingCheckBox = styled.div<{ selected: boolean; hasImage: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.hasImage ? "space-between" : "flex-start"};
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#F5F5F5" : "transparent")};
  padding: 10px 10px 10px 4px;

  transition: background 500ms;
`;

const ImageText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShippingList = styled.div`
  max-height: 350px;
  overflow-y: auto;
`;

interface SelectMenuProps {
  title?: string;
  placeholder?: string;
  items: Array<SelectItem>;
  setSelected: (value: Array<SelectItem>) => void;
  width?: number;
  errorText?: string;
  radioButtonList?: boolean;
}

function SelectMenu({
  title,
  placeholder,
  items,
  setSelected,
  width,
  errorText,
  radioButtonList = false,
}: SelectMenuProps): JSX.Element {
  function getAsset(type: string, value: string, marginLeft: boolean) {
    switch (type) {
      case AssetType.COLOR:
        return (
          <MenuAssetColor
            marginLeft={marginLeft}
            color={value}
          ></MenuAssetColor>
        );
      case AssetType.IMAGE:
        return (
          <MenuAssetImage
            marginLeft={marginLeft}
            image={value}
          ></MenuAssetImage>
        );
      case AssetType.ICON:
        return <Icon type={value}></Icon>;
      default:
        return <SizedBox width={10}></SizedBox>;
    }
  }

  function _setSelected(item: SelectItem) {
    const _items = _cloneDeep(items);

    _items.forEach((o: SelectItem) => {
      if (o.value === item.value) {
        o.selected = true;
      } else {
        o.selected = false;
      }
    });

    setSelected(_items);
  }

  function getLabel(items: Array<SelectItem>) {
    const result = _find(items, (o: SelectItem) => o.selected);

    if (result) {
      return (
        <MenuAssetText>
          {getAsset(result.assetType, result.assetValue, true)}
          <SimpleText
            color={errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
            size={0.9}
          >
            {result.text}
          </SimpleText>
          <SizedBox width={16}></SizedBox>
        </MenuAssetText>
      );
    } else {
      return (
        <SelectBoxText error={errorText !== ""}>
          {placeholder || title}
        </SelectBoxText>
      );
    }
  }

  useEffect(() => {
    if (items.length === 1) {
      const _items = _cloneDeep(items);
      _items[0].selected = true;

      setSelected(_items);
    }
  }, []);

  if (items.length > 1) {
    return (
      <>
        {radioButtonList && (
          <>
            {title && (
              <Subtitle
                size={14}
                bold
                color={errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
              >
                {title}
              </Subtitle>
            )}
            <ShippingList>
              {items.map((item, index) => (
                <ShippingCheckBox
                  key={index}
                  onClick={() => _setSelected(item)}
                  hasImage={item.assetValue !== undefined}
                  selected={item.selected}
                >
                  {!item.assetValue && (
                    <>
                      <SizedBox width={10}></SizedBox>
                      <RadioButton
                        onClick={() => _setSelected(item)}
                        value={item.selected}
                      ></RadioButton>
                    </>
                  )}
                  <ImageText>
                    {!item.assetValue && <SizedBox width={10}></SizedBox>}
                    {item.assetValue && (
                      <MenuAssetImage
                        image={item.assetValue}
                        size={item.secondaryText ? 56 : 28}
                        marginLeft
                      ></MenuAssetImage>
                    )}
                    <div>
                      <SimpleText size={0.9}>{item.text}</SimpleText>
                      {item.secondaryText && (
                        <>
                          <SizedBox height={2}></SizedBox>
                          <SimpleText size={0.8}>
                            {item.secondaryText}
                          </SimpleText>
                        </>
                      )}
                    </div>
                  </ImageText>
                  {item.assetValue && (
                    <RadioButton
                      onClick={() => _setSelected(item)}
                      value={item.selected}
                    ></RadioButton>
                  )}
                </ShippingCheckBox>
              ))}
            </ShippingList>
          </>
        )}
        {!radioButtonList && (
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                {title && (
                  <>
                    <Subtitle
                      size={14}
                      bold
                      color={errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
                    >
                      {title}
                    </Subtitle>
                    <SizedBox height={4}></SizedBox>
                  </>
                )}
                <SelectBox
                  {...bindTrigger(popupState)}
                  width={width}
                  error={errorText !== ""}
                >
                  {getLabel(items)}
                  <Icon
                    type={
                      errorText !== ""
                        ? "triangle-down-fill-red"
                        : "triangle-down-fill-dark"
                    }
                    size={16}
                    onClick={() => null}
                  ></Icon>
                </SelectBox>
                {errorText !== "" && (
                  <>
                    <SizedBox height={4}></SizedBox>
                    <SimpleText size={0.9} color={Colors.ERROR}>
                      {errorText}
                    </SimpleText>
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
                  <MenuHolder onClick={() => popupState.close()} width={width}>
                    {items &&
                      items.map((item: SelectItem) => (
                        <MenuItem
                          key={item.value}
                          onClick={() => _setSelected(item)}
                        >
                          <MenuAssetText>
                            {getAsset(item.assetType, item.assetValue, true)}
                            <div>
                              <SimpleText size={0.9}>{item.text}</SimpleText>
                              {item.secondaryText && (
                                <>
                                  <SizedBox height={2}></SizedBox>
                                  <SimpleText size={0.8}>
                                    {item.secondaryText}
                                  </SimpleText>
                                </>
                              )}
                            </div>
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
        )}
      </>
    );
  } else {
    return (
      <Column>
        {title && (
          <>
            <Subtitle
              size={14}
              bold
              color={errorText !== "" ? Colors.ERROR : Colors.PRIMARY}
            >
              {title}
            </Subtitle>
            <SizedBox height={4}></SizedBox>
          </>
        )}
        <SingleItem>
          <MenuAssetText>
            <div
              style={{
                minHeight: 43,
                display: "flex",
                alignItems: "center",
              }}
            >
              {getAsset(items[0].assetType, items[0].assetValue, false)}
            </div>
            <div>
              <SimpleText size={0.9}>{items[0].text}</SimpleText>
              {items[0].secondaryText && (
                <>
                  <SizedBox height={2}></SizedBox>
                  <SimpleText size={0.8}>{items[0].secondaryText}</SimpleText>
                </>
              )}
            </div>
          </MenuAssetText>
        </SingleItem>
      </Column>
    );
  }
}

export default SelectMenu;
