import "./App.css";
import { useState } from "react";

import VideoRecorder from "./components/VideoRecorder";
import AudioRecorder from "./components/AudioRecorder";

const App = () => {
	let [recordOption, setRecordOption] = useState("video");

	const toggleRecordOption = (type) => {
		return () => {
			setRecordOption(type);
		};
	};

	return (
		<div>
			<div className="button-flex">
				{/* <button onClick={toggleRecordOption("video")}>Record Video</button> */}
				{/* <button onClick={toggleRecordOption("audio")}>Record Audio</button> */}
			</div>
			<div>
				{recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
			</div>
		</div>
	);
};

export default App;