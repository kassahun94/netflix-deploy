import React from "react";
import Row from "./Row";
import requests from "../../lib/request";

const Rowlist = () => {
	return (
		<div className="overflow-y-auto p-5 no-scrollbar">
			<div className=" sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Row
					title="Netflix Originals"
					fetchUrl={requests.fetchNetflixOriginals}
					isLargeRow={true}
				/>
				<Row
					title="Trending Now"
					fetchUrl={requests.fetchTrending}
					isLargeRow={false}
				/>
				<Row
					title="Top Rated"
					fetchUrl={requests.fetchTopRated}
					isLargeRow={false}
				/>
				<Row
					title="Action Movies"
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
					title="Romance Movies"
					fetchUrl={requests.fetchRomanceMovies}
					isLargeRow={false}
				/>
			</div>
		</div>
	);
};

export default Rowlist;
