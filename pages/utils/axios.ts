import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
});

export default instance;


// https://api.themoviedb.org/3/discover/movie?api_key=b030922ed5fdbaf16f5e14ec76406cc9&with_genres=35