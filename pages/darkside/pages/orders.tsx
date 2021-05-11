import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import useSWR from "swr";

const columns = [
  { field: "id", headerName: "ID", width: 110 },
  { field: "name", headerName: "Nome", width: 250 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "products", headerName: "Itens", width: 90 },
  { field: "amount", headerName: "Valor", width: 120 },
  { field: "status", headerName: "Status", width: 220 },
];

interface Order {
  orderId: string;
  user: { firstName: string; lastName: string };
  email: string;
  products: Array<any>;
  payment: {
    response: {
      transaction_amount: number;
    };
  };
  status: string;
}

function Orders(): JSX.Element {
  const { data, error } = useSWR("/allorders");
  if (error) console.error(error);

  function getRows(rowsData:any) {
    const _rows = [];

    rowsData.forEach((element: Order) => {
      // console.log(`element`, element);

      _rows.push({
        id: element.orderId,
        name: `${element.user.firstName} ${element.user.lastName}`,
        email: element.email,
        products: element.products.length,
        amount: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(element.payment.response.transaction_amount),
        status: element.status,
      });
    });

    return _rows;
  }

  if (data) {
    return <DataGrid rows={getRows(data)} columns={columns} pageSize={50} />;
  } else {
    return null;
  }
}
export default Orders;
