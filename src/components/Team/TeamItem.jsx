export const TeamItem = ({ image, name, lastname, role }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={`${name} ${lastname}`}
        className={"rounded-2xl border-2 w-15 h-auto"}
      />
      <p className="text-xxs italic text-center">{`${name} ${lastname}`}</p>
      <p className="text-xxs text-center">{role}</p>
    </div>
  );
};
