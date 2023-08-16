import ImageSlot from "../ImageSlot";

const CharacterRowSlot = ({ data, slotLength }) => {
  return (
    <ImageSlot
      data={data}
      containerSx={{
        width: slotLength,
        height: slotLength,
        border: "1px solid white",
        m: 2,
      }}
      imageSx={{
        width: slotLength,
        height: slotLength,
        objectFit: "contain",
      }}
    />
  );
};

export default CharacterRowSlot;
