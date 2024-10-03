import React from "react";
import SuggestedProfile from "./SuggestedProfile.jsx";

function Suggested() {
    return (
        <div className="flex flex-col gap-4">
            <SuggestedProfile />
            <p className="text-xs font-semibold text-zinc-500">Suggested for you</p>
            <SuggestedProfile />
            <SuggestedProfile />
            <SuggestedProfile />
            <SuggestedProfile />
            <SuggestedProfile />
        </div>
    );
}

export default Suggested;
