import { useState, useEffect } from "react";
import { RenderContent } from "../common/RenderContent";
import { TeamList } from "./TeamList";

export const TeamContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const response = await fetch("data/team.json");
        if (!response.ok) {
          throw new Error("Información no disponible");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <RenderContent loading={loading} error={error} data={data}>
        <TeamList data={data}/>
      </RenderContent>
    </div>
  );
};
