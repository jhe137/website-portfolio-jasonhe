import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Head from "next/head";
import Script from "next/script";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return (<><Head><script defer src="https://analytics.us.umami.is/script.js" data-website-id="d3729649-d653-4aee-a8b3-4e32c719d772"/></Head>
  <SliceZone slices={page.data.slices} components={components} /></>);
}


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

