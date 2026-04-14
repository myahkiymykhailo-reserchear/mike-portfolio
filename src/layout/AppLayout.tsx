import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Locale } from "../types/content";

interface AppLayoutProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function AppLayout({ locale, onLocaleChange }: AppLayoutProps) {
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home"), icon: <PersonRoundedIcon fontSize="small" /> },
    {
      to: "/science",
      label: t("nav.science"),
      icon: <MenuBookRoundedIcon fontSize="small" />,
    },
    {
      to: "/teaching",
      label: t("nav.teaching"),
      icon: <SchoolRoundedIcon fontSize="small" />,
    },
    {
      to: "/professional",
      label: t("nav.professional"),
      icon: <WorkRoundedIcon fontSize="small" />,
    },
    {
      to: "/personal",
      label: t("nav.personal"),
      icon: <PersonRoundedIcon fontSize="small" />,
    },
    {
      to: "/admin",
      label: t("nav.admin"),
      icon: <SettingsRoundedIcon fontSize="small" />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(209,123,73,0.28), transparent 30%), radial-gradient(circle at top right, rgba(15,76,92,0.22), transparent 28%), linear-gradient(180deg, #f5efe7 0%, #f9f5ef 45%, #efe5d5 100%)",
      }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(15,76,92,0.08)",
          backdropFilter: "blur(18px)",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap", gap: 1.5, py: 1 }}>
          <Box sx={{ mr: "auto" }}>
            <Typography variant="h6">{t("siteTitle")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("siteSubtitle")}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                startIcon={link.icon}
                sx={{
                  color: "text.primary",
                  "&.active": {
                    bgcolor: "rgba(15,76,92,0.1)",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant={locale === "en" ? "contained" : "outlined"}
              onClick={() => onLocaleChange("en")}
            >
              EN
            </Button>
            <Button
              variant={locale === "uk" ? "contained" : "outlined"}
              onClick={() => onLocaleChange("uk")}
            >
              UA
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 3, md: 5 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}
