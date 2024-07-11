import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "./components/Navbar";
import BillBoard from "./components/BillBoard ";
import useMovieList from "../hooks/useMovieList";
import Rowlist from "./components/Rowlist";
import Footer from "./components/Footer";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	return (
		<>
			<Navbar />
			<BillBoard />
			<Rowlist />
			<Footer />
		</>
	);
}
