import { MainCategory } from "../../enums/Categories";

export type Tile = {
  image: string;
  title: string;
  url: string;
};

export type PromoCallToActionButton = {
  backgroundColor: string;
  textColor: string;
  text: string;
  url: string;
};

export type TextPromoBanner = {
  backgroundColor: string;
  textColor: string;
  text: string;
  url?: string;
};

export type StripText = {
  backgroundColor: string;
  textColor: string;
  text: string;
};

type PromoHero = {
  backgroundImage: string;
  colorTint: string;
  firstLineText: StripText;
  secondLineText: StripText;
  tiles: Array<Tile>;
  cta: PromoCallToActionButton;
  textPromoBanner: TextPromoBanner;
  category: MainCategory;
};

export default PromoHero;
