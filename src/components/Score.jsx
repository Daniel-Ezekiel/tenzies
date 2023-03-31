const Score = ({ className, title, value }) => {
  return (
    <div className={className}>
      <p className='score--title'>
        {title}: <span className='score--value'>{value}</span>
      </p>
    </div>
  );
};

export default Score;
