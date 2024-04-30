const videoElement = document.getElementById('videoElement');
const recordButton = document.getElementById('recordButton');

let mediaRecorder;
let chunks = [];

// Get user media
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoElement.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            chunks = [];

            // Upload recorded video to server
            uploadVideo(blob);
        };
    })
    .catch(error => {
        console.error('Error accessing media devices:', error);
    });

// Start/Stop recording
let isRecording = false;
recordButton.addEventListener('click', () => {
    if (!isRecording) {
        mediaRecorder.start();
        recordButton.textContent = 'Stop';
    } else {
        mediaRecorder.stop();
        recordButton.textContent = 'Record';
    }
    isRecording = !isRecording;
});


// Upload video to server
function uploadVideo(blob) {
    const formData = new FormData();
    formData.append('video', blob, 'recorded_video.webm');

    fetch('/server', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Video uploaded successfully');
        } else {
            console.error('Failed to upload video');
        }
    })
    .catch(error => {
        console.error('Error uploading video:', error);
    });
}