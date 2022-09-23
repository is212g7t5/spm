import Job from "../../components/job";
import SearchBar from "../../components/SearchBar";

export default function Jobs() {
    return (
        <>
            <SearchBar title="Search Job Roles" searchBarPlaceholder="Search by title, skills..." />
            <Job />
        </>

    )
};
