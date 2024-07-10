import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
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

	function truncate(str: string | undefined, maxLength: number) {
		if (!str) return ""; 

		const trimmedString = str.trim();
		if (trimmedString.length <= maxLength) return trimmedString;

		// Truncate and add ellipsis
		return trimmedString.substring(0, maxLength - 1).trim() + "...";
	}


	return (
		<div className="relative h-[56.25vw]">
			{movie?.backdrop_path && (
				<img
					className="absolute w-full h-[56.25vw] object-cover brightness-75"
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={movie?.title || movie?.name || movie?.original_name}
				/>
			)}

			<div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
				<p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-1xl">
					{movie?.title || movie?.name || movie?.original_name}
				</p>
				<p className="text-white text-xs md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
					{truncate(movie?.overview, 150)}
				</p>
				<div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
					<button className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
						<FaRegCirclePlay className="mr-1" />
						play
					</button>
					<button className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
						<IoIosInformationCircleOutline className="mr-1"/>
						My List
					</button>
				</div>
			</div>
		</div>
	);
};

export default BillBoard;
