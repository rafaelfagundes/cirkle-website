// import { Helmet } from "react-helmet";
import Head from "next/head";
import React from "react";
import Image from "../../modules/image/Image";

export enum MetaDataType {
  WEBSITE = "website",
  PRODUCT = "product",
}

interface MetaDataProps {
  quote: string;
  title: string;
  image: string;
  description: string;
  hashtag: string;
  url: string;
  type: MetaDataType;
  price?: number;
  moreImages?: Array<Image>;
}

function MetaData(props: MetaDataProps): JSX.Element {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="csrf_token" content="" />
      <meta property="type" content={props.type} />
      <meta property="url" content={props.url} />
      <meta property="title" content={props.title} />
      <meta property="quote" content={props.quote} />
      <meta name="description" content={props.description} />
      <meta property="image" content={props.image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={props.type} />
      <meta property="og:title" content={props.title} />
      <meta property="og:quote" content={props.quote} />
      <meta property="og:hashtag" content={props.hashtag} />
      <meta property="og:image" content={props.image} />
      {props.moreImages.map((item) => (
        <meta property="og:image" content={item.url} key={item.url} />
      ))}
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={props.url} />
      <meta property="og:site_name" content="Cirkle" />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
      {props.type === MetaDataType.PRODUCT && (
        <>
          <meta property="product:price:amount" content={String(props.price)} />
          <meta property="product:price:currency" content="BRL" />
        </>
      )}
    </Head>
  );
}

export default MetaData;
