declare module "beerq" {
  export interface BeerQuoteItem {
    quote: string;
    author: string;
  }

  export interface BeerQuoteApi {
    getLanguagesList(): string[];
    getAuthorList(): string[];
    getAllQuotes(): BeerQuoteItem[];
    getRandomQuotes(numberOfQuotes: number): BeerQuoteItem[];
    getQuotesFromIndices(indices: number[]): BeerQuoteItem[];
    getQuotesFromAuthor(author: string): BeerQuoteItem[];
    getRandomQuote(): BeerQuoteItem;
    getQuoteFromIndex(index: number): BeerQuoteItem;
    getRandomQuoteFromAuthor(author: string): BeerQuoteItem;
  }

  export function BeerQuote(language?: string): BeerQuoteApi;
}
