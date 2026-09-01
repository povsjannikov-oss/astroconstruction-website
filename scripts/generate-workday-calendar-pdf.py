import json
import os
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "pdf"
NODE = os.environ.get("ASTRO_NODE", "node")
FONT_REGULAR = r"C:\Windows\Fonts\arial.ttf"
FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"

INK = colors.HexColor("#171614")
GRAPHITE = colors.HexColor("#22201c")
GOLD = colors.HexColor("#a77a2c")
GOLD_SOFT = colors.HexColor("#f0d99d")
RED = colors.HexColor("#9b2f27")
RED_SOFT = colors.HexColor("#efccc6")
WEEKEND = colors.HexColor("#e5e9ec")
GREEN = colors.HexColor("#2f6c45")
GREEN_SOFT = colors.HexColor("#dbeadf")
PAPER = colors.HexColor("#f7f7f4")
LINE = colors.HexColor("#cfd5d8")
MUTED = colors.HexColor("#5c564e")


def load_calendar_data():
    js = r"""
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('riki.js', 'utf8');
const context = {
  window: {},
  document: {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  navigator: { clipboard: { writeText: async () => {} } },
  Intl, Number, Math, Date, String, setTimeout: () => {}
};
context.window = context;
vm.createContext(context);
vm.runInContext(source, context);
process.stdout.write(JSON.stringify({
  calendars: context.AstroRiki.calendars
}));
"""
    result = subprocess.run(
        [NODE, "-e", js],
        cwd=ROOT,
        check=True,
        text=True,
        encoding="utf-8",
        capture_output=True,
    )
    return json.loads(result.stdout)["calendars"]


