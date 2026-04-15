import "@fontsource-variable/manrope";
import "@fontsource/playfair-display";
import {
  CircularProgress,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { getStoredContent } from "./lib/content";
import i18n from "./lib/i18n";
import { theme } from "./lib/theme";
import type { Locale, SiteContent } from "./types/content";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const SciencePage = lazy(() =>
  import("./pages/SciencePage").then((module) => ({
    default: module.SciencePage,
  })),
);
const TeachingPage = lazy(() =>
  import("./pages/TeachingPage").then((module) => ({
    default: module.TeachingPage,
  })),
);
const ProfessionalPage = lazy(() =>
  import("./pages/ProfessionalPage").then((module) => ({
    default: module.ProfessionalPage,
  })),
);
const PersonalPage = lazy(() =>
  import("./pages/PersonalPage").then((module) => ({
    default: module.PersonalPage,
  })),
);
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((module) => ({ default: module.AdminPage })),
);

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [contentMap, setContentMap] = useState<Record<Locale, SiteContent>>({
    en: getStoredContent("en"),
    ua: getStoredContent("ua"),
  });

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale]);

  const handleContentChange = (targetLocale: Locale, nextContent: SiteContent) => {
    setContentMap((current) => ({
      ...current,
      [targetLocale]: nextContent,
    }));
  };

  const activeContent = contentMap[locale];
  const fallback = (
    <Stack alignItems="center" sx={{ py: 12 }}>
      <CircularProgress color="secondary" />
    </Stack>
  );

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Suspense fallback={fallback}>
            <Routes>
              <Route
                element={
                  <AppLayout locale={locale} onLocaleChange={setLocale} />
                }
              >
                <Route index element={<HomePage content={activeContent} />} />
                <Route path="/science" element={<SciencePage content={activeContent} />} />
                <Route path="/teaching" element={<TeachingPage content={activeContent} />} />
                <Route
                  path="/professional"
                  element={<ProfessionalPage content={activeContent} />}
                />
                <Route path="/personal" element={<PersonalPage content={activeContent} />} />
                <Route
                  path="/admin"
                  element={
                    <AdminPage
                      key={locale}
                      locale={locale}
                      content={activeContent}
                      onContentChange={handleContentChange}
                    />
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
