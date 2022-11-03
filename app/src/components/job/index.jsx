import { useUserContext } from "src/contexts/UserContext";
import SearchBar from "src/components/SearchBar";
import StaffJob from "./staff/StaffJob";
import HRJob from "./hr/HRJob";

function Job() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "HR":
      return (
        <>
          <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
          <HRJob/>
        </>
      );
    case "STAFF":
    case "MANAGER":
    default:
      // temporary addition for development, should not render anything without permission
      return (
      <>
        <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
        <StaffJob />
      </>
      );
  }
}

export default Job;
