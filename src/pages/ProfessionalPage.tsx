import {
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { PageIntro } from "../components/PageIntro";
import { SectionCard } from "../components/SectionCard";
import type { SiteContent } from "../types/content";

interface ProfessionalPageProps {
  content: SiteContent;
}

export function ProfessionalPage({ content }: ProfessionalPageProps) {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <PageIntro
        eyebrow={t("nav.professional")}
        title={content.profile.fullName}
        description={content.professional.intro}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard title={t("professional.careerJourney")}>
            <Stack spacing={2}>
              {content.professional.experiences.map((experience) => (
                <Stack
                  key={`${experience.company}-${experience.period}`}
                  spacing={1}
                  sx={{
                    p: 2.25,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.68)",
                  }}
                >
                  <Typography variant="overline" color="secondary.main">
                    {experience.period}
                  </Typography>
                  <Typography variant="h5">{experience.position}</Typography>
                  <Typography sx={{ fontWeight: 700 }}>{experience.company}</Typography>
                  <Typography color="text.secondary">{experience.summary}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {experience.achievements.map((achievement) => (
                      <Chip key={achievement} label={achievement} />
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard title={t("common.skills")}>
            <Stack spacing={2}>
              {content.professional.skills.map((group) => (
                <Stack key={group.category} spacing={1}>
                  <Typography variant="h6">{group.category}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {group.items.map((item) => (
                      <Chip key={item} label={item} color="secondary" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  );
}
