import React from "react";

function SuggestedProfile() {
    return (
        <div className="flex items-center w-[300px] justify-between">
            <div className="flex items-center gap-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    alt=""
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h2 className="text-sm font-semibold">mrwhosetheboss</h2>
                    <p className="text-xs text-zinc-500">Arun Maini</p>
                </div>
            </div>
            <div>
                <span className="text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer">Follow</span>
            </div>
        </div>
    );
}

export default SuggestedProfile;
