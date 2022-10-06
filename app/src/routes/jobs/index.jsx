import Job from "src/components/job";
import SearchBar from "src/components/SearchBar";

export default function Jobs() {
    return (
        <div className="w-11/12 max-w-7xl mx-auto">
            <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
            <Job />
        </div>

    )
};
