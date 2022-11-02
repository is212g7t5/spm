import { useUserContext } from "src/contexts/UserContext";
import StaffCourse from "./staff/StaffCourse";
import HRCourse from "./hr/HRCourse";

function Course() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "STAFF":
      return <StaffCourse />;
    case "HR":
      return <HRCourse />;
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no courses</p>;
    default:
      // temporary addition for development, should not render anything without permission
      return <StaffCourse />;
  }
}

export default Course;
