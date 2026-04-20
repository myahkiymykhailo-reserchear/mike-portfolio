import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { PageIntro } from "../components/PageIntro";
import { SectionCard } from "../components/SectionCard";
import { TimelineList } from "../components/TimelineList";
import type { SiteContent } from "../types/content";

interface TeachingPageProps {
  content: SiteContent;
}

export function TeachingPage({ content }: TeachingPageProps) {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <PageIntro
        eyebrow={t("nav.teaching")}
        title={content.profile.fullName}
        description={content.teaching.intro}
      />
      <Grid container spacing={3}>
        {content.teaching.highlights.map((item) => (
          <Grid key={item.label} size={{ xs: 12, md: 4 }}>
            <SectionCard title={item.value} description={item.label}>
              <Typography color="text.secondary">{content.profile.role}</Typography>
            </SectionCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <SectionCard title={t("common.disciplines")}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Faculty</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.teaching.disciplines.map((discipline) => (
                  <TableRow key={discipline.name}>
                    <TableCell>{discipline.name}</TableCell>
                    <TableCell>{discipline.level}</TableCell>
                    <TableCell>{discipline.years}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SectionCard title={t("teaching.teachingStory")}>
            <TimelineList items={content.teaching.milestones} />
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  );
}
