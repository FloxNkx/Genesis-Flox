import videoApi from "../api/modules/video";
import { ReactMediaRecorder } from "react-media-recorder";

import "./style.css";

const VideoRecorder = () => {
	const stopRecordingVideo = async (blob) => {
		const videoBlob = await fetch(blob).then((r) => r.blob());
		const videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' });
		
		await videoApi.add({ video: videoFile });
	};

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
						}} class="recording">Stop Recording</button>}
					</div>
				)}
			/>
		</div>
	);
};

export default VideoRecorder;
