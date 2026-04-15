import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import {
  Chip,
  Grid,
  Link,
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

interface SciencePageProps {
  content: SiteContent;
}

export function SciencePage({ content }: SciencePageProps) {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <PageIntro
        eyebrow={t("nav.science")}
        title={content.hero.title}
        description={content.science.intro}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionCard title={t("science.orcid")} description={content.science.orcid}>
            <Stack spacing={2}>
              <Typography color="text.secondary">{content.science.phdNote}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {content.science.researchAreas.map((area) => (
                  <Chip key={area} label={area} />
                ))}
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SectionCard title={t("science.phdTrack")} description={t("common.dissertation")}>
            <Stack spacing={1}>
              <Typography variant="h6">{content.science.dissertation.title}</Typography>
              <Typography color="text.secondary">
                {content.science.dissertation.status}
              </Typography>
              <Typography>
                {content.science.dissertation.specialtyCode} - {content.science.dissertation.specialtyName}
              </Typography>
              <Typography color="text.secondary">
                {content.science.dissertation.branchCode} - {content.science.dissertation.branchName}
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionCard title={t("common.researchAreas")}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {content.science.researchAreas.map((area) => (
                <Chip key={area} label={area} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SectionCard title={t("common.timeline")}>
            <TimelineList items={content.science.milestones} />
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title={t("science.selectedWork")} description={t("common.publications")}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.science.publications.map((publication) => (
              <TableRow key={`${publication.year}-${publication.title}`}>
                <TableCell>{publication.year}</TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>{publication.title}</Typography>
                </TableCell>
                <TableCell>{publication.venue}</TableCell>
                <TableCell>
                  <Link href={publication.link} target="_blank" rel="noreferrer">
                    <LaunchRoundedIcon fontSize="small" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
