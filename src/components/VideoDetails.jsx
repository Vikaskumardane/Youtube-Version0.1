import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {BsFillCheckCircleFill, AiOutlineLike} from "react-icons/bs"
import { abbreviateNumber } from 'js-abbreviation-number'

import {fetchDataFromApi} from "../utils/api"
import{Context} from "../context/contextApi"
import  SuggestionVideoCard  from './SuggestionVideoCard'


const VideoDetails = () => {
  const [video,setVideo] = useState();
  const [relatedVideo,setRelatedVideo] = useState();
  const {id} = useParams(); //this param willl catch the video id which is opened 
  const {setLoading} = useContext(Context);

  /**********THIS SECTION IS FOR THE WRITING THE LOGIC WHICH WILL BRING THE VIDEO DATA AND FROM THE API */ 

  useEffect(()=>{
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails(); //for getting clicked video details 
    fetchRelatedVideos(); //for getting clicked videos related suggestion videos details 
  },[id]);

  const fetchVideoDetails = ()=>{
    setLoading(true); //just to show the loading animation
    fetchDataFromApi(`video/details/?id=${id}`).then((res) =>
      {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });

  };



  /********* */

  /********THIS SECTION IS FOR MAKING THE API CALL TO GET SUGGESTED VIDEOS DETAILS FOR LEFTSIDE */

  const fetchRelatedVideos = ()=>{
    setLoading(true); //just to show the loading animation
    fetchDataFromApi(`video/related-content/?id=${id}`).then((res) =>
      {
      console.log(res);
      setRelatedVideo(res);
      setLoading(false);
    });
  }
  /******** */

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">

                    </div>
                    </div>
                    </div>
                    </div>
  )
}

export default VideoDetails