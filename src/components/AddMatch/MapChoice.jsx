import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";

const MapChoice = ({ setStep, setData, data }) => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const getMaps = async () => {
      const { data } = await supabase.from("maps").select(
        `id,
        name, 
        image,
        realm: realm_id ( id, name )
        `
      );
      setMaps(data);
    };

    getMaps();
  }, []);

  return <div>MapChoice</div>;
};

export default MapChoice;
