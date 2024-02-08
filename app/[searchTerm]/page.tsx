import React from "react";
import getWikiResults from "@/lib/getWikiResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const displayTerm = searchTerm.replaceAll("%20", " ");

  if (!data?.query?.pages) {
    return {
      title: `Results for ${displayTerm} not found.`,
    };
  }

  return {
    title: `Results for ${displayTerm}`,
    description: `Search result for ${displayTerm}`,
  };
}

export default async function SearchResult({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((res) => {
          return <Item key={res.pageid} result={res} />;
        })
      ) : (
        <h2 className="pt-6 text-xl font-bold text-red-500 grid place-content-center">{`Results for ${searchTerm} not found. ☹`}</h2>
      )}
    </main>
  );

  return content;
}
