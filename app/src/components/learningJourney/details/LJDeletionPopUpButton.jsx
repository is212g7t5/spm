import React, { useState } from "react";
import LJDeletionPopUp from "./LJDeletionPopUp";

function LJDeletionPopUpButton({ljId}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => {setIsOpen(!isOpen)}

    return (
        <div>
            <button type="button" className="text-callToActionColor1" onClick={onClick}>delete?</button>
            {isOpen && <LJDeletionPopUp ljId={ljId} />}
        </div>
    );
};


export default LJDeletionPopUpButton;
