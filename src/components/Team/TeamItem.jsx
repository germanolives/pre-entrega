import { ImgWithSkeleton } from "../common/ImgWithSkeleton";

export const TeamItem = ({image, name, lastname, role}) => {
  return (
    <div className="flex flex-col items-center">
      <ImgWithSkeleton
        image={image}
        className={"rounded-2xl border-2"}
        size={"w-15 h-auto"}
        title={`${name} ${lastname}`}
      />
      <p className="text-xxs italic text-center">{`${name} ${lastname}`}</p>
      <p className="text-xxs text-center">{role}</p>
    </div>
  );
};
