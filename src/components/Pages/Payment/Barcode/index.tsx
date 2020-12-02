import React from "react";
import Colors from "../../../../enums/Colors";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import Subtitle from "../../../Atoms/Subtitle";

function Barcode(): JSX.Element {
  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>BOLETO BANCÁRIO</Subtitle>
      <SizedBox height={20}></SizedBox>
      <SimpleText>O boleto será gerado no final do pedido</SimpleText>
    </div>
  );
}

export default Barcode;