def register_fonts():
    pdfmetrics.registerFont(TTFont("Astro", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("AstroBold", FONT_BOLD))


def text(c, value, x, y, size=7, bold=False, color=INK):
    c.setFillColor(color)
    c.setFont("AstroBold" if bold else "Astro", size)
    c.drawString(x, y, value)


def centered(c, value, x, y, size=7, bold=False, color=INK):
    font = "AstroBold" if bold else "Astro"
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawCentredString(x, y, value)


def workday_label(count):
    return f"{count} darba diena" if count % 10 == 1 and count % 100 != 11 else f"{count} darba dienas"


def day_style(day):
    classes = set(day["classes"])
    if "day--transferred-work" in classes:
        return GREEN_SOFT, GREEN, True, "D"
    if "day--transferred-off" in classes:
        return GOLD_SOFT, colors.HexColor("#674816"), True, "P"
    if "day--holiday" in classes:
        return RED_SOFT, RED, True, "S"
    if "day--weekend" in classes:
        return WEEKEND, colors.HexColor("#2d3032"), False, ""
    return colors.white, INK, False, ""


def draw_month(c, month, x, y, w, h, year):
    c.setFillColor(colors.white)
    c.setStrokeColor(LINE)
    c.roundRect(x, y, w, h, 2, fill=1, stroke=1)
    ix, iy, iw, ih = x + 6, y + 6, w - 12, h - 12

    text(c, f'{month["name"]} {year}', ix, iy + ih - 10, 9.3, True)
    text(c, f'MSL {month["mslLabel"]}', ix + iw - 54, iy + ih - 10, 6.1, False, MUTED)
    c.setStrokeColor(GRAPHITE)
    c.setLineWidth(0.9)
    c.line(ix, iy + ih - 24, ix + iw, iy + ih - 24)
    c.setStrokeColor(GOLD)
    c.line(ix, iy + ih - 26, ix + 30, iy + ih - 26)

    grid_top = iy + ih - 39
    week_w = 13.0
    gap = 2.0
    cell_w = (iw - week_w - gap * 7) / 7
    cell_h = 13.0
    weekdays = ["P", "O", "T", "C", "P", "S", "Sv"]
    centered(c, "Nr.", ix + week_w / 2, grid_top, 5.3, True, colors.HexColor("#70695f"))
    for i, label in enumerate(weekdays):
        cx = ix + week_w + gap + i * (cell_w + gap)
        if i > 4:
            c.setFillColor(WEEKEND)
            c.roundRect(cx, grid_top - 3, cell_w, 9.2, 1.4, fill=1, stroke=0)
        centered(c, label, cx + cell_w / 2, grid_top, 5.8, True, colors.HexColor("#4a4640"))

    for row_index in range(6):
        row = month["rows"][row_index] if row_index < len(month["rows"]) else None
        cy = grid_top - 5 - ((row_index + 1) * cell_h)
        if row:
            centered(c, str(row["week"]["week"]).zfill(2), ix + week_w / 2, cy + 4.2, 5.3, True, colors.HexColor("#70695f"))
        for col in range(7):
            cx = ix + week_w + gap + col * (cell_w + gap)
            day = row["cells"][col] if row else None
            if not day:
                continue
            bg, fg, bold, marker = day_style(day)
            c.setFillColor(bg)
            c.setStrokeColor(colors.HexColor("#dbe0e3") if bg != WEEKEND else colors.HexColor("#c6ced4"))
            c.roundRect(cx, cy, cell_w, cell_h - 1, 1.6, fill=1, stroke=1)
            if "day--short" in set(day["classes"]):
                c.setFillColor(GOLD)
                c.rect(cx + 2, cy + 1.1, cell_w - 4, 1.5, fill=1, stroke=0)
            if marker:
                text(c, marker, cx + 1.8, cy + cell_h - 5.5, 4.0, True, fg)
            centered(c, str(day["day"]), cx + cell_w / 2, cy + 3.8, 7.0, bold, fg)

    summary_y = y + 11
    text(c, workday_label(month["workdays"]), ix, summary_y, 7.0, True)
    text(c, f'{month["hours"]} darba stundas', ix + 78, summary_y, 6.6, False, MUTED)


def draw_legend(c, x, y):
    items = [
        ("S svētku diena", RED_SOFT),
        ("P pārcelta brīvdiena", GOLD_SOFT),
        ("D pārcelta darba diena", GREEN_SOFT),
        ("Pirmssvētku diena", GOLD),
        ("Nedēļas nogale", WEEKEND),
        ("Nr. ISO nedēļa", colors.HexColor("#f3f2ee")),
    ]
    offset = 0
    for label, color in items:
        c.setFillColor(color)
        c.roundRect(x + offset, y - 2, 8, 8, 1.3, fill=1, stroke=0)
        text(c, label, x + offset + 11, y - 1, 6.7)
        offset += c.stringWidth(label, "Astro", 6.7) + 25


def draw_special_list(c, calendar, x, y, w):
    notes = []
    for month in calendar["months"]:
        for note in month["notes"]:
            day, month_number = note["date"][8:10], note["date"][5:7]
            notes.append(f'{day}.{month_number}. {note["label"]}')
    cols = 3
    col_w = w / cols
    row_h = 11
    rows_per_col = (len(notes) + cols - 1) // cols
    for index, note in enumerate(notes):
        col = index // rows_per_col
        row = index % rows_per_col
        text(c, note, x + col * col_w, y - row * row_h, 6.6, False, INK)


def draw_msl_table(c, calendar, x, y, w):
    col_w = w / 4
    row_h = 13
    for index, month in enumerate(calendar["months"]):
        col = index % 4
        row = index // 4
        cx = x + col * col_w
        cy = y - row * row_h
        text(c, month["name"], cx, cy, 7.0, True)
        text(c, f'{month["hours"]} h', cx + 58, cy, 6.7, False, MUTED)
        text(c, f'MSL {month["mslLabel"]}', cx + 92, cy, 6.7, False, INK)


def build_pdf(year, calendar):
    output = OUT_DIR / f"darba-dienu-kalendars-{year}.pdf"
    output.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output), pagesize=landscape(A4))
    c.setTitle(f"{year}. gada darba dienu kalendārs Latvijā")
    c.setAuthor("ASTRO CONSTRUCTION")
    has_transfers = any(
        "day--transferred-off" in day["classes"] or "day--transferred-work" in day["classes"]
        for month in calendar["months"]
        for day in month["cells"]
    )
    has_msl = all(month["mslLabel"] != "nav apstiprināta" for month in calendar["months"])
    subject_parts = ["darba dienas", "darba stundas", "svētku dienas"]
    if has_msl:
        subject_parts.append("MSL")
    if has_transfers:
        subject_parts.append("pārceltās darba dienas")
    c.setSubject(f"{', '.join(subject_parts)} {year}. gadā Latvijā")
    width, height = landscape(A4)

    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    text(c, "ASTRO CONSTRUCTION", 18, height - 18, 8.0, True, GOLD)
    text(c, f"{year}. gada darba dienu kalendārs", 18, height - 39, 17.5, True, INK)
    text(c, f'{calendar["totalWorkdays"]} darba dienas · {calendar["totalHours"]} darba stundas', 18, height - 53, 8.8)

    margin_x, gap = 18, 7
    month_w = (width - margin_x * 2 - gap * 3) / 4
    month_h = 153
    top = height - 66
    for index, month in enumerate(calendar["months"]):
        row = index // 4
        col = index % 4
        x = margin_x + col * (month_w + gap)
        y = top - (row + 1) * month_h - row * 5
        draw_month(c, month, x, y, month_w, month_h, year)

    draw_legend(c, 18, 39)
    source_line = "Avoti: Likumi.lv svētku dienu likums; Darba likuma 135. pants; LM MSL aprēķina informācija."
    if has_transfers:
        source_line = "Avoti: Likumi.lv svētku dienu likums; MK rīkojums par darba dienu pārcelšanu; Darba likuma 135. pants; LM MSL aprēķina tabulas."
    elif not has_msl:
        source_line = "Avoti: Likumi.lv svētku dienu likums; MK protokols 26-TA-1023; Darba likuma 135. pants; LM MSL aprēķina informācija."
    text(c, source_line, 18, 16, 6.4, False, colors.HexColor("#4b4640"))
    c.showPage()

    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    text(c, "ASTRO CONSTRUCTION", 18, height - 18, 8.0, True, GOLD)
    text(c, f"{year}. gada īpašās dienas un aprēķina piezīmes", 18, height - 39, 16.0, True, INK)
    c.setStrokeColor(GRAPHITE)
    c.setLineWidth(1)
    c.line(18, height - 52, width - 18, height - 52)
    c.setStrokeColor(GOLD)
    c.line(18, height - 55, 82, height - 55)
    special_heading = "Svētku, pārceltās un pirmssvētku dienas" if has_transfers else "Svētku un pirmssvētku dienas"
    text(c, special_heading, 18, height - 78, 10.5, True)
    draw_special_list(c, calendar, 18, height - 96, width - 36)
    text(c, "Mēnešu MSL un darba stundas", 18, 206, 10.5, True)
    draw_msl_table(c, calendar, 18, 187, width - 36)
    text(c, "MSL", 18, 95, 10.5, True)
    if has_msl:
        text(c, "Minimālā stundas tarifa likme darbiniekiem, kuri strādā 5 darba dienu nedēļu un 40 stundas nedēļā.", 18, 78, 8.0)
        text(c, "Mēneša MSL vērtības PDF un tīmekļa kalendārā tiek ņemtas no tās pašas kopīgās ASTRO kalendāra datu struktūras.", 18, 64, 8.0, False, MUTED)
    else:
        text(c, f"{year}. gada oficiālā minimālā mēneša darba alga šim aprēķinam vēl nav apstiprināta kopīgajā datu kopā.", 18, 78, 8.0)
        text(c, "PDF saglabā to pašu statusu, ko rāda tīmekļa kalendārs: MSL nav apstiprināta.", 18, 64, 8.0, False, MUTED)
    text(c, "Darba stundas: 8 stundas darba dienā, pirmssvētku darba dienās - 7 stundas.", 18, 50, 8.0, False, MUTED)
    text(
        c,
        source_line,
        18,
        20,
        6.5,
        False,
        colors.HexColor("#4b4640"),
    )
    c.save()
    return output


def main():
    register_fonts()
    calendars = load_calendar_data()
    requested_year = os.environ.get("ASTRO_PDF_YEAR")
    years = [requested_year] if requested_year else sorted(calendars)
    outputs = [build_pdf(int(year), calendars[str(year)]) for year in years]
    for output in outputs:
        print(output)


if __name__ == "__main__":
    main()
