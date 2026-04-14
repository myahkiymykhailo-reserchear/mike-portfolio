import { Box, Paper, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionCard({
  title,
  description,
  action,
  children,
}: SectionCardProps) {
  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 3 },
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,250,244,0.72))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          {description ? (
            <Typography color="text.secondary">{description}</Typography>
          ) : null}
        </Box>
        {action}
      </Box>
      {children}
    </Paper>
  );
}
