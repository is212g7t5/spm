import { useUserContext } from "src/contexts/UserContext";
import SearchBar from "src/components/SearchBar";
import StaffSkill from "./staff/StaffSkill";
import HRSkill from "./hr/HRSkill";

function Skill() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "HR":
      return (
        <>
          <SearchBar title="Search Skills" searchBarPlaceholder="Search by name..." />
          <HRSkill />
        </>
      );
    case "STAFF":
    case "MANAGER":
    default:
      return (
        <>
          <SearchBar title="Search Skills" searchBarPlaceholder="Search by name..." />
          <StaffSkill />
        </>
      );
  }
}

export default Skill;
