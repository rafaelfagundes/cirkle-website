import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/AddRounded";
import RemoveIcon from "@material-ui/icons/DeleteForeverRounded";
import InfoIcon from "@material-ui/icons/InfoRounded";
import RefreshIcon from "@material-ui/icons/RefreshRounded";
import _ from "lodash";
import _cloneDeep from "lodash/cloneDeep";
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

const ModalBackground = styled.div`
  /* background-color: ${Colors.WHITE}; */
  background-color: #fbeff7;
  padding: 20px;
  width: 500px;
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

  // --
  const [showJson, setShowJson] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showRelatedItems, setShowRelatedItems] = useState(false);

  // --
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandImage, setNewBrandImage] = useState("");

  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("");

  const [newSize, setNewSize] = useState("");

  const { data: brands, error: brandsError } = useSWR("/brands", {});
  if (brandsError) console.error(brandsError);

  const { data: colors, error: colorsError } = useSWR("/colors", {});
  if (colorsError) console.error(colorsError);

  const { data: sizes, error: sizesError } = useSWR("/sizes", {});
  if (sizesError) console.error(sizesError);

  const { data: categories, error: categoriesError } = useSWR(
    "/sub-categories",
    {}
  );
  if (categoriesError) console.error(categoriesError);

  function getBrandName() {
    if (brands && brand) {
      const brandName = brands.find((b: any) => b.id === brand).name;
      return brandName;
    } else {
      return "";
    }
  }

  function getProductSizeText() {
    if (sizes && size) {
      const productSize = sizes.find((s: any) => s.id === size).value;
      return productSize;
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
    return brands.map((b: any) => (
      <MenuItem key={b.name} value={b.id}>
        {b.name}
      </MenuItem>
    ));
  }

  function getBrandImage() {
    if (brands && brand) {
      const brandImage = brands.find((b: any) => b.id === brand).image;
      return brandImage;
    }
    return "";
  }

  function getColors() {
    return colors.map((c: any) => (
      <MenuItem key={c.name} value={c.id}>
        {c.name}
      </MenuItem>
    ));
  }

  function getSelectedColor() {
    if (colors && color) {
      const colorImage = colors.find((c: any) => c.id === color).hexColor;
      return colorImage;
    }
    return "";
  }

  function getSizes() {
    return sizes.map((s: any) => (
      <MenuItem key={s.value} value={s.id}>
        {s.value}
      </MenuItem>
    ));
  }

  function getCategories() {
    if (categories) {
      const _categories = [];

      categories.forEach((c: any) => {
        _categories.push({
          value: c.id,
          text: `${c.category?.rootCategory === 1 ? "Mulher" : "Kids"} > ${
            c.category?.title
          } > ${c.title}`,
        });
      });

      const _sortedCategories = _.orderBy(_categories, ["text"]);

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
      category,
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
    };
  }

  const CategoryModal = (
    <ModalHolder>
      <ModalBackground>
        <Title>Adicionar Categoria</Title>
        <SizedBox height={10}></SizedBox>
        <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
        <SizedBox height={20}></SizedBox>
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
        <SizedBox height={20}></SizedBox>
        <Row spaceBetween>
          <Button disableElevation variant="contained" color="primary">
            <ButtonText>Adicionar</ButtonText>
          </Button>
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
        <SizedBox height={20}></SizedBox>
        <Row spaceBetween>
          <Button disableElevation variant="contained" color="primary">
            <ButtonText>Adicionar</ButtonText>
          </Button>
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
        <SizedBox height={20}></SizedBox>
        <Row spaceBetween>
          <Button disableElevation variant="contained" color="primary">
            <ButtonText>Adicionar</ButtonText>
          </Button>
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
                value={category}
                onChange={(e) => setCategory(e.target?.value)}
                label="Categoria"
              >
                {getCategories()}
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
        <Button
          disableElevation
          startIcon={<Add style={{ color: Colors.MONEY }} />}
          onClick={() => setUuid(uuidv4())}
          size="large"
          variant="outlined"
          style={{ borderColor: Colors.MONEY }}
        >
          <SimpleText color={Colors.MONEY}>Produto Relacionado</SimpleText>
        </Button>
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
