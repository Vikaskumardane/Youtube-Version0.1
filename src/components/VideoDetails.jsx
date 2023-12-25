import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {BsFillCheckCircleFill} from "react-icons/bs"
import { AiOutlineLike} from "react-icons/ai"

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
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) =>
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
                      <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${id}`}
                        controls
                        playing={true}
                        height="100%"
                        width="100%"
                        style={{backgroundColor: "#000000"}}
                      />
                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2 pb-2">
                      {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                      <div className="flex">
                        <div className="flex items-start">
                          <div className="flex h-11 w-11 rounded-full overflow-hidden">
                            <img src={video?.author?.avatar[0].url} alt="channel avatar" />
                          </div>
                        </div>
                        <div className="flex flex-col ml-3">
                          <div className="text-white text-md font-semibold flex items-center">
                          {video?.author?.title}
                            {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                          </div>
                          <div className="text-white/[0.7] text-sm">
                            {video?.author?.stats?.subscribersText}
                          </div>
                        </div>
                      </div>
                      <div className="flex text-white mt-4 md:mt-0">
                        <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                          <AiOutlineLike className="text-xl text-white mr-2" />
                                <span>{`${abbreviateNumber(video?.stats?.likes,2)} Likes`}
                                  </span> 

                        </div>
                        <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                        <span>{`${abbreviateNumber(video?.stats?.views,2)} Views`}
                                  </span>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                      {relatedVideo?.contents?.map((item,index)=>{
                        if(item?.type!=="video") return false;
                        return(
                          <SuggestionVideoCard key={index}
                          video={item?.video}  
                          />
                        )
                      })}
                    </div>
                    </div>
                    </div>
  )
}

export default VideoDetails