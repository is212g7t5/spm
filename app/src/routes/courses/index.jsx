import Course from "src/components/course";
import SearchBar from "src/components/SearchBar";

export default function Courses() {
  return (
    <div className='w-11/12 max-w-7xl mx-auto'>
      <SearchBar title='Search Job Roles' searchBarPlaceholder='Search by title, skills...' />
      <Course />
    </div>
  );
}
