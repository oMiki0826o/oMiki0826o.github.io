"""
File: release_smoke.py
Modification: 2026-10-11 — V6.1 純標準函式庫原始碼與文件結構驗證。

這是發行前的靜態健檢，不取代 npm test / TypeScript / Playwright。
"""

from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
LOCALES = ("zh-TW", "en", "ja")


class ReleaseSmokeTests(unittest.TestCase):
    def source(self, name: str) -> str:
        return (ROOT / name).read_text(encoding="utf-8")

    def test_original_heading_id_is_used_in_article(self):
        loader = self.source("content/notes-loader.ts")
        page = self.source("app/[locale]/notes/[slug]/page.tsx")
        self.assertIn("block.id", loader)
        self.assertIn("ids:", loader)
        self.assertIn("section.ids[locale]", page)

    def test_document_checker_uses_parser(self):
        checker = self.source("scripts/check-sm.mjs")
        self.assertIn("parseDocument", checker)
        self.assertNotIn("matchAll(/^#2", checker)

    def test_module_styles_exist(self):
        for name in ("site", "lab", "structmark"):
            self.assertTrue((ROOT / f"app/styles/{name}.css").is_file())
            self.assertIn(
                f"'./styles/{name}.css'", self.source("app/layout.tsx")
            )

    def test_playground_keyboard_and_debouncing(self):
        component = self.source("components/lab/structmark-playground.tsx")
        self.assertIn("setTimeout", component)
        self.assertIn("onKeyDown", component)

    def test_snake_does_not_capture_keyboard_globally(self):
        component = self.source("components/lab/snake-game.tsx")
        self.assertNotIn("window.addEventListener('keydown'", component)
        self.assertIn("onKeyDown", component)

    def test_local_photo_limits(self):
        component = self.source("components/lab/astro-compare.tsx")
        self.assertIn("MAX_IMAGE_BYTES", component)
        self.assertIn('role="alert"', component)

    def test_note_source_encodings_and_complete_locales(self):
        directory = ROOT / "content/notes"
        article_folders = sorted(p for p in directory.iterdir() if p.is_dir())
        self.assertGreaterEqual(len(article_folders), 1)
        for folder in article_folders:
            self.assertTrue((folder / "meta.ts").is_file())
            for locale in LOCALES:
                data = (folder / f"{locale}.sm").read_bytes()
                self.assertNotIn(b"\r", data)
                self.assertIn("#2", data.decode("utf-8-sig"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
