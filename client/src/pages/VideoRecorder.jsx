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
						{status !== 'recording' && <button onClick={startRecording}>Start Recording</button>}
						{status === 'recording' && <button onClick={() => {
							stopRecording();
							stopRecordingVideo(mediaBlobUrl)
						}}>Stop Recording</button>}
					</div>
				)}
			/>
		</div>
	);
};

export default VideoRecorder;
