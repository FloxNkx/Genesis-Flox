import { useState, useRef, useEffect } from "react";
import videoApi from "../api/modules/video";
import { ReactMediaRecorder } from "react-media-recorder";

import "./style.css";

const VideoRecorder = () => {
	const stopRecordingVideo = async (blob) => {
		await videoApi.add({ video: blob, title: "test" });
	};

	return (
		<div className="video-controls">
			<ReactMediaRecorder
				video
				render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
					<div>
						<p>{status}</p>
						<button onClick={startRecording}>Start Recording</button>
						{status === 'recording' && <button onClick={() => stopRecordingVideo(mediaBlobUrl)}>Stop Recording</button>}
						<video src={mediaBlobUrl} controls autoPlay loop />
					</div>
				)}
			/>
		</div>
	);
};

export default VideoRecorder;
