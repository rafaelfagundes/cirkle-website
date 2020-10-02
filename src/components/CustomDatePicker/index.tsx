import ptBr from "date-fns/locale/pt";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Icon from "../Icon";
registerLocale("pt", ptBr);

const StyledInput = styled.div`
  border: 2px solid ${Colors.PRIMARY};
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  transition: 250ms padding;
  justify-content: space-between;
  cursor: pointer;
`;

const InputText = styled.span<{ isPlaceholder: boolean }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.18rem;
  margin-right: 8px;
  padding-top: ${(props) => (props.isPlaceholder ? "0px" : "9px")};
  width: 160px;
  text-align: ${(props) => (props.isPlaceholder ? "left" : "left")};
  color: ${(props) =>
    props.isPlaceholder ? Colors.LIGHT_GRAY : Colors.PRIMARY};
`;

const PlaceHolder = styled.div<{ show: boolean }>`
  position: absolute;
  background-color: ${Colors.PRIMARY};
  top: -10px;
  left: 6px;
  padding: 0 8px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 500ms opacity;
`;

const PlaceHolderText = styled.span`
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

function CustomTextField(props: any): JSX.Element {
  let date = "";
  if (props.value) {
    date = props.value;
  }

  return (
    <StyledInput onClick={props.onClick}>
      <PlaceHolder show={date !== ""}>
        <PlaceHolderText>{props.placeholder}</PlaceHolderText>
      </PlaceHolder>
      <InputText isPlaceholder={date === ""}>
        {date || props.placeholder}
      </InputText>
      <Icon type="calendar"></Icon>
    </StyledInput>
  );
}

interface CustomDatePickerProps {
  value: string;
  setDate: (date: Date) => void;
  placeholder: string;
  showYearDropdown: boolean;
  withPortal: boolean;
}

function CustomDatePicker(props: CustomDatePickerProps): JSX.Element {
  const [startDate, setStartDate] = useState(
    props.value ? moment(props.value).toDate() : null
  );
  console.log("startDate", startDate);

  useEffect(() => {
    if (startDate) {
      props.setDate(startDate);
    }
  }, [startDate]);

  return (
    <>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        locale="pt"
        customInput={<CustomTextField></CustomTextField>}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showYearDropdown={props.showYearDropdown}
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText={props.placeholder}
        maxDate={new Date()}
        value={props.value}
        withPortal={props.withPortal}
      />
    </>
  );
}

export default CustomDatePicker;
