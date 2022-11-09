import { useUserContext } from "src/contexts/UserContext";
import SearchBar from "src/components/SearchBar";
import StaffCourse from "./staff/StaffCourse";
import HRCourse from "./hr/HRCourse";

function Course() {
  const { currentUserType } = useUserContext();

  switch (currentUserType) {
    case "HR":
      return (
        <>
          <SearchBar title='Search Courses' searchBarPlaceholder='Search by name, ID...' />
          <HRCourse />
        </>
      );
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no courses</p>;
    case "STAFF":
      return (
        <>
          <SearchBar title='Search Courses' searchBarPlaceholder='Search by name, ID...' />
          <StaffCourse />
        </>
      );
    default:
      return <p>Please log in to view courses</p>;
  }
}

export default Course;
