import videoApi from "../api/modules/video";
import { ReactMediaRecorder } from "react-media-recorder";

import "./style.css";

const VideoRecorder = () => {
	const stopRecordingVideo = async (blob) => {
		const videoBlob = await fetch(blob).then((r) => r.blob());
		const videoFile = new File([videoBlob], `video-${new Date().getMilliseconds()}`, { type: 'video/mp4' });
		
		await videoApi.add({ video: videoFile });
	};

	const sendVideo = async (files) => {
		await videoApi.add({ video: files[0], title: "test" });
	}

	return (
		<div className="video-controls">
			<ReactMediaRecorder
				video
				render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
					<div>
						{status !== 'recording' && <button onClick={startRecording}>Start Recording</button>}
						{status === 'recording' && <button onClick={() => {
							stopRecordingVideo(mediaBlobUrl)
							stopRecording();
						}}>Stop Recording</button>}
					</div>
				)}
			/>
			
			{/* <input type="file" name="upload" onChange={(e) => sendVideo(e.target.files)} /> */}
		</div>
	);
};

export default VideoRecorder;
