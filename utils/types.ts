export type RecentlyViewedTitles = string[]

export type Title = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type OmdbQueryResponseType = {
  Search: Title[]
  totalResults: string
  Response: string
  Error?: string
}
