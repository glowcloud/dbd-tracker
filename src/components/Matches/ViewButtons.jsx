import { Button } from "@mui/material";

const ViewButtons = ({
  showStats,
  setShowStats,
  side,
  setSide,
  setCurrentPage,
  setCharacterChoice,
}) => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          my: 2,
          mx: 1,
        }}
        onClick={() => {
          setShowStats((prevShow) => !prevShow);
        }}
      >
        {showStats ? "Show matches" : "Show statistics"}
      </Button>

      <Button
        variant="outlined"
        sx={{
          my: 2,
          mx: 1,
        }}
        onClick={() => {
          setSide((prevSide) =>
            prevSide === "killer" ? "survivor" : "killer"
          );
          setShowStats(false);
          setCurrentPage(0);
          setCharacterChoice("all");
        }}
      >
        {side === "killer" ? "Survivor matches" : "Killer matches"}
      </Button>
    </>
  );
};

export default ViewButtons;
