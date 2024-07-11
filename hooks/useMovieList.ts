import useSWR from "swr";
import fetcher from "../lib/fetcher";

// this movie list hook is used in pages/index.tsx

const useMovieList = () => {
	const { data, error, isLoading } = useSWR("/api/movie", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return {
		data,
		error,
		isLoading,
	};
};

export default useMovieList;
