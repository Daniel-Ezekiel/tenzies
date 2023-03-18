const Die = ({ id, num, isHeld, handleClick }) => {
  return (
    <div
      className={`die ${isHeld && "held"}`}
      onClick={(e) => handleClick(e, id)}
    >
      {num}
    </div>
  );
};

export default Die;
