import React from "react";
import Row from "./Row";
import requests from "../utils/request";

const Rowlist = () => {
	return (
		<div className="overflow-y-auto p-5 no-scrollbar">
			<Row
				title="Netflix Originals"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow={true}
			/>
			<Row
				title="Trending Now"
				fetchUrl={requests.fetchTrending}
				isLargeRow={false} />
			<Row
				title="Top Rated"
				fetchUrl={requests.fetchTopRated}
				isLargeRow={false}
			/>
			<Row
				title="Action Movie"
				fetchUrl={requests.fetchActionMovies}
				isLargeRow={false}
			/>
			<Row
				title="Comedy Movies"
				fetchUrl={requests.fetchComedyMovies}
				isLargeRow={false}
			/>
			<Row
				title="Horror Movies"
				fetchUrl={requests.fetchHorrorMovies}
				isLargeRow={false}
			/>
			<Row
				title="Romance"
				fetchUrl={requests.fetchRomanceMovies}
				isLargeRow={true}
			/>
		</div>
	);
};

export default Rowlist;
