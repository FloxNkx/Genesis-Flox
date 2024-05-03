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
      const videoFile = new File([video], `${new Date().getMilliseconds()}.mp4`, { type: 'video/mp4' });
      const formData = new FormData(); // preparing to send to the server
  
      formData.append('file', videoFile); 
      const response = await privateClient.post(
        videoEndpoints.add,
        {
          video: formData,
          title
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
};

export default videoApi;