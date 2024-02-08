import  { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

export const Rtsp = () => {
  const [rtspUrl, setRtspUrl] = useState(""); // State to store the RTSP URL
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  useEffect(() => {
    // This useEffect hook is to ensure the React Player is properly controlled
    if (!playing) {
      // Stop the RTSP feed if player is paused
      stopRTSPFeed();
    }
  }, [playing]);

  const httpRequest = (url) => {
    axios.get(`http://127.0.0.1:3002/stream?rtsp=${url}`);
  };

  const startRTSPFeed = () => {
    httpRequest(rtspUrl);
    handlePlay(); // Start playing the RTSP feed
  };

  const stopRTSPFeed = () => {
    httpRequest("stop");
    handlePause(); // Pause the RTSP feed
  };

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter RTSP URL"
          value={rtspUrl}
          onChange={(e) => setRtspUrl(e.target.value)}
        />
      </div>
      <ReactPlayer className=" border-gray-200"
        url={`ws://127.0.0.1:9999`}
        playing={playing}
        controls={false}
        width="250px"
        height="250px"
      />
      <div className="mt-4">
        <button
          onClick={startRTSPFeed}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Start RTSP Feed
        </button>
        <button
          onClick={stopRTSPFeed}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Stop RTSP Feed
        </button>
      </div>
    </div>
  );
};
