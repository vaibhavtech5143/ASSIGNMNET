import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import OverlayForm from './OverlayForm';

const LandingPage = () => {
    const [rtspUrl, setRtspUrl] = useState('');
    const [showPlayer, setShowPlayer] = useState(false);

    const handlePlay = () => {
        setShowPlayer(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!showPlayer ? (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold mb-4">Welcome to Livestream App</h1>
                    <input 
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 w-full max-w-lg"
                        type="text" 
                        value={rtspUrl} 
                        onChange={(e) => setRtspUrl(e.target.value)} 
                        placeholder="Enter RTSP URL" 
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={handlePlay}
                    >
                        Play Livestream
                    </button>
                </div>
            ) : (
                <div>
                    <VideoPlayer rtspUrl={rtspUrl} />
                    {/* <OverlayForm /> */}
                </div>
            )}

            <h2>Demo Links</h2><br/>
            <a>https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8</a>
          
        </div>
    );
}

export default LandingPage;
