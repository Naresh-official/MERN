import Feed from "@/components/feed/Feed.jsx";
import Suggested from "@/components/suggested/Suggested.jsx";
import React from "react";

function Home() {
    return (
        <div className="w-full px-20 flex">
            <div className="xl:w-[70%] w-full py-20 flex justify-center">
                <Feed />
            </div>
            <div className="xl:w-[30%] py-5 hidden xl:flex">
                <Suggested />
            </div>
        </div>
    );
}

export default Home;
