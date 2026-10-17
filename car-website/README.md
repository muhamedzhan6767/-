# AutoLine KZ — Toyota & Hyundai Car Dealership Website

A modern, responsive car-selling website built with **HTML5, CSS3 and vanilla JavaScript**.
It lists Toyota and Hyundai cars, including the **Hyundai Grandeur** and the **Toyota Camry 55, Camry 70 and Camry 80**,
plus Land Cruiser Prado, Land Cruiser 300, RAV4, Corolla, Sonata, Elantra, Tucson, Santa Fe and Palisade.

No frameworks, no build step, no database. Open `index.html` in a browser and it works.

## Files

```
car-website/
├── index.html   → Page structure: header, hero, inventory, Camry guide, finance, reviews, contact, footer, modals
├── style.css    → All styling, animations and responsive layouts (colors are variables at the top)
├── script.js    → Car data + all interactivity (filters, details, compare, favorites, calculator, form)
└── README.md    → This guide
```

## How to run

Double-click `index.html`, or open it in Chrome, Edge, Firefox or Safari. Nothing to install.

## Features

- **Inventory of 17 cars**, generated from one data list in `script.js`
- **Filters:** search, brand, model, body type, fuel, max price, year, city, "saved only". Active filters show as removable chips
- **Sorting:** price, year, mileage
- **Hero quick search** and quick chips (Toyota, Hyundai, Sedans, SUVs, Hybrids, All Camrys)
- **Car details popup:** specs table, features, estimated monthly payment, and buttons to book a test drive or calculate a loan
- **Compare up to 3 cars** side by side, with the best value in each row highlighted
- **Saved cars (♥):** stored in your browser (localStorage), so they're still there after a page reload
- **Camry 55 vs 70 vs 80 guide** with "from" prices taken from the inventory
- **Loan calculator:** car, price, down payment, term and interest rate
- **Test drive form** with validation (name, phone, car, date) and a confirmation message
- Mobile menu, slide-in filters on phones, smooth scrolling, reveal animations, back-to-top button
- Accessible: semantic HTML, labels, keyboard support, focus trapping in popups, respects "reduce motion"

## How to customize

### Add, edit or remove cars
Open `script.js` and edit the `cars` list at the top. Each car looks like this:

```js
{
  id: "camry70-2021",           // unique id (no spaces)
  brand: "Toyota",               // "Toyota" or "Hyundai" (or a new brand)
  model: "Camry 70",             // used by the Model filter
  generation: "XV70 · 8th generation",
  year: 2021, price: 16800000, mileage: 54000,
  engine: "2.5 L", power: 181, fuel: "Petrol",   // fuel: "Petrol" or "Hybrid"
  transmission: "Automatic (8-speed)", drive: "FWD",
  body: "Sedan",                 // "Sedan" or "SUV" (changes the illustration shape)
  city: "Almaty",                // Almaty, Astana or Shymkent
  color: "Attitude Black", hex: "#111827",       // hex = paint color of the drawing
  badges: [["Best seller", "red"]],              // colors: "", "red", "green", "blue"
  description: "...",
  features: ["Leather interior", "..."]
}
```

Filters, the Model dropdown, the calculator, the test-drive form and the Camry guide prices all update automatically.

### Car pictures
The cars are drawn as SVG illustrations in each car's paint color, so the site needs no image files and always works offline.
To use real photos, put an image such as `photos/camry70.jpg` in the folder, then in `script.js` replace
`${carSVG(car.hex, car.body)}` inside `cardHTML` and `detailsHTML` with
`<img src="photos/${car.id}.jpg" alt="${carName(car)} ${car.year}">`. Use only photos you have the right to use.

### Dealership name and contacts
In `index.html`, search for `AutoLine` and `CUSTOMIZE`. Replace the phone number, email and social links (they're placeholders).

### Colors
Change `--red`, `--ink` and the other variables at the top of `style.css`.

### Loan defaults
In `script.js`, `LOAN_DEFAULTS` sets the down payment, term and rate used for the "from … / month" prices on the cards.

## What needs a backend for real use

- **Test drive form:** it only validates in the browser and shows a confirmation. Nothing is sent. Connect it to Formspree, EmailJS or your own server to receive real requests.
- **Inventory:** stored in `script.js`. A real dealership would load cars from a database or admin panel.
- **Prices, reviews and contact details** are sample data for demonstration.

Toyota, Camry, Land Cruiser, RAV4, Corolla, Hyundai, Grandeur, Sonata, Elantra, Tucson, Santa Fe and Palisade are trademarks of their respective owners.
