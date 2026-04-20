import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionCard } from "../components/SectionCard";
import type { SiteContent } from "../types/content";

interface HomePageProps {
  content: SiteContent;
}

export function HomePage({ content }: HomePageProps) {
  const { t } = useTranslation();

  const pageCards = [
    {
      title: t("nav.science"),
      text: content.science.intro,
      to: "/science",
    },
    {
      title: t("nav.teaching"),
      text: content.teaching.intro,
      to: "/teaching",
    },
    {
      title: t("nav.professional"),
      text: content.professional.intro,
      to: "/professional",
    },
    {
      title: t("nav.personal"),
      text: content.personal.intro,
      to: "/personal",
    },
  ];

  return (
    <Stack spacing={4}>
      <SectionCard title={content.hero.greeting} description={content.hero.subtitle}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "4.5rem" } }}>
                {content.hero.title}
              </Typography>
              <Typography sx={{ maxWidth: 640, color: "text.secondary", fontSize: "1.05rem" }}>
                {content.hero.description}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {content.profile.links.map((link) => (
                  <Chip
                    key={link.label}
                    component={Link}
                    clickable
                    label={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              {content.hero.stats.map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    background: "rgba(15,76,92,0.08)",
                  }}
                >
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </SectionCard>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12 }}>
          <SectionCard title={t("common.overview")} description={content.profile.role}>
            <Stack spacing={2}>
              <Typography>{content.profile.summary}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {content.profile.degrees.map((degree) => (
                  <Chip
                    key={`${degree.title}-${degree.period}`}
                    label={`${degree.title} • ${degree.period}`}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>
        {/* <Grid size={{ xs: 12, md: 5 }}>
          <SectionCard title={t("home.spotlight")} description={t("home.adminNote")}>
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                {content.science.milestones[0]?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.teaching.milestones[0]?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.professional.experiences[0]?.position}
              </Typography>
              <Button component={RouterLink} to="/admin" endIcon={<ArrowForwardRoundedIcon />}>
                {t("nav.admin")}
              </Button>
            </Stack>
          </SectionCard>
        </Grid> */}
      </Grid>

      <SectionCard title={t("home.pagesTitle")} description={t("home.pagesDescription")}>
        <Grid container spacing={3}>
          {pageCards.map((page) => (
            <Grid key={page.to} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.65)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography variant="h5">{page.title}</Typography>
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                  {page.text}
                </Typography>
                <Button
                  component={RouterLink}
                  to={page.to}
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  {page.title}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Stack>
  );
}
