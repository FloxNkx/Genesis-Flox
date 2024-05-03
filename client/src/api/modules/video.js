import privateClient from "../client/private.client";

const videoEndpoints = {
  list: "main/video",
  add: "main/video",
};

const videoApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(videoEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    video,
    title
  }) => {
    try {
      console.log(video)
      const audioBlob = await fetch(video).then((r) => r.blob());
      const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
      const formData = new FormData(); // preparing to send to the server
    // preparing to send to the server

    console.log(audioFile)
      formData.append('file', audioFile); 

      console.log(formData.get('file'))
      const response = await privateClient.post(
        videoEndpoints.add,
        {
          video: formData,
          title
        }
      );

      return { response };
    } catch (err) { console.log(err) }
  },
};

export default videoApi;