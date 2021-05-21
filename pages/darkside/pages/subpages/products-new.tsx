import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  Select,
  Switch,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import Add from "@material-ui/icons/AddRounded";
import RemoveIcon from "@material-ui/icons/DeleteForeverRounded";
import Edit from "@material-ui/icons/EditRounded";
import InfoIcon from "@material-ui/icons/InfoRounded";
import RefreshIcon from "@material-ui/icons/RefreshRounded";
import Minus from "@material-ui/icons/RemoveRounded";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
import React, { useState } from "react";
import slugify from "slugify";
import styled from "styled-components";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import HorizontalLine from "../../../../src/components/Atoms/HorizontalLine";
import MarkdownText from "../../../../src/components/Atoms/MarkdownText";
import Row from "../../../../src/components/Atoms/Row";
import SimpleText from "../../../../src/components/Atoms/SimpleText";
import SizedBox from "../../../../src/components/Atoms/SizedBox";
import Subtitle from "../../../../src/components/Atoms/Subtitle";
import Title from "../../../../src/components/Atoms/Title";
import ProductItem from "../../../../src/components/Molecules/ProductItem";
import Brand from "../../../../src/components/Organisms/HotSection/brand";
import Colors from "../../../../src/enums/Colors";
import Product from "../../../../src/modules/product/Product";

const Page = styled.div`
  display: flex;
  width: 100%;
`;

const Data = styled.div`
  flex: 3;
  padding-right: 40px;
`;

const Preview = styled.div`
  flex: 1;
  background-color: #fbeff7;
  padding: 20px;
  border-radius: 8px;
`;

