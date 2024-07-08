// @types/movie-trailer/index.d.ts
declare module 'movie-trailer' {
  export default function movieTrailer(
    movieName: string,
    options?: any,
    callback?: (error: Error | null, url: string) => void
  ): Promise<string>;
}