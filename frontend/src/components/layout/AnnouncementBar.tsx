import { AutoAwesome } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function AnnouncementBar() {
  return (
    <Box className="announcement-bar">
      <AutoAwesome fontSize="small" />
      <Typography variant="caption">
        Güzel şeyleri keşfet, kendine küçük bir iyilik yap.
      </Typography>
    </Box>
  );
}
