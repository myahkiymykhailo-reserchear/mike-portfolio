import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { Milestone } from "../types/content";

interface TimelineListProps {
  items: Milestone[];
}

export function TimelineList({ items }: TimelineListProps) {
  return (
    <Stack divider={<Divider flexItem sx={{ borderColor: "rgba(15,76,92,0.08)" }} />}>
      {items.map((item) => (
        <Box key={`${item.period}-${item.title}`} sx={{ py: 1.5 }}>
          <Typography variant="overline" color="secondary.main">
            {item.period}
          </Typography>
          <Typography variant="h6">{item.title}</Typography>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{item.organization}</Typography>
          <Typography color="text.secondary">{item.description}</Typography>
        </Box>
      ))}
    </Stack>
  );
}
