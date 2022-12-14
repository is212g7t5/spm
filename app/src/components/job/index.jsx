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
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no Jobs</p>;
    case "STAFF":
      return (
      <>
        <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
        <StaffJob />
      </>
      );
    default:
      return <p>Please log in to view Jobs</p>;
  }
}

export default Job;
