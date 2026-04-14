import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { SectionCard } from "../components/SectionCard";
import { getStoredContent, resetContent, saveContent } from "../lib/content";
import type { Locale, SiteContent } from "../types/content";

interface AdminPageProps {
  locale: Locale;
  content: SiteContent;
  onContentChange: (locale: Locale, nextContent: SiteContent) => void;
}

export function AdminPage({
  locale,
  content,
  onContentChange,
}: AdminPageProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editorValue, setEditorValue] = useState(() =>
    JSON.stringify(content, null, 2),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditorValue(JSON.stringify(content, null, 2));
  }, [content]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(editorValue) as SiteContent;
      saveContent(locale, parsed);
      onContentChange(locale, getStoredContent(locale));
      setMessage(t("admin.saved"));
      setError(null);
    } catch {
      setError(t("admin.importError"));
      setMessage(null);
    }
  };

  const handleReset = () => {
    resetContent(locale);
    const nextContent = getStoredContent(locale);
    setEditorValue(JSON.stringify(nextContent, null, 2));
    onContentChange(locale, nextContent);
    setMessage(t("admin.resetDone"));
    setError(null);
  };

  const handleExport = () => {
    const blob = new Blob([editorValue], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `content.${locale}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as SiteContent;
      setEditorValue(JSON.stringify(parsed, null, 2));
      saveContent(locale, parsed);
      onContentChange(locale, parsed);
      setMessage(t("admin.importDone"));
      setError(null);
    } catch {
      setError(t("admin.importError"));
      setMessage(null);
    }
  };

  return (
    <Stack spacing={4}>
      <SectionCard title={t("admin.title")} description={t("admin.description")}>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700 }}>
            {t("admin.activeLocale")}: {locale.toUpperCase()}
          </Typography>
          {message ? <Alert severity="success">{message}</Alert> : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField
            label={t("admin.editorLabel")}
            value={editorValue}
            onChange={(event) => setEditorValue(event.target.value)}
            multiline
            minRows={24}
            fullWidth
          />
          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            <Button startIcon={<SaveRoundedIcon />} variant="contained" onClick={handleSave}>
              {t("common.save")}
            </Button>
            <Button startIcon={<RestartAltRoundedIcon />} onClick={handleReset}>
              {t("common.reset")}
            </Button>
            <Button startIcon={<DownloadRoundedIcon />} onClick={handleExport}>
              {t("common.export")}
            </Button>
            <Button
              startIcon={<UploadRoundedIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              {t("common.import")}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="application/json"
              onChange={handleImport}
            />
          </Stack>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
