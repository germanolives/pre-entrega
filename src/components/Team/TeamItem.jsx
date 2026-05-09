import { ImgWithSkeleton } from "../common/ImgWithSkeleton";

export const TeamItem = ({image, name, lastname, role}) => {
  return (
    <div className="container">
      <ImgWithSkeleton
        image={image}
        className={"rounded-2xl border-2"}
        size={"w-15 h-auto"}
        title={`${name} ${lastname}`}
      />
      <p className="text-xs italic">{`${name} ${lastname}`}</p>
      <p className="text-xxs">{role}</p>
    </div>
  );
};
