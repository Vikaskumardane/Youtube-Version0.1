import React, { useContext, useEffect } from "react";

// importing the components from src
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  // importing loader and search results from context  api
  const { loading, searchResults } = useContext(Context);

  // useing the useEffect
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-row h-[calc(100vh-50px)]">
      <LeftNav />

      {/* using the leftnav in the feed section and defining the the comoponent in LeftNav Component */}
      <div className="grow w-[calc(100vh-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5">
          {!loading &&
            searchResults &&
            searchResults?.map((item) => {
              if (item?.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
