import Skill from "../../components/skill";
import SearchBar from "../../components/SearchBar";

export default function Skills() {
    return (
      <div className="w-11/12 max-w-7xl mx-auto">
        <SearchBar title="Search Skills" searchBarPlaceholder="Search by name, jobs..." />
          <Skill />
      </div>
    )
};
