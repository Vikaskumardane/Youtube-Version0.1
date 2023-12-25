import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom';

import {fetchDataFromApi} from "../utils/api";
import { Context } from '../context/contextApi';
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {

  //creating the hooks which are required
  const [result,setResult] = useState();
  const {searchQuery} = useParams();
  const {setLoading} = useContext(Context);

  //using the use Effect hook
  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  },[searchQuery]);

  // de structing the searrch resutls

  const fetchSearchResults=()=>{
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res)=>{
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  };


  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      {/* left navigation bar after the search resutls */}
      <LeftNav /> 

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) =>{
            if(item?.type !== "video") return false;

            let video = item.video;
            return(
              <SearchResultVideoCard 
              key={video.videoId}
              video={video}/>
            );
          })}
        </div>
      </div>
      
    </div>
  )
}

export default SearchResult