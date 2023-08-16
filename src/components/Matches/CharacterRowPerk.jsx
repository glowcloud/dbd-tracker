import ImageSlot from "../ImageSlot";

const CharacterRowPerk = ({ perk }) => {
  return (
    <ImageSlot
      data={perk}
      containerSx={{
        width: 75,
        height: 75,
        transform: "rotate(45deg)",
        border: "1px solid white",
        m: 5,
      }}
      imageSx={{
        width: 75,
        height: 75,
        objectFit: "contain",
        transform: "rotate(-45deg)",
      }}
    />
  );
};

export default CharacterRowPerk;
