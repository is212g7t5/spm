import React, { useState } from "react";
import { deleteLJWithLJId } from "src/api/learningJourney";

function LJDeletionPopUp({LJId}) {
    // Hide the popup when click on cancel
    const [isOpen, setIsOpen] = useState(true);
    const onClick = () => {setIsOpen(!isOpen)}

    if(!isOpen){
        return null
    }
    
    const DeleteLJButtonClick = (e) => {
        e.stopPropagation();
        const res = deleteLJWithLJId(LJId);
        const onClick = setIsOpen(!isOpen);
        console.log(res);
    };

    return (
        <div id="deletePopUp" className="flex justify-center fixed inset-0 h-screen items-center z-10 bg-dimBackgroundColor bg-opacity-60 p-5">
            <div className="flex-initial">
                <div className="container shadow-2xl shadow-black-300 px-7 py-5 grid rounded-lg bg-white">
                    <div className="grid-row py-3 text-3xl font-bold">Warning</div>

                    <div className="grid-row py-3 text-lg">Are you sure you want to delete this learning journey?</div>
                    
                    <div className="grid-row py-3 flex justify-end">
                        <button type="button" className="text-textColor bg-primaryColor hover:bg-secondaryColor font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={DeleteLJButtonClick}>
                            Confirm
                        </button>
                        <button type="button" className="text-textColor bg-callToActionColor1 hover:bg-callToActionColor2 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={onClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
);
}

export default LJDeletionPopUp;
