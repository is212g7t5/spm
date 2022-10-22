import React from "react";

export default function JobBadge({ jobName, isActive }) {
    return (
        <div className={`py-2 max-h-44 ${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500"} rounded-lg shadow-md text-base text-center overflow-hidden text-ellipsis font-semibold`}>
            {jobName}
        </div>
    )
}
