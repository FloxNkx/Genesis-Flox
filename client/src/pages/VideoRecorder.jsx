import videoApi from "../api/modules/video";
import { ReactMediaRecorder } from "react-media-recorder";

import "./style.css";

const VideoRecorder = () => {
	const stopRecordingVideo = async (blob) => {
		await videoApi.add({ video: blob, title: "test" });
	};

	const sendVideo = async (files) => {
		const file = files[0];
		const formData = new FormData();
		formData.append('file', file)
		await videoApi.add({ video: files[0], title: "test" });
	}

	return (
		<div className="video-controls">
			<ReactMediaRecorder
				audio
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
			
			<input type="file" name="upload" onChange={(e) => sendVideo(e.target.files)} />
		</div>
	);
};

export default VideoRecorder;
