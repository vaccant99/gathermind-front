import { useParams } from "react-router-dom";

export default function Mystudy() {
  const { id } = useParams();

  return <h1>id :{id}</h1>;
}
