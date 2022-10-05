import { useUserContext } from "src/contexts/UserContext";
import StaffJob from "./staff/StaffJob";
import HRJob from "./hr/HRJob";

function Job() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "STAFF":
      return <StaffJob />;
    case "HR":
      return <HRJob/>;
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no Job Roles</p>;
    default:
      // temporary addition for development, should not render anything without permission
      return <StaffJob />;
  }
}

export default Job;
