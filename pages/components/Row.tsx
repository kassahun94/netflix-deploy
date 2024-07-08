/* eslint-disable @next/next/no-img-element */
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

interface RowProps {
	title: string;
	fetchUrl: string;
	isLargeRow: boolean;
}

interface Movie {
	id: number;
	name: string;
	title: string;
	original_name: string;
	poster_path: string;
	backdrop_path: string;
}

const Row: React.FC<RowProps> = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [trailerUrl, setTrailerUrl] = useState<string>("");

	const base_url = "https://image.tmdb.org/t/p/original/";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(fetchUrl);
				setMovies(response.data.results);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie: Movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
				.then((url: string) => {
					console.log("Trailer URL:", url); 
					const urlParams = new URLSearchParams(new URL(url).search);
					const videoId = urlParams.get("v");
					console.log("Video ID:", videoId); 
					setTrailerUrl(videoId || "");
				})
				.catch((error: Error) => {
					console.error("Error finding trailer:", error);
				});
		}
	};

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<div className="ml-5 text-white">
			<h1>{title}</h1>
			<div
				className="flex overflow-x-scroll p-5"
				style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
			>
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
						className={`w-full object-contain transition-transform duration-450 mr-2 ${
							isLargeRow
								? "max-h-64 hover:scale-110"
								: "max-h-24 hover:scale-105"
						}`}
						style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
					/>
				))}
			</div>
			<div className="p-10">
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</div>
		</div>
	);
};

export default Row;
