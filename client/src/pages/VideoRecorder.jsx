import videoApi from "../api/modules/video";
import { ReactMediaRecorder } from "react-media-recorder";

import "./style.css";

const VideoRecorder = () => {
	let interval = null

	const onSendVideo = async (blob) => {
		try {
			const videoBlob = await fetch(blob).then((r) => r.blob());
			const videoFile = new File([videoBlob], "video.mp4", {
				type: "video/mp4",
			});

			await videoApi.add({ video: videoFile });
		} catch (err) {
			console.log(err);
		}
	};

	const onStartRecording = async () => {
		try {
			interval = setInterval(() => {
				onSendVideo()
			}, 10000)
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="video-controls">
			<ReactMediaRecorder
				video
				render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
					<div>
						{status !== "recording" && (
							<button
								onClick={() => {
									onStartRecording();
									startRecording();
								}}
							>
								Start Recording
							</button>
						)}
						{status === "recording" && (
							<button
								onClick={() => {
									onSendVideo(mediaBlobUrl);
									clearInterval(interval)
									stopRecording();
								}}
								class="recording"
							>
								Stop Recording
							</button>
						)}
					</div>
				)}
			/>
		</div>
	);
};

export default VideoRecorder;
