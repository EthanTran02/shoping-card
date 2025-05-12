import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();
  const items = useOutletContext();
  const item = items.find((item) => item.id === parseInt(id));

  return <img src={item.image} alt="" />;
}
