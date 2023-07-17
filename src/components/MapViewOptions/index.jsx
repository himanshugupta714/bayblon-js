import IconButton from "@mui/material/IconButton";

import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";

import config from "./config";

import { getLayoutById } from "./util";
import { TITLE_VS_STYLES } from "./constant";

function MapViewOptions({ setMapStyle }) {
  const onClickHandler = (id) => () => {
    const selectedLayout = getLayoutById(id);
    if (selectedLayout) {
      const view = selectedLayout.view;
      const mapStyles = TITLE_VS_STYLES[view];

      if (!mapStyles) {
        console.log("No mapStyles found for view: ", view);
        return;
      }

      setMapStyle(mapStyles);
    }
  };

  return (
    <Box>
      {config.map((view) => (
        <Tooltip key={view.view} title={view.view}>
          <IconButton onClick={onClickHandler(view.view)}>
            {view.element}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}

export default MapViewOptions;
