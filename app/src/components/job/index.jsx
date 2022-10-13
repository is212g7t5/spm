import { useUserContext } from "src/contexts/UserContext";
import StaffJob from "./staff/StaffJob";
import HRJob from "./hr/HRJob";

function Job() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "STAFF":
    case "MANAGER":
      return <StaffJob />;
    case "HR":
      return <HRJob/>;
    default:
      // temporary addition for development, should not render anything without permission
      return <StaffJob />;
  }
}

export default Job;
