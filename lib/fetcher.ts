import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res: { data: any; }) => res.data);

export default fetcher;


