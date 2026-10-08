# Shared Inter Latin delivery

`InterVariable-latin.woff2` is a 406-character Latin/Latvian subset of the
existing `InterVariable.woff2` (Inter 4.001), including the BIS page's ≠ symbol.
`astro-optimization.css` defines the composite `Inter Latin` family for pages
with the `astro-font-latin` body class. Their preload uses the subset URL.
The second face loads the original font only for other supported characters,
including combining marks and other scripts entered in forms. The primary face
retains `font-display: optional`; the on-demand fallback uses `swap` so typed
non-Latin characters adopt Inter when the asset arrives instead of remaining
in a system font after the optional loading window expires.

The original `Inter` declaration and font asset remain unchanged for other pages.
Both variable axes, outlines, metrics, hinting and all applicable OpenType features are
preserved, including tabular numerals used by native ordered-list markers.
Copyright and license are in `Inter-LICENSE.txt` and the font name metadata.

Regenerate with fontTools 4.60.1 plus WOFF2 tooling (development tooling,
not a website dependency), from the repository root:

```powershell
python -m fontTools.subset assets/fonts/InterVariable.woff2 --output-file=assets/fonts/InterVariable-latin.woff2 --flavor=woff2 --unicodes=U+0000-017F,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2197,U+2212,U+2260,U+2713,U+FEFF --layout-features=* --name-IDs=* --name-languages=* --name-legacy --no-recalc-timestamp
```

The fallback unicode-range in `astro-optimization.css` is the original font cmap
minus the subset ranges. Keep them disjoint and regenerate if coverage changes.
Predeclare each page's existing `astro-page-home`/`astro-page-inner` state in HTML
when opting in; adding it after first paint changes responsive hero geometry.
