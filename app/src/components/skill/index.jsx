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
          <SearchBar title='Search Skills' searchBarPlaceholder='Search by name...' />
          <HRSkill />
        </>
      );
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no skills</p>;
    case "STAFF":
      return (
        <>
          <SearchBar title='Search Skills' searchBarPlaceholder='Search by name...' />
          <StaffSkill />
        </>
      );
    default:
      return <p>Please log in to view Skills</p>;
  }
}

export default Skill;
