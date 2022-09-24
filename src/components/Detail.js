import { useParams } from "react-router-dom";
import { useLocation } from "react-router";

function Detail() {
  const { state } = useLocation();
  // const item = location.state.data;
  // const { id } = useParams();

  //   async function getMovie() {
  //     const response = await fetch(
  //       `https:yts.mx/api/v2/movie_details.json?movie_id=${id}`
  //     );
  //     const json = await response.json();
  //     console.log(json);
  //   }
  //   useEffect(() => {
  //     getMovie();
  //   }, []);

  console.log(state);
  return <h1>Detail</h1>;
}
export default Detail;
