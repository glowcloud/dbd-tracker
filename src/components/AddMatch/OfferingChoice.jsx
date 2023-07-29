import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";

const OfferingChoice = ({ side, setStep, setData, data }) => {
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    const getOfferings = async () => {
      const { data } = await supabase
        .from("offerings")
        .select(
          `id,
            name,
            image, 
            rarity: rarity_id ( id, created_at, name )
            `
        )
        .in("side", ["both", side]);
      setOfferings(data);
    };

    getOfferings();
  }, [side]);

  return <div>OfferingChoice</div>;
};

export default OfferingChoice;
