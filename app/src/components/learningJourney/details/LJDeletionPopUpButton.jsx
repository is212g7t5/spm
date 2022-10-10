import React, { useState } from "react";
import LJDeletionPopUp from "./LJDeletionPopUp";

function LJDeletionPopUpButton({LJId}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => {setIsOpen(!isOpen)}

    return (
        <div>
            <a href="/#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100" onClick={onClick}>
                Delete
            </a>
            {isOpen && <LJDeletionPopUp LJId={LJId} />}
        </div>
    );
};


export default LJDeletionPopUpButton;
