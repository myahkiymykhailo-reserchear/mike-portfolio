import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { PageIntro } from "../components/PageIntro";
import { SectionCard } from "../components/SectionCard";
import type { SiteContent } from "../types/content";

interface PersonalPageProps {
  content: SiteContent;
}

export function PersonalPage({ content }: PersonalPageProps) {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <PageIntro
        eyebrow={t("personal.lifeOutside")}
        title={content.profile.fullName}
        description={content.personal.intro}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SectionCard title={t("common.hobbies")}>
            <Grid container spacing={2}>
              {content.personal.hobbies.map((hobby) => (
                <Grid key={hobby.title} size={{ xs: 12, md: 4 }}>
                  <Stack
                    spacing={1}
                    sx={{
                      p: 2.25,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.7)",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6">{hobby.title}</Typography>
                    <Typography color="text.secondary">{hobby.description}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <SectionCard title={t("common.interestMap")}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={content.personal.metrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" />
                <Radar
                  dataKey="score"
                  stroke="#0f4c5c"
                  fill="#d17b49"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  );
}
