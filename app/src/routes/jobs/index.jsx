import Job from "src/components/job";
import SearchBar from "src/components/SearchBar";

export default function Jobs() {
    return (
        <>
            <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
            <Job />
        </>

    )
};
