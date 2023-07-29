import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";

const SurvivorItem = ({ setStep, setData, data }) => {
  const [items, setItems] = useState([]);
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await supabase.from("items").select(
        `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
      );
      setItems(data);
    };

    const getAddons = async () => {
      const { data } = await supabase.from("item_addons").select(
        `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
      );
      setAddons(data);
    };

    getItems();
    getAddons();
  }, []);

  return <div>SurvivorItem</div>;
};

export default SurvivorItem;
