# Cafe Craaft — NFC Menu Demo

A mobile-first NFC landing page and digital menu for a fictional café. Built as a sales demo for cafés and restaurants. All business details, menu items, reviews and links are **sample content**.

## Pages
- `index.html`: the page a guest sees after tapping the NFC card, with five buttons: Menu, Google Reviews, Instagram, Directions and Call.
- `menu.html`: the full site, with the menu, featured drink, reviews, Instagram, hours and contact details.

## Customize
Edit **`config.js`**. It holds everything you need to replace:
- `links`: the five landing destinations (`MENU_URL`, `GOOGLE_REVIEWS_URL`, `INSTAGRAM_URL`, `MAPS_URL`, `CONTACT_URL`). If you leave a link empty, the page uses a demo fallback and labels the button "Demo".
- The business name, contact details, hours, menu, featured item, reviews and Instagram images.
- `isDemo: false` removes the sample labels once the real content is in.

## Run locally
No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8096
```
