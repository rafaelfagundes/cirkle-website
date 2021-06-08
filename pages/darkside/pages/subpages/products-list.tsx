import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import _orderBy from "lodash/orderBy";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import Row from "../../../../src/components/Atoms/Row";
import SizedBox from "../../../../src/components/Atoms/SizedBox";
import Colors from "../../../../src/enums/Colors";

const ProductImage = styled.div<{ image?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ButtonText = styled.span<{ color?: string }>`
  font-family: Commissioner;
  text-transform: none;
  color: ${(props) => (props.color ? props.color : Colors.PRIMARY)};
`;

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
}

function ProductsList(props: Props): JSX.Element {
  // const [relatedItems, setRelatedItems] = useState([]);

  const { data: productsData, error: productsError } = useSWR(
    "/all-products-simplified",
    {
      refreshInterval: 250,
    }
  );
  if (productsError) console.error(productsError);

  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  async function deleteProduct(id: number) {
    try {
      const result = await Axios.delete(`/products/${id}`);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function enableDisableProduct(id: number, enabled: boolean) {
    try {
      const result = await Axios.put(`/products/enable/${id}`, {
        enabled: !enabled,
      });
      console.log(result.data);
      const _products = _cloneDeep(products);
      const index = _findIndex(_products, (o: any) => o.id === result.data.id);
      _products[index].enabled = result.data.enabled;
      setProducts(_products);
    } catch (error) {
      console.error(error);
    }
  }

  const ActionsButtons = ({
    productId,
    enabled,
  }: {
    productId: string;
    enabled: boolean;
  }) => {
    return (
      <div style={{ zIndex: 1000 }}>
        <Row>
          <Button
            disableElevation
            variant="contained"
            style={{ backgroundColor: enabled ? Colors.GRAY : Colors.EMERALD }}
            onClick={() => {
              enableDisableProduct(Number(productId), enabled);
            }}
          >
            <ButtonText color={Colors.WHITE}>
              {enabled ? "Desativar" : "Ativar"}
            </ButtonText>
          </Button>
          <SizedBox width={10}></SizedBox>
          <Button
            disableElevation
            variant="contained"
            onClick={() => {
              props.setProductId(productId);
              props.setCurrentPage("NewProduct");
            }}
            style={{ backgroundColor: Colors.BLUE_JEANS }}
          >
            <ButtonText color={Colors.WHITE}>Editar</ButtonText>
          </Button>
          <SizedBox width={10}></SizedBox>
          <Button
            disableElevation
            variant="contained"
            onClick={() => deleteProduct(Number(productId))}
            style={{ backgroundColor: Colors.ERROR }}
          >
            <ButtonText color={Colors.WHITE}>Remover</ButtonText>
          </Button>
        </Row>
      </div>
    );
  };

  const relatedItemsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "enabled", headerName: "Ativo", width: 90, type: "boolean" },
    {
      field: "image",
      headerName: "Foto",
      width: 90,
      renderCell: function getImage(params: any) {
        return <ProductImage image={params.value}></ProductImage>;
      },
    },
    { field: "brand", headerName: "Marca", width: 250 },
    { field: "title", headerName: "Título", width: 450 },
    { field: "qty", headerName: "Qtd", width: 80, type: "number" },
    {
      field: "edit",
      headerName: "Ações",
      width: 320,
      renderCell: function getButtons(params: any) {
        return (
          <ActionsButtons
            enabled={params.row.enabled}
            productId={params.row.id}
          ></ActionsButtons>
        );
      },
    },
  ];

  function getRelatedItems() {
    if (products) {
      const items = products.map((p: any) => ({
        id: p.id,
        enabled: p.enabled,
        qty: p.qty,
        image: p.image,
        brand: p.brand,
        title: p.title,
      }));

      return _orderBy(items, ["brand", "title"], ["asc"]);
    } else {
      return [];
    }
  }

  return (
    <div style={{ height: "100vh", paddingBottom: 20 }}>
      <DataGrid
        rows={getRelatedItems()}
        columns={relatedItemsColumns}
        pageSize={50}
        // checkboxSelection
        // selectionModel={relatedItems}
        // onSelectionModelChange={(newSelection) => {
        //   setRelatedItems(newSelection.selectionModel);
        // }}
      />
    </div>
  );
}

export default ProductsList;
