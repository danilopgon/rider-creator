const RoleCardContainer = ({ children }) => {
  return (
    <div className="flex flex-col xl:flex-row xl:flex-wrap gap-5 justify-center items-center xl:items-stretch xl:justify-center ">
      {children}
    </div>
  );
};

export default RoleCardContainer;
