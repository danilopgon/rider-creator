const DashboardCard = ({
  title,
  children,
  firstButton,
  secondButton,
  handleFirstButton,
  handleSecondButton,
}) => {
  return (
    <div className="card min-w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title ">{title}</h2>
        <div className="flex flex-1 flex-wrap gap-3"> {children} </div>
        <div className="card-actions justify-center my-3">
          {firstButton && (
            <button
              className="btn btn-primary-content w-full"
              onClick={handleFirstButton}
            >
              {firstButton}
            </button>
          )}
          {secondButton && (
            <button
              className="btn btn-primary-content w-full"
              onClick={handleSecondButton}
            >
              {secondButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
