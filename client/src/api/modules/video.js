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
      const response = await privateClient.post(
        videoEndpoints.add,
        {
          video,
          title
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
};

export default videoApi;