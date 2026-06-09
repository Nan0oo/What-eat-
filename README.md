# What-eat? 🌭

Minimalistička PWA za brzo odlučivanje što naručiti u fast foodu.
Tamna tema, "slot machine" animacija, haptika i offline rad.

## Objava na GitHub Pages
1. Napravi novi repozitorij (npr. `what-eat`) i uploadaj **sav sadržaj** ove mape.
2. Repo → **Settings → Pages** → *Source: Deploy from a branch* → grana `main`, mapa `/ (root)`.
3. Otvori `https://<korisnik>.github.io/what-eat/` na mobitelu.
4. **Add to Home Screen** (iOS) ili **Install** (Android/Chrome/Windows).

> Sve putanje su relativne pa radi i kad je app u podmapi (`/what-eat/`).

## Slike jela
Stavi PNG slike u mapu `img/` s točno ovim nazivima:

| Jelo          | Datoteka                |
|---------------|-------------------------|
| Pizza         | `img/pizza.png`         |
| Pomfrit       | `img/pomfrit.png`       |
| Burger        | `img/burger.png`        |
| Hot dog       | `img/hot-dog.png`       |
| Topli sendvič | `img/topli-sendvic.png` |
| Kebab         | `img/kebab.png`         |
| Ćevapi        | `img/cevapi.png`        |

Preporuka: kvadratne slike (~600×600 px). Dok ih ne dodaš, app prikazuje naziv jela kao tekst.

## Datoteke
- `index.html` — UI + logika vrtnje + haptika + registracija SW-a
- `manifest.json` — naziv, ikone, `display: fullscreen`
- `service-worker.js` — offline cache (povećaj `what-eat-v1` pri svakoj izmjeni)
- `icons/` — generirane ikone aplikacije (hot dog)
- `img/` — ovdje idu tvoje slike jela
