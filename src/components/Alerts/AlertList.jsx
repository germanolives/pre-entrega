import { AlertItem } from "./AlertItem";

export const AlertList = ({ data }) => {
  return (
    <>
      {data.map((alert) => (
        <AlertItem key={alert.id} item={alert} />
      ))}
    </>
  );
};
