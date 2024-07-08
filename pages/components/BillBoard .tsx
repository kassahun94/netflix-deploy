/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import requests from "../utils/request";

interface Movie {
	title?: string;
	name?: string;
	original_name?: string;
	overview?: string;
	backdrop_path?: string;
}

const BillBoard: React.FC = () => {
	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		const fetchNetflixOriginals = async () => {
			try {
				const response = await axios.get(requests.fetchNetflixOriginals);
				const randomIndex = Math.floor(
					Math.random() * response.data.results.length
				);
				setMovie(response.data.results[randomIndex]);
			} catch (error) {
				console.error("Error fetching Netflix originals:", error);
			}
		};

		fetchNetflixOriginals();
	}, []);

	return (
		<div className="relative h-[56.25vw]">
			{movie?.backdrop_path && (
				<img
					className="absolute w-full h-[56.25vw] object-cover brightness-75"
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={movie?.title || movie?.name || movie?.original_name}
				/>
			)}
			{/* <video
				className="w-full h-[56.25vw] object-cover brightness-75"
				autoPlay
				muted
				loop
				poster={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
			>
				<source
					src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
					type="video/mp4"
				/>
			</video> */}

			<div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
				<p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-1xl">
					{movie?.title || movie?.name || movie?.original_name}
				</p>
				<p className="text-white text-xs md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
					{movie?.overview}
				</p>
				<div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
					<button className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
						<AiOutlineInfoCircle className="mr-1" />
						More
					</button>
				</div>
			</div>
		</div>
	);
};

export default BillBoard;
