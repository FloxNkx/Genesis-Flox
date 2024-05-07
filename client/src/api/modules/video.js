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
  }) => {
    try {
      const response = await privateClient.post(
        videoEndpoints.add,
        {
          file: video,
        }
      );

      return { response };
    } catch (err) { console.log(err) }
  },
};

export default videoApi;