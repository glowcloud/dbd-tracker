import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";

const KillerAddons = ({ killer, setStep, setData, data }) => {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    const getAddons = async () => {
      const { data } = await supabase
        .from("killer_addons")
        .select(
          `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name )
              `
        )
        .eq("killer_id", killer.id);
      setAddons(data);
    };

    getAddons();
  }, [killer]);

  return <div>KillerAddons</div>;
};

export default KillerAddons;
