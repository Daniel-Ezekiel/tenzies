const Die = ({ id, num, handleClick }) => {
  return (
    <div
      className="die"
      onClick={(e) => handleClick(e, id)}
    >
      {num}
    </div>
  );
};

export default Die;