const BrandImage = styled.div<{ image?: string }>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ProductImage = styled.div<{ image?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-image: ${(props) => `url("${props.image}");`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ProductColor = styled.div<{ color?: string }>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  border: 2px solid #ccc;
`;

const Status = styled.div`
  color: ${Colors.WHITE};
  font-weight: 500;
  font-family: "Commissioner";
  padding: 2px 10px;
  width: 228px;
  background-color: ${Colors.ERROR};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  text-align: center;
  position: relative;
  z-index: 100000;
  opacity: 0.8;
  margin-bottom: -24px;
`;

const ButtonText = styled.span`
  font-family: Commissioner;
  text-transform: none;
`;

const ModalHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalBackground = styled.div<{ size?: number }>`
  /* background-color: ${Colors.WHITE}; */
  background-color: #fbeff7;
  padding: 20px;
  width: ${(props) => (props.size ? props.size : 500)}px;
  border-radius: 8px;
`;

const Color = styled.div<{ hexValue: string }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) =>
    props.hexValue ? `#${props.hexValue.replace("#", "")}` : "#FFF"};
  border-radius: 4px;
`;

function NewProduct(): JSX.Element {
  const [enabled, setEnabled] = useState(false);
  const [uuid, setUuid] = useState(uuidv4());
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const [rootCategory, setRootCategory] = useState(1);
  const [subCategory, setSubCategory] = useState(null);
  const [category, setCategory] = useState(null);

  const [brand, setBrand] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState("100");
  const [priceWhenNew, setPriceWhenNew] = useState("500");
  const [description, setDescription] = useState("");
  const [infoColumn1, setInfoColumn1] = useState("");
  const [infoColumn2, setInfoColumn2] = useState("");
  const [infoColumn3, setInfoColumn3] = useState("");
  const [qty, setQty] = useState("1");

  const [pWidth, setPWidth] = useState("10");
  const [pHeight, setPHeight] = useState("10");
  const [pLength, setPLength] = useState("5");

  const [pWeight, setPWeight] = useState("0.5");

  const [relatedItems, setRelatedItems] = useState([]);

  // -- Toggles
  const [showJson, setShowJson] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showRelatedItems, setShowRelatedItems] = useState(false);
  const [toggleNewCategory, setToggleNewCategory] = useState(false);

  // --
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandImage, setNewBrandImage] = useState("");

  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("");

  const [newSize, setNewSize] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");

  // -- Loadings
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingColor, setLoadingColor] = useState(false);
  const [loadingSize, setLoadingSize] = useState(false);

  const { data: brands, error: brandsError } = useSWR("/brands", {
    refreshInterval: 500,
  });
  if (brandsError) console.error(brandsError);

  const { data: colors, error: colorsError } = useSWR("/colors", {
    refreshInterval: 500,
  });
  if (colorsError) console.error(colorsError);

  const { data: sizes, error: sizesError } = useSWR("/sizes", {
    refreshInterval: 500,
  });
  if (sizesError) console.error(sizesError);

  const { data: categories, error: categoriesError } = useSWR("/categories", {
    refreshInterval: 500,
  });
  if (categoriesError) console.error(categoriesError);

  const { data: subCategories, error: subCategoriesError } = useSWR(
    "/sub-categories",
    {
      refreshInterval: 500,
    }
  );
  if (subCategoriesError) console.error(subCategoriesError);

  const { data: products, error: productsError } = useSWR(
    "/all-products-simplified",
    {}
  );
  if (productsError) console.error(productsError);

  function getBrandName() {
    if (brands && brand) {
      const brandName = brands.find((b: any) => b.id === brand);

      if (brandName) {
        return brandName.name;
      } else return "";
    } else {
      return "";
    }
  }

  function getProductSizeText() {
    if (sizes && size) {
      const productSize = sizes.find((s: any) => s.id === size);

      if (productSize) {
        return productSize.value;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  function getItem() {
    const brandName = getBrandName();

    const productSize = getProductSizeText();

    const product: Product = {
      enabled: true,
      id: "",
      description: "",
      uid: "",
      image,
      title,
      brand: {
        id: null,
        image: null,
        name: brandName,
      },
      sizes: [
        {
          id: null,
          value: productSize,
        },
      ],
      colors: null,
      price: Number(price.replace(",", ".")),
      priceWhenNew: Number(priceWhenNew.replace(",", ".")),
      viewCount: 1,
      qty: Number(qty),
      pWidth: Number(pWidth),
      pHeight: Number(pHeight),
      pLength: Number(pLength),
      pWeight: Number(pWeight),
    };

    return product;
  }

  function getBrands() {
    const _brands = _orderBy(brands, ["name"]);
    return _brands.map((b: any) => (
      <MenuItem key={b.name} value={b.id}>
        {b.name}
      </MenuItem>
    ));
  }

  function getBrandImage() {
    if (brands && brand) {
      const brandImage = brands.find((b: any) => b.id === brand);

      if (brandImage) {
        return brandImage.image;
      } else return "";
    }
    return "";
  }

  function getColors() {
    const _colors = _orderBy(colors, ["name"]);

    return _colors.map((c: any) => (
      <MenuItem key={c.name} value={c.id}>
        {c.name}
      </MenuItem>
    ));
  }

  function getSelectedColor() {
    if (colors && color) {
      const colorImage = colors.find((c: any) => c.id === color);

      if (colorImage) {
        return colorImage.hexColor;
      } else {
        return "";
      }
    }
    return "";
  }

  function getSizes() {
    const _sizes = _orderBy(sizes, ["value"]);

    return _sizes.map((s: any) => (
      <MenuItem key={s.value} value={s.id}>
        {s.value}
      </MenuItem>
    ));
  }

  function getCategories(rCategory: number) {
    if (categories) {
      const _categories = [];
      categories.forEach((c: any) => {
        if (Number(c.rootCategory.id) === Number(rCategory)) {
          _categories.push({
            value: c.id,
            text: c.title,
          });
        }
      });

      const _sortedCategories = _orderBy(_categories, ["text"]);
      return _sortedCategories.map((c) => (
        <MenuItem key={c.text} value={c.value}>
          {c.text}
        </MenuItem>
      ));
    }
    return null;
  }

  function getSubCategories() {
    if (subCategories) {
      const _subCategories = [];

      subCategories.forEach((c: any) => {
        _subCategories.push({
          value: c.id,
          text: `${c.category?.rootCategory === 1 ? "Mulher" : "Kids"} > ${
            c.category?.title
          } > ${c.title}`,
        });
      });

      const _sortedCategories = _orderBy(_subCategories, ["text"]);

      return _sortedCategories.map((c) => (
        <MenuItem key={c.text} value={c.value}>
          {c.text}
        </MenuItem>
      ));
    }
    return null;
  }

  function addImage() {
    const _images = _cloneDeep(images);
    _images.push("");
    setImages(_images);
  }

  function removeImage(index: number) {
    const _images = _cloneDeep(images);

    if (images.length === 1) {
      setImages([]);
    } else {
      _images.splice(index, 1);
      setImages(_images);
    }
  }

  function handleImageUrl(text: string, index: number) {
    const _images = _cloneDeep(images);

    _images[index] = text;
    setImages(_images);
  }

  function getFinalImages() {
    const _images = [];

    images.forEach((image, index) => {
      _images.push({
        title: slugify(
          `${getBrandName()} ${title} ${getProductSizeText()} ${index}`,
          {
            lower: true,
            locale: "pt",
          }
        ),
        href: image,
      });
    });

    return _images;
  }

  function getFinalObject() {
    return {
      uuid,
      title,
      enabled,
      image,
      images: getFinalImages(),
      rootCategory,
      category,
      subCategory,
      brand,
      color,
      size,
      price,
      priceWhenNew,
      description,
      infoColumn1,
      infoColumn2,
      infoColumn3,
      qty,
      pWidth,
      pHeight,
      pLength,
      pWeight,
      slug: slugify(`${getBrandName()} ${title} ${getProductSizeText()}`, {
        lower: true,
        locale: "pt",
      }),
      newBrandName,
      newBrandImage,
      newColorName,
      newColorHex,
      newSize,
      relatedItems,
    };
  }

  const CategoryModal = (
    <ModalHolder>
      <ModalBackground>
        <Title>Adicionar Categoria</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={20}></SizedBox>
        <Row>
          <Row>
            <Radio
              checked={rootCategory === 1}
              onChange={() => {
                setRootCategory(1);
              }}
              value={1}
            ></Radio>
            <SimpleText>Mulher</SimpleText>
          </Row>
          <Row>
            <Radio
              checked={rootCategory === 2}
              onChange={() => {
                setRootCategory(2);
              }}
              value={2}
            ></Radio>
            <SimpleText>Kids</SimpleText>
          </Row>
        </Row>
        <SizedBox height={20}></SizedBox>

        {!toggleNewCategory && (
          <FormControl variant="outlined" style={{ width: 460 }}>
            <InputLabel id="select-outlined-label">Categoria</InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              value={category}
              onChange={(e) => setCategory(e.target?.value)}
              label="Categoria"
            >
              {getCategories(rootCategory)}
            </Select>
          </FormControl>
        )}
        <Button
          disableElevation
          startIcon={toggleNewCategory ? <Minus /> : <Add />}
          onClick={() => setToggleNewCategory(!toggleNewCategory)}
        >
          <ButtonText>
            {toggleNewCategory ? "Selecionar Categoria" : "Nova Categoria"}
          </ButtonText>
        </Button>
        <SizedBox height={20}></SizedBox>
        {toggleNewCategory && (
          <>
            <TextField
              label="Nova Categoria"
              variant="outlined"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.currentTarget.value)}
            />
            <SizedBox height={20}></SizedBox>
          </>
        )}
        <TextField
          label="Nova SubCategoria"
          variant="outlined"
          fullWidth
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.currentTarget.value)}
        />
        <SizedBox height={40}></SizedBox>
        <Row spaceBetween>
          <Button disableElevation variant="contained" color="primary">
            <ButtonText>Adicionar</ButtonText>
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => setShowCategoryModal(false)}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Row>
      </ModalBackground>
    </ModalHolder>
  );

  async function addBrand() {
    setLoadingBrand(true);
    try {
      const response = await Axios.post("/brands", {
        name: newBrandName,
        image: newBrandImage,
      });
      setBrand(response.data.id);
      setLoadingBrand(false);
      setNewBrandImage("");
      setNewBrandName("");
      setShowBrandModal(false);
    } catch (error) {
      setLoadingBrand(false);
      console.error(error);
    }
  }

  const BrandModal = (
    <ModalHolder>
      <ModalBackground>
        <Title>Adicionar Marca</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={40}></SizedBox>
        <TextField
          label="Nome da Marca"
          variant="outlined"
          fullWidth
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.currentTarget.value)}
        />
        <SizedBox height={20}></SizedBox>
        <TextField
          label="URL da Imagem da Marca"
          variant="outlined"
          fullWidth
          value={newBrandImage}
          onChange={(e) => setNewBrandImage(e.currentTarget.value)}
        />
        <SizedBox height={20}></SizedBox>
        <Brand
          data={{ id: "", name: newBrandName, image: newBrandImage }}
          disabled
        ></Brand>
        <SizedBox height={40}></SizedBox>
        <Row spaceBetween>
          <Row>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={addBrand}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
            {loadingBrand && (
              <>
                <SizedBox width={10}></SizedBox>
                <CircularProgress size={24}></CircularProgress>
              </>
            )}
          </Row>
          <Button
            disableElevation
            variant="contained"
            onClick={() => setShowBrandModal(false)}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Row>
      </ModalBackground>
    </ModalHolder>
  );

  async function addColor() {
    setLoadingColor(true);
    try {
      const response = await Axios.post("/colors", {
        name: newColorName,
        hexColor: "#" + newColorHex.replace("#", ""),
      });
      setColor(response.data.id);
      setLoadingColor(false);
      setNewColorHex("");
      setNewColorName("");
      setShowColorModal(false);
    } catch (error) {
      setLoadingColor(false);
      console.error(error);
    }
  }

  const ColorModal = (
    <ModalHolder>
      <ModalBackground>
        <Title>Adicionar Cor</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={40}></SizedBox>
        <TextField
          label="Nome da Cor"
          variant="outlined"
          fullWidth
          value={newColorName}
          onChange={(e) => setNewColorName(e.currentTarget.value)}
        />
        <SizedBox height={20}></SizedBox>
        <TextField
          label="Código Hexadecimal da Cor"
          variant="outlined"
          fullWidth
          value={newColorHex}
          onChange={(e) => setNewColorHex(e.currentTarget.value)}
        />
        <SizedBox height={20}></SizedBox>
        <Color hexValue={newColorHex}></Color>
        <SizedBox height={40}></SizedBox>
        <Row spaceBetween>
          <Row>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={addColor}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
            {loadingColor && (
              <>
                <SizedBox width={10}></SizedBox>
                <CircularProgress size={24}></CircularProgress>
              </>
            )}
          </Row>
          <Button
            disableElevation
            variant="contained"
            onClick={() => setShowColorModal(false)}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Row>
      </ModalBackground>
    </ModalHolder>
  );

  async function addSize() {
    setLoadingSize(true);
    try {
      const response = await Axios.post("/sizes", {
        value: newSize,
      });
      setSize(response.data.id);
      setLoadingSize(false);
      setNewSize("");
      setShowSizeModal(false);
    } catch (error) {
      setLoadingSize(false);
      console.error(error);
    }
  }

  const SizeModal = (
    <ModalHolder>
      <ModalBackground>
        <Title>Adicionar Tamanho</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={40}></SizedBox>
        <TextField
          label="Tamanho"
          variant="outlined"
          fullWidth
          value={newSize}
          onChange={(e) => setNewSize(e.currentTarget.value)}
        />
        <SizedBox height={40}></SizedBox>
        <Row spaceBetween>
          <Row>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={addSize}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
            {loadingSize && (
              <>
                <SizedBox width={10}></SizedBox>
                <CircularProgress size={24}></CircularProgress>
              </>
            )}
          </Row>
          <Button
            disableElevation
            variant="contained"
            onClick={() => setShowSizeModal(false)}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Row>
      </ModalBackground>
    </ModalHolder>
  );

  const relatedItemsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Foto",
      width: 90,
      renderCell: function getImage(params: any) {
        return <ProductImage image={params.value}></ProductImage>;
      },
    },
    { field: "brand", headerName: "Marca", width: 150 },
    { field: "title", headerName: "Título", width: 250 },
    { field: "qty", headerName: "Qtd", width: 80, type: "number" },
    { field: "enabled", headerName: "Ativo", width: 90, type: "boolean" },
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

  const RelatedItemsModal = (
    <ModalHolder>
      <ModalBackground size={850}>
        <Title>Adicionar Produtos Relacionados</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={20}></SizedBox>
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        <div style={{ height: 530 }}>
          <DataGrid
            rows={getRelatedItems()}
            columns={relatedItemsColumns}
            pageSize={8}
            checkboxSelection
            selectionModel={relatedItems}
            onSelectionModelChange={(newSelection) => {
              setRelatedItems(newSelection.selectionModel);
            }}
          />
        </div>
        <SizedBox height={40}></SizedBox>

        <Row spaceBetween>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => setShowRelatedItems(false)}
          >
            <ButtonText>Adicionar</ButtonText>
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => {
              setRelatedItems([]);
              setShowRelatedItems(false);
            }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </Row>
      </ModalBackground>
    </ModalHolder>
  );

  return (
    <Page>
      <Modal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      >
        {CategoryModal}
      </Modal>
      <Modal open={showBrandModal} onClose={() => setShowBrandModal(false)}>
        {BrandModal}
      </Modal>
      <Modal open={showColorModal} onClose={() => setShowColorModal(false)}>
        {ColorModal}
      </Modal>
      <Modal open={showSizeModal} onClose={() => setShowSizeModal(false)}>
        {SizeModal}
      </Modal>
      <Modal open={showRelatedItems} onClose={() => setShowRelatedItems(false)}>
        {RelatedItemsModal}
      </Modal>
      <Data>
        <SizedBox height={10}></SizedBox>
        <Row spaceBetween>
          <div>
            <Subtitle>Novo Produto</Subtitle>
          </div>
          <div>
            <Row>
              <Switch
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                name="checkedB"
                color="primary"
              />

              <SimpleText>{enabled ? "Habilitado" : "Desabilitado"}</SimpleText>
            </Row>
          </div>
        </Row>
        <SizedBox height={20}></SizedBox>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <SizedBox height={40}></SizedBox>
        <TextField
          label="Imagem Principal (URL)"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.currentTarget.value)}
        />
        {images.length > 0 && (
          <>
            {images.map((i, index) => (
              <>
                <SizedBox height={20}></SizedBox>
                <TextField
                  key={index}
                  label={`Imagem adicional ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={i}
                  onChange={(e) => handleImageUrl(e.currentTarget.value, index)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Remover Imagem"
                          onClick={() => removeImage(index)}
                          edge="end"
                        >
                          <RemoveIcon style={{ color: Colors.ERROR }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ))}
          </>
        )}
        <SizedBox height={10}></SizedBox>
        <Button disableElevation startIcon={<Add />} onClick={addImage}>
          <ButtonText>Adicionar Imagem</ButtonText>
        </Button>
        <SizedBox height={40}></SizedBox>
        <Row>
          <TextField
            label="Preço"
            variant="outlined"
            style={{ width: 130 }}
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <SizedBox width={20}></SizedBox>
          <TextField
            label="Preço Original"
            variant="outlined"
            style={{ width: 130 }}
            value={priceWhenNew}
            onChange={(e) => setPriceWhenNew(e.currentTarget.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <SizedBox width={20}></SizedBox>
          <Row>
            <InfoIcon style={{ color: Colors.BLUE_JEANS }}></InfoIcon>
            <SizedBox width={5}></SizedBox>
            <SimpleText>Valor do produto novo</SimpleText>
          </Row>
        </Row>
        <SizedBox height={40}></SizedBox>
        {categories && (
          <Row>
            <FormControl variant="outlined" style={{ width: 450 }}>
              <InputLabel id="select-outlined-label">Categoria</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target?.value)}
                label="Categoria"
              >
                {getSubCategories()}
              </Select>
            </FormControl>
            <SizedBox width={20}></SizedBox>
            <Button
              disableElevation
              startIcon={<Add />}
              onClick={() => setShowCategoryModal(true)}
            >
              <ButtonText>Adicionar Categoria</ButtonText>
            </Button>
          </Row>
        )}
        <SizedBox height={40}></SizedBox>
        {brands && (
          <Row>
            <FormControl variant="outlined" style={{ width: 280 }}>
              <InputLabel id="select-outlined-label">Marca</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={brand}
                onChange={(e) => setBrand(e.target?.value)}
                label="Marca"
              >
                {getBrands()}
              </Select>
            </FormControl>
            {brand && (
              <>
                <SizedBox width={20}></SizedBox>
                <BrandImage image={getBrandImage()}></BrandImage>
                <SizedBox width={20}></SizedBox>
              </>
            )}
            <SizedBox width={20}></SizedBox>
            <Button
              disableElevation
              startIcon={<Add />}
              onClick={() => setShowBrandModal(true)}
            >
              <ButtonText>Adicionar Marca</ButtonText>
            </Button>
          </Row>
        )}
        <SizedBox height={40}></SizedBox>
        {colors && (
          <Row>
            <FormControl variant="outlined" style={{ width: 280 }}>
              <InputLabel id="select-outlined-label">Cor</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={color}
                onChange={(e) => setColor(e.target?.value)}
                label="Cor"
              >
                {getColors()}
              </Select>
            </FormControl>
            {color && (
              <>
                <SizedBox width={20}></SizedBox>
                <ProductColor color={getSelectedColor()}></ProductColor>
                <SizedBox width={20}></SizedBox>
              </>
            )}
            <SizedBox width={20}></SizedBox>
            <Button
              disableElevation
              startIcon={<Add />}
              onClick={() => setShowColorModal(true)}
            >
              <ButtonText>Adicionar Cor</ButtonText>
            </Button>
          </Row>
        )}
        <SizedBox height={40}></SizedBox>
        {sizes && (
          <Row>
            <FormControl variant="outlined" style={{ width: 280 }}>
              <InputLabel id="select-outlined-label">Tamanho</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={size}
                onChange={(e) => setSize(e.target?.value)}
                label="Tamanho"
              >
                {getSizes()}
              </Select>
            </FormControl>
            <SizedBox width={20}></SizedBox>
            <Button
              disableElevation
              startIcon={<Add />}
              onClick={() => setShowSizeModal(true)}
            >
              <ButtonText>Adicionar Tamanho</ButtonText>
            </Button>
          </Row>
        )}
        <SizedBox height={40}></SizedBox>
        <TextField
          label="Descrição"
          multiline
          rows={6}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target?.value)}
          style={{ width: 500 }}
        />
        <SizedBox height={40}></SizedBox>
        <Subtitle>Informações do Produto</Subtitle>
        <SizedBox height={20}></SizedBox>
        <Row>
          <TextField
            label="Coluna 1"
            multiline
            rows={8}
            variant="outlined"
            value={infoColumn1}
            onChange={(e) => setInfoColumn1(e.target?.value)}
            fullWidth
          />
          <SizedBox width={80}></SizedBox>
          <TextField
            label="Coluna 2"
            multiline
            rows={8}
            variant="outlined"
            value={infoColumn2}
            onChange={(e) => setInfoColumn2(e.target?.value)}
            fullWidth
          />
          <SizedBox width={80}></SizedBox>
          <TextField
            label="Coluna 3"
            multiline
            rows={8}
            variant="outlined"
            value={infoColumn3}
            onChange={(e) => setInfoColumn3(e.target?.value)}
            fullWidth
          />
        </Row>
        <SizedBox height={40}></SizedBox>
        <Row>
          <TextField
            label="Quantidade"
            rows={6}
            variant="outlined"
            value={qty}
            onChange={(e) => setQty(e.target?.value)}
            style={{ width: 100 }}
          />
          <SizedBox width={60}></SizedBox>
          <TextField
            label="Largura"
            rows={6}
            variant="outlined"
            value={pWidth}
            onChange={(e) => setPWidth(e.target?.value)}
            style={{ width: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <SizedBox width={20}></SizedBox>
          <TextField
            label="Altura"
            rows={6}
            variant="outlined"
            value={pHeight}
            onChange={(e) => setPHeight(e.target?.value)}
            style={{ width: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <SizedBox width={20}></SizedBox>
          <TextField
            label="Profundidade"
            rows={6}
            variant="outlined"
            value={pLength}
            onChange={(e) => setPLength(e.target?.value)}
            style={{ width: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <SizedBox width={60}></SizedBox>
          <TextField
            label="Peso"
            rows={6}
            variant="outlined"
            value={pWeight}
            onChange={(e) => setPWeight(e.target?.value)}
            style={{ width: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </Row>
        <SizedBox height={40}></SizedBox>
        <Subtitle>Produtos Relacionados</Subtitle>
        <SizedBox height={20}></SizedBox>
        <Row>
          {relatedItems.length > 0 ? (
            <>
              <SimpleText
                color={Colors.BLUE_JEANS}
              >{`${relatedItems.length} selecionado(s)`}</SimpleText>
              <SizedBox width={20}></SizedBox>
            </>
          ) : null}
          <Button
            disableElevation
            startIcon={<Edit />}
            onClick={() => setShowRelatedItems(true)}
          >
            <ButtonText>Selecionar Produtos...</ButtonText>
          </Button>
        </Row>
        <SizedBox height={40}></SizedBox>
        <Row>
          <TextField
            label="UUID"
            variant="outlined"
            value={uuid}
            style={{ width: 341 }}
            contentEditable={false}
          />
          <SizedBox width={20}></SizedBox>
          <Button
            disableElevation
            startIcon={<RefreshIcon />}
            onClick={() => setUuid(uuidv4())}
          >
            <ButtonText>Alterar UUID</ButtonText>
          </Button>
        </Row>
        <SizedBox height={40}></SizedBox>
        <Button
          disableElevation
          variant="contained"
          size="large"
          color="primary"
        >
          <ButtonText>Salvar</ButtonText>
        </Button>
        <SizedBox height={40}></SizedBox>
        <HorizontalLine color="#CCC"></HorizontalLine>
        <SizedBox height={20}></SizedBox>
        <Button
          disableElevation
          variant="contained"
          onClick={() => setShowJson(!showJson)}
        >
          <ButtonText>
            {showJson ? "Esconder dados em JSON" : "Mostrar dados em JSON"}
          </ButtonText>
        </Button>

        {showJson && (
          <div style={{ width: 700 }}>
            <pre
              style={{
                maxWidth: 700,
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {JSON.stringify(getFinalObject(), null, 2)}
            </pre>
          </div>
        )}

        <SizedBox height={60}></SizedBox>
      </Data>
      <Preview>
        <Subtitle>Pré-visualização</Subtitle>
        <SizedBox height={20}></SizedBox>
        {!enabled && <Status>Desabilitado</Status>}
        <ProductItem data={getItem()} disabled></ProductItem>
        <SizedBox height={40}></SizedBox>
        <Title>Informações do Produto</Title>
        <SizedBox height={40}></SizedBox>

        <MarkdownText>{infoColumn1}</MarkdownText>
        <HorizontalLine color="#CCC"></HorizontalLine>
        <SizedBox height={20}></SizedBox>

        <MarkdownText>{infoColumn2}</MarkdownText>
        <HorizontalLine color="#CCC"></HorizontalLine>
        <SizedBox height={20}></SizedBox>

        <MarkdownText>{infoColumn3}</MarkdownText>
        <SizedBox height={20}></SizedBox>
      </Preview>
    </Page>
  );
}

export default NewProduct;
