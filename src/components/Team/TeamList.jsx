import { TeamItem } from "./TeamItem";

export const TeamList = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <TeamItem key={item.id} {...item}/>
      ))}
    </>
  );
};
