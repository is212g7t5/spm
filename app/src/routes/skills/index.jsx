import Skill from "../../components/skill";
import SearchBar from "../../components/SearchBar";

export default function Skills() {
    return (
        <>
            <SearchBar title="Search Skills" searchBarPlaceholder="Search by name, jobs..." />
            <Skill />
        </>

    )
};
