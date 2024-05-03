import { useState, useRef, useEffect } from "react";
import videoApi from '../api/modules/video'

import './style.css'

const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = () => {
	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);

	useEffect(() => {
		getCameraPermission()
	}, [])

	const getCameraPermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: true,
					video: false,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);


				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");

		const media = new MediaRecorder(stream, { mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localVideoChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = async () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			console.log(videoBlob,videoUrl)
			await videoApi.add({ video: videoUrl, title: 'test'  });

			setVideoChunks([]);
		};
	};

	return (
		<div className="video-controls">
			{recordingStatus === "inactive" ? (
				<button onClick={startRecording} type="button">
					Start Recording
				</button>
			) : null}
			{recordingStatus === "recording" ? (
				<button onClick={stopRecording} type="button" className="recording">
					Stop Recording
				</button>
			) : null}
		</div>
	);
};

export default VideoRecorder;
