# Audi Chandigarh Quotation Creator

A simple static web app for creating Audi Chandigarh vehicle quotations. It uses plain HTML, CSS, and JavaScript with browser `localStorage` for temporary data storage.

## How to Run

Open the project folder in VS Code:

```text
audi-quotation-app
```

Recommended:

1. Install the VS Code Live Server extension.
2. Right-click `index.html`.
3. Select `Open with Live Server`.

You can also open `index.html` directly in a browser.

## Temporary Login

```text
Username: admin
Password: 1234
```

## Included Features

- Login screen before dashboard access
- Create quotation form
- Edit car pricing form
- Add or update saved car pricing by model name
- Saved cars list
- Car model dropdown loaded from the April 2026 price list data
- Auto-filled quotation pricing from selected car
- Manual discount percentage field that stays empty after selecting a car model
- Auto-calculated total amount
- A4-style printable quotation page
- Save as PDF / Print button using browser print
- Print CSS so only the quotation page prints
- Responsive dashboard layout
- Data stored in browser `localStorage`

## Price List Mapping

The default car data is loaded from `PRICE LIST 2026.pdf`.

- `Cost` uses `Price`
- `Insurance` uses `Insurance`
- `TCS` uses `TCS`
- `RTO` uses `CHD Reg`
- `Misc` uses `Logistics`

## Pending

- Real backend storage
- Google Sheets data sync
- Google Apps Script API integration
- Better user management
- Quotation number generation
- Optional delete car action

## Next Step

Connect the app to a Google Sheets / Google Apps Script backend so car pricing and quotations can be stored centrally instead of only in browser `localStorage`.
