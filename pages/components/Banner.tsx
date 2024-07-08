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
				console.log(request);
				setMovie(
					request.data.results[
						Math.floor(Math.random() * request.data.results.length)
					]
				);
			} catch (error) {
				console.error("Error fetching Netflix originals:", error);
			}
		})();
	}, []);
	

function truncate(str: string | undefined, n: number) {
	return str?.length !== undefined && str.length > n ? str.substring(0, n - 1) + "..." : str || "";
}

	return (
		<div
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
			</div>
			<div className="banner--fadeBottom" />
		</div>
	);
};

export default Banner;
