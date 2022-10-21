import { useUserContext } from "src/contexts/UserContext";
import StaffSkill from "./staff/StaffSkill";
import HRSkill from "./hr/HRSkill";

function Skill() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "STAFF":
      return <StaffSkill />;
    case "HR":
      return <HRSkill />;
    case "MANAGER":
      return <StaffSkill />;
    default:
      // temporary addition for development, should not render anything without permission
      return <StaffSkill />;
  }
}

export default Skill;
