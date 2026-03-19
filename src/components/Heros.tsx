import { useEffect } from "react";
import { fetchHeros } from "../apis/users";

const Heros = () => {
  useEffect(() => {
    fetchHeros().then(({ data }) => {
      console.log(data);
    });
  }, []);
  return <div>hero</div>;
};

export default Heros;
