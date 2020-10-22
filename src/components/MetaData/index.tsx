// import { Helmet } from "react-helmet";
import Head from "next/head";
import React from "react";

interface MetaDataProps {
  quote: string;
  title: string;
  image: string;
  description: string;
  hashtag: string;
  url: string;
}

function MetaData(props: MetaDataProps): JSX.Element {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={props.url} />
      <meta property="title" content={props.title} />
      <meta property="quote" content={props.quote} />
      <meta name="description" content={props.description} />
      <meta property="image" content={props.image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:quote" content={props.quote} />
      <meta property="og:hashtag" content={props.hashtag} />
      <meta property="og:image" content={props.image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={props.url} />
      <meta property="og:site_name" content="Cirkle" />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </Head>
  );
}

export default MetaData;
