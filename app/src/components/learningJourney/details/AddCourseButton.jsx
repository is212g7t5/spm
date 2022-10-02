import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddCourseButton() {
    return (
        <button type="button" className="inline-flex items-center place-content-center outline-gray-400 outline-dashed outline-2 outline-offset-0 max-w-xs max-h-32 bg-transparent rounded-lg shadow-md hover:underline underline-offset-2 decoration-gray-400">
            <PlusIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-500">Add Course</span>
        </button>
    )
}
