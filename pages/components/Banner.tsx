import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import requests from "../utils/request";

const Banner = () => {
	interface Movie {
		backdrop_path: string;
		title: string;
		name: string;
		original_name: string;
		overview: string;
	}

	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const request = await axios.get(requests.fetchNetflixOriginals);
				console.log("Netflix originals request:", request);
				const randomIndex = Math.floor(
					Math.random() * request.data.results.length
				);
				console.log("Random index:", randomIndex);
				setMovie(request.data.results[randomIndex]);
			} catch (error) {
				console.error("Error fetching Netflix originals:", error);
			}
		})();
	}, []);

	function truncate(str: string | undefined, n: number) {
		console.log("Truncate input:", str, n);
		return str?.length !== undefined && str.length > n
			? str.substring(0, n - 1) + "..."
			: str || "";
	}

	console.log("Movie:", movie);

	return (
		<div
			className="banner relative mt-10vh sm:mt-12vh md:mt-16vh lg:mt-20vh xl:mt-24vh h-80vh sm:h-85vh md:h-90vh lg:h-95vh xl:h-100vh mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 text-white"
			style={{
				backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
				backgroundSize: "cover",
			}}
		>
			<div className="banner_content ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 pt-40 sm:pt-52 md:pt-64 lg:pt-72 xl:pt-80">
				<h1 className="banner_title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-1">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<div className="banner_description max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-2 text-sm sm:text-base md:text-lg leading-normal">
					{truncate(movie?.overview, 150)}
				</div>
				<div className="banner_button flex items-center mt-4">
					<button className="play flex items-center justify-center text-white bg-opacity-50 bg-gray-700 hover:bg-black transition duration-200 text-base sm:text-lg md:text-xl font-bold rounded-md px-4 py-2 mr-4">
						Play
					</button>
					<button className="banner_button text-base sm:text-lg md:text-xl font-bold rounded-md px-4 py-2">
						My List
					</button>
				</div>
			</div>
			<div className="banner_fadeBottom absolute bottom-0 left-0 w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 bg-gradient-to-t from-transparent via-rgba(37, 37, 37, 0.91) to-black" />
		</div>
	);
};

export default Banner;
