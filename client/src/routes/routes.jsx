import VideoRecorder from "../pages/VideoRecorder";

export const routesGen = {
  home: "/",
};

const routes = [
  {
    index: true,
    element: <VideoRecorder />,
    state: "home"
  }
];

export default routes;