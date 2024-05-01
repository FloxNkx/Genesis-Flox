import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const mimeType = 'video/webm; codecs="opus,vp8"';

const supabase = createClient(
	"https://xuvxtryvruraqoeqhscv.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dnh0cnl2cnVyYXFvZXFoc2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjM0MTIsImV4cCI6MjAzMDEzOTQxMn0.OwoZGPVK9iTiJ5-SxBTXwaWYsc4BoLAZAj4dhvF_wmo"
);

const VideoRecorder = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const liveVideoFeed = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [recordedVideo, setRecordedVideo] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);

	useEffect(() => {
		getCameraPermission()
	}, [])

	const getCameraPermission = async () => {
		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
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
		setPermission(false);
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = async () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			const { error } = await supabase.storage
				.from("videos")
				.upload(uuidv4() + ".mp4", videoBlob);

			if (error) {
				console.log(error);
				alert("Error uploading file to Supabase");
			}

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
				<button onClick={stopRecording} type="button" class="recording">
					Stop Recording
				</button>
			) : null}

			{/* <div className="video-player">
				{!recordedVideo ? (
					<video ref={liveVideoFeed} autoPlay className="live-player"></video>
				) : null}
			</div> */}
		</div>
	);
};

export default VideoRecorder;
