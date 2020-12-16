import React from "react";
import styled from "styled-components";
import CustomButton from "../../Atoms/CustomButton";
import Row from "../../Atoms/Row";

const Holder = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #fbeff7;
`;

export type Button = {
  onClick: () => void;
  text: string;
  type?: string;
  width?: number;
  isBackButton?: boolean;
  loading?: boolean;
};

interface CartFooterButtonsProps {
  buttons: Array<Button>;
}

function CartFooterButtons(props: CartFooterButtonsProps): JSX.Element {
  return (
    <Holder>
      <Row spaceBetween>
        <>{props.buttons.length === 1 && <div></div>}</>
        <>
          {props.buttons.map((item) => (
            <CustomButton
              key={item.text}
              onClick={item.onClick}
              variant={item.isBackButton ? "text" : "contained"}
              type={item.type}
              width={item.width}
              loading={item.loading}
            >
              {item.text}
            </CustomButton>
          ))}
        </>
      </Row>
    </Holder>
  );
}

export default CartFooterButtons;
