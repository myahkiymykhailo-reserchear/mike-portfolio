import { Box, Chip, Stack, Typography } from "@mui/material";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Chip
        label={eyebrow}
        color="secondary"
        sx={{ mb: 1.5, fontWeight: 700 }}
      />
      <Stack spacing={1.25} maxWidth={760}>
        <Typography variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.2rem" } }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1.05rem" }}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}
