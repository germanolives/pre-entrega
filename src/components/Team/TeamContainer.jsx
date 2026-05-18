import { TeamList } from "./TeamList";
import { tiendaTeam } from "../../data/team/team";


export const TeamContainer = () => {
  return (
    <div className="flex flex-row gap-3">
       <TeamList data={tiendaTeam}/>
    </div>
  );
};