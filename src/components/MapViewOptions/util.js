import config from "./config";

export const getLayoutById = (view) => {
  return config.find((layout) => layout.view === view);
};
