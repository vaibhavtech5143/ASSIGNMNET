import { useState, useRef } from 'react';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute, FaPlay, FaPause, FaExpand } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ rtspUrl }) => {
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const playerRef = useRef(null);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = (e) => {
        setPlaying(true);
        playerRef.current.seekTo(parseFloat(e.target.value) / 100, 'fraction');
    };

    const handleProgress = (progress) => {
        setPlayed(progress.played * 100);
    };

    const handlePlaybackRateChange = (e) => {
        setPlaybackRate(parseFloat(e.target.value));
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setMuted(false); // Unmute if volume is adjusted
    };

    const handleMuteToggle = () => {
        setMuted(!muted);
        if (!muted) {
            // If unmuting, set volume to previous volume
            playerRef.current.setVolume(volume);
        }
    };

    const handleFullScreen = () => {
        const player = playerRef.current.getInternalPlayer();
        player.requestFullscreen();
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Livestream Player</h2>
            <div className="relative">
                <ReactPlayer
                    ref={playerRef}
                    url={rtspUrl}
                    playing={playing}
                    controls={false} // Disable default controls
                    playbackRate={playbackRate}
                    
                    volume={volume}
                    muted={muted}
                    width="100%"
                    height="450px"
                    onProgress={handleProgress}
                />
                <div className="absolute bottom-0 left-0 w-full bg-black opacity-75 p-4 flex justify-between items-center">
                    {/* Custom controls */}
                    <button
                        onClick={handlePlayPause}
                        className="text-white bg-transparent border-none font-semibold text-xl"
                    >
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={played}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        className="w-3/4 bg-transparent"
                        style={{ zIndex: 1 }}
                    />
                    <label className="text-white flex items-center opacity-75">
                        Speed:
                        <select
                            value={playbackRate}
                            onChange={handlePlaybackRateChange}
                            className="ml-2 bg-transparent border-none text-white"
                        >
                            <option className='bg-black color-white' value={0.5}>0.5x</option>
                            <option className='bg-black color-white' value={1}>1x</option>
                            <option className='bg-black color-white' value={1.5}>1.5x</option>
                            <option className='bg-black color-white' value={2}>2x</option>
                        </select>
                    </label>
                    <div className="flex items-center">
                        <button className="text-white" onClick={handleMuteToggle}>
                            {muted ? <FaVolumeMute /> : volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={muted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 bg-slate-500"
                        />
                    </div>
                    <button className="text-white" onClick={handleFullScreen}>
                        <FaExpand />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
