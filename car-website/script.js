/* ==========================================================================
   AutoLine KZ — Car dealership website
   script.js  (vanilla JavaScript, no libraries)

   1.  Car data                     8.  Car details modal
   2.  Helpers + car illustrations  9.  Compare
   3.  Favorites (saved cars)       10. Loan calculator
   4.  Filters state                11. Test drive form (demo)
   5.  Rendering the inventory      12. Navigation, header, back-to-top
   6.  Filter controls              13. Reveal animations, year, toast
   7.  Quick search + chips
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. CAR DATA
     CUSTOMIZE: add, remove or edit cars here. Every card, filter option,
     calculator entry and form option is generated from this list.
     Prices are sample values in Kazakhstani tenge (₸).
     ------------------------------------------------------------------------ */
  const cars = [
    {
      id: "camry80-2025", brand: "Toyota", model: "Camry 80", generation: "XV80 · 9th generation",
      year: 2025, price: 22900000, mileage: 4800, engine: "2.5 L", power: 200, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Almaty",
      color: "Emotional Red", hex: "#b91c1c", badges: [["New arrival", "red"]],
      description: "The newest Camry generation with a sharp new design, a large touchscreen, digital dashboard and the latest Toyota Safety Sense. Practically new, still under factory warranty.",
      features: ["Toyota Safety Sense 3.0", "12.3\" touchscreen", "Digital dashboard", "Wireless CarPlay / Android Auto", "Heated & ventilated seats", "Adaptive cruise control"]
    },
    {
      id: "camry80-hybrid-2025", brand: "Toyota", model: "Camry 80", generation: "XV80 · 9th generation",
      year: 2025, price: 25400000, mileage: 2100, engine: "2.5 L Hybrid", power: 230, fuel: "Hybrid",
      transmission: "e-CVT", drive: "FWD", body: "Sedan", city: "Astana",
      color: "Platinum White", hex: "#f1f5f9", badges: [["Hybrid", "green"], ["New arrival", "red"]],
      description: "Camry 80 with the efficient 2.5 hybrid system: around 5 L/100 km in the city, quiet and smooth. Ideal for daily commuting.",
      features: ["Hybrid system (230 hp)", "Head-up display", "JBL premium audio", "360° camera", "Panoramic roof", "Wireless charging"]
    },
    {
      id: "camry70-2021", brand: "Toyota", model: "Camry 70", generation: "XV70 · 8th generation",
      year: 2021, price: 16800000, mileage: 54000, engine: "2.5 L", power: 181, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Almaty",
      color: "Attitude Black", hex: "#111827", badges: [["Best seller", "red"]],
      description: "Facelifted Camry 70 in the popular Prestige trim. One owner, full service history at the official dealer.",
      features: ["Leather interior", "Toyota Safety Sense", "Rear camera", "Blind spot monitor", "LED headlights", "Dual-zone climate"]
    },
    {
      id: "camry70-v6-2019", brand: "Toyota", model: "Camry 70", generation: "XV70 · 8th generation",
      year: 2019, price: 15200000, mileage: 88000, engine: "3.5 L V6", power: 249, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Shymkent",
      color: "Silver Metallic", hex: "#9ca3af", badges: [["V6", ""]],
      description: "Powerful Camry 70 with the 3.5 V6 engine — strong acceleration and a comfortable ride. Lux Safety+ trim.",
      features: ["3.5 V6 (249 hp)", "JBL audio", "Head-up display", "Ventilated seats", "Sunroof", "Keyless entry"]
    },
    {
      id: "camry55-2017", brand: "Toyota", model: "Camry 55", generation: "XV55 · 7th generation (facelift)",
      year: 2017, price: 12300000, mileage: 121000, engine: "2.5 L", power: 181, fuel: "Petrol",
      transmission: "Automatic (6-speed)", drive: "FWD", body: "Sedan", city: "Almaty",
      color: "Pearl White", hex: "#e5e7eb", badges: [["Great value", "blue"]],
      description: "The legendary Camry 55 — famous for reliability and low running costs. Well maintained, no accidents.",
      features: ["Leather seats", "Rear camera", "Cruise control", "Climate control", "Alloy wheels", "Keyless start"]
    },
    {
      id: "camry55-2016", brand: "Toyota", model: "Camry 55", generation: "XV55 · 7th generation (facelift)",
      year: 2016, price: 10900000, mileage: 146000, engine: "2.0 L", power: 150, fuel: "Petrol",
      transmission: "Automatic (6-speed)", drive: "FWD", body: "Sedan", city: "Astana",
      color: "Graphite Grey", hex: "#4b5563", badges: [],
      description: "Economical Camry 55 with the 2.0 engine. A smart choice for a first family sedan or business use.",
      features: ["Climate control", "Parking sensors", "Bluetooth audio", "Cruise control", "Fog lights"]
    },
    {
      id: "grandeur-gn7-2023", brand: "Hyundai", model: "Grandeur", generation: "GN7 · 7th generation",
      year: 2023, price: 21500000, mileage: 18000, engine: "2.5 L GDi", power: 198, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Almaty",
      color: "Abyss Black", hex: "#0b0f19", badges: [["Premium", ""], ["Hot", "red"]],
      description: "The all-new Grandeur with its striking full-width LED light bar and a luxurious lounge-style interior. Top Calligraphy trim.",
      features: ["Nappa leather", "Dual 12.3\" screens", "Bose audio", "Highway Driving Assist 2", "Rear sunshades", "Massage seats"]
    },
    {
      id: "grandeur-ig-2020", brand: "Hyundai", model: "Grandeur", generation: "IG facelift · 6th generation",
      year: 2020, price: 15900000, mileage: 62000, engine: "2.5 L GDi", power: 198, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Astana",
      color: "Copper Brown", hex: "#7c4a2d", badges: [],
      description: "Spacious and comfortable Grandeur IG facelift with a premium feel and generous equipment for the price.",
      features: ["Leather interior", "Navigation", "Smart cruise control", "Ventilated seats", "Infinity audio", "Power trunk"]
    },
    {
      id: "prado-2021", brand: "Toyota", model: "Land Cruiser Prado", generation: "J150 · 4th generation",
      year: 2021, price: 27500000, mileage: 70000, engine: "4.0 L V6", power: 282, fuel: "Petrol",
      transmission: "Automatic (6-speed)", drive: "4WD", body: "SUV", city: "Astana",
      color: "Pearl White", hex: "#f8fafc", badges: [["4WD", ""]],
      description: "Go-anywhere Land Cruiser Prado with the 4.0 V6 engine, full-time 4WD and 7 seats. Perfect for Kazakhstan roads and winters.",
      features: ["Full-time 4WD", "7 seats", "Crawl control", "Leather seats", "Multi-terrain monitor", "Heated steering wheel"]
    },
    {
      id: "lc300-2023", brand: "Toyota", model: "Land Cruiser 300", generation: "J300",
      year: 2023, price: 52000000, mileage: 15000, engine: "3.5 L V6 Twin-Turbo", power: 415, fuel: "Petrol",
      transmission: "Automatic (10-speed)", drive: "4WD", body: "SUV", city: "Almaty",
      color: "Black", hex: "#0f172a", badges: [["Flagship", "red"]],
      description: "The flagship Land Cruiser 300 — luxury, power and legendary off-road ability in one car. VIP trim.",
      features: ["415 hp twin-turbo V6", "E-KDSS suspension", "Rear entertainment", "Fingerprint start", "JBL 14 speakers", "Cooled box"]
    },
    {
      id: "rav4-2022", brand: "Toyota", model: "RAV4", generation: "XA50 · 5th generation",
      year: 2022, price: 15400000, mileage: 40000, engine: "2.0 L", power: 173, fuel: "Petrol",
      transmission: "CVT", drive: "AWD", body: "SUV", city: "Shymkent",
      color: "Lunar Rock", hex: "#8a8f86", badges: [["AWD", ""]],
      description: "Practical and reliable RAV4 with all-wheel drive — a great family crossover for city and countryside.",
      features: ["AWD", "Toyota Safety Sense", "Power tailgate", "Apple CarPlay", "Heated seats", "LED headlights"]
    },
    {
      id: "corolla-2022", brand: "Toyota", model: "Corolla", generation: "E210 · 12th generation",
      year: 2022, price: 10200000, mileage: 35000, engine: "1.6 L", power: 122, fuel: "Petrol",
      transmission: "CVT", drive: "FWD", body: "Sedan", city: "Almaty",
      color: "Celestite Blue", hex: "#1e40af", badges: [["Economical", "green"]],
      description: "Modern Corolla with low fuel consumption and Toyota reliability. Ideal first car or city car.",
      features: ["Toyota Safety Sense", "8\" touchscreen", "Rear camera", "Climate control", "LED lights"]
    },
    {
      id: "sonata-2021", brand: "Hyundai", model: "Sonata", generation: "DN8 · 8th generation",
      year: 2021, price: 12800000, mileage: 60000, engine: "2.5 L", power: 180, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "FWD", body: "Sedan", city: "Astana",
      color: "Hampton Grey", hex: "#6b7280", badges: [],
      description: "Stylish Sonata DN8 with coupe-like design and lots of technology — a strong alternative to the Camry.",
      features: ["Digital cockpit", "Smart cruise control", "Blind spot view monitor", "Wireless charging", "Bose audio"]
    },
    {
      id: "elantra-2022", brand: "Hyundai", model: "Elantra", generation: "CN7 · 7th generation",
      year: 2022, price: 9300000, mileage: 30000, engine: "1.6 L", power: 128, fuel: "Petrol",
      transmission: "Automatic (6-speed)", drive: "FWD", body: "Sedan", city: "Shymkent",
      color: "Polar White", hex: "#f3f4f6", badges: [["Best price", "blue"]],
      description: "Sharp-looking and affordable Elantra CN7 with low running costs and a modern interior.",
      features: ["10.25\" display", "Lane keeping assist", "Rear camera", "Heated seats", "Alloy wheels"]
    },
    {
      id: "tucson-2023", brand: "Hyundai", model: "Tucson", generation: "NX4 · 4th generation",
      year: 2023, price: 14500000, mileage: 22000, engine: "2.0 L", power: 150, fuel: "Petrol",
      transmission: "Automatic (6-speed)", drive: "AWD", body: "SUV", city: "Almaty",
      color: "Teal Green", hex: "#0f766e", badges: [["AWD", ""]],
      description: "Bold Tucson NX4 with parametric hidden headlights, a spacious cabin and all-wheel drive.",
      features: ["AWD", "Panoramic display", "Smart power tailgate", "Surround view", "Heated steering wheel"]
    },
    {
      id: "santafe-2021", brand: "Hyundai", model: "Santa Fe", generation: "TM facelift · 4th generation",
      year: 2021, price: 17900000, mileage: 45000, engine: "2.5 L", power: 180, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "AWD", body: "SUV", city: "Astana",
      color: "Magnetic Silver", hex: "#a3a8b0", badges: [],
      description: "Comfortable family SUV with optional third row, HTRAC all-wheel drive and premium equipment.",
      features: ["HTRAC AWD", "7 seats", "Head-up display", "Krell audio", "Ventilated seats", "Panoramic roof"]
    },
    {
      id: "palisade-2022", brand: "Hyundai", model: "Palisade", generation: "LX2",
      year: 2022, price: 24900000, mileage: 38000, engine: "3.5 L V6", power: 249, fuel: "Petrol",
      transmission: "Automatic (8-speed)", drive: "AWD", body: "SUV", city: "Almaty",
      color: "Moonlight Cloud", hex: "#1e3a5f", badges: [["8 seats", ""]],
      description: "Hyundai's largest SUV: three full rows, quiet V6 and luxury-level comfort for big families.",
      features: ["8 seats", "HTRAC AWD", "Nappa leather", "Rear seat quiet mode", "Harman Kardon audio", "Smart cruise control"]
    }
  ];

  /* Default loan settings used for the "from ... / month" estimate on cards */
  const LOAN_DEFAULTS = { downPct: 30, months: 48, rate: 21 };

  /* ------------------------------------------------------------------------
     2. HELPERS + CAR ILLUSTRATIONS
     ------------------------------------------------------------------------ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 12500000 -> "12 500 000 ₸"
  const formatNum = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const tenge = (n) => formatNum(n) + " ₸";
  const km = (n) => formatNum(n) + " km";
  const carName = (c) => `${c.brand} ${c.model}`;
  const byId = (id) => cars.find((c) => c.id === id);
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  function monthlyPayment(price, downPct, months, ratePct) {
    const loan = price * (1 - downPct / 100);
    const r = ratePct / 100 / 12;
    if (loan <= 0) return { monthly: 0, loan: 0, interest: 0 };
    const monthly = r === 0 ? loan / months : (loan * r) / (1 - Math.pow(1 + r, -months));
    return { monthly, loan, interest: monthly * months - loan };
  }

  // Lighten (positive) or darken (negative) a hex color by a percentage
  function shade(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    const t = pct < 0 ? 0 : 255;
    const p = Math.abs(pct) / 100;
    const r = Math.round(((n >> 16) - t) * (1 - p) + t);
    const g = Math.round((((n >> 8) & 255) - t) * (1 - p) + t);
    const b = Math.round(((n & 255) - t) * (1 - p) + t);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  /*
    Draws a side-view car as inline SVG in the car's paint color.
    "Sedan" and "SUV" have different shapes. These illustrations mean the
    site needs no image files. To use real photos instead, see README.md.
  */
  let svgUid = 0;
  function carSVG(hex, body) {
    const id = "g" + svgUid++;
    const light = shade(hex, 35);
    const dark = shade(hex, -40);
    const isSUV = body === "SUV";

    const shape = isSUV
      ? "M18 110C16 96 22 86 36 84L80 78 118 48C126 40 134 36 148 36H300C316 36 326 42 334 52L352 76 370 80C384 84 388 94 388 106V116C388 120 385 122 381 122H22C19 122 18 118 18 110Z"
      : "M18 112C16 100 22 92 36 89L92 80C112 64 140 48 176 44L246 43C276 44 300 58 322 76L362 84C380 88 388 96 388 108V116C388 120 385 122 381 122H22C19 122 18 118 18 112Z";
    const glass = isSUV
      ? "M112 76 138 48C142 44 146 42 152 42H214V76ZM224 42H296C306 42 314 46 320 54L336 76H224Z"
      : "M118 79C136 64 156 55 180 53L214 52 216 79ZM226 52H246C268 53 287 64 304 79H228Z";
    const shine = isSUV
      ? "M88 80 122 52C128 46 136 40 150 40H298C312 40 322 46 330 56"
      : "M100 82C120 66 146 52 178 49L244 48C272 49 294 61 314 77";
    const wheels = isSUV ? [100, 308] : [98, 310];
    const wr = isSUV ? 27 : 25;
    const wy = isSUV ? 118 : 120;

    const wheel = (x) => `
      <circle cx="${x}" cy="${wy}" r="${wr + 3}" fill="${dark}" opacity=".55"/>
      <circle cx="${x}" cy="${wy}" r="${wr}" fill="#14161b"/>
      <circle cx="${x}" cy="${wy}" r="${wr - 9}" fill="url(#${id}r)"/>
      <path d="M${x} ${wy - wr + 10}V${wy + wr - 10}M${x - wr + 10} ${wy}H${x + wr - 10}" stroke="#4b5563" stroke-width="2.5"/>
      <circle cx="${x}" cy="${wy}" r="4.5" fill="#374151"/>`;

    return `
<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" role="presentation">
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset=".45" stop-color="${hex}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b4252"/><stop offset=".6" stop-color="#151922"/><stop offset="1" stop-color="#2b3140"/>
    </linearGradient>
    <radialGradient id="${id}r"><stop offset="0" stop-color="#e5e7eb"/><stop offset="1" stop-color="#8b929e"/></radialGradient>
  </defs>
  <ellipse cx="203" cy="138" rx="182" ry="7" fill="#000" opacity=".18"/>
  ${isSUV ? `<path d="M150 31H300" stroke="${shade(hex, -55)}" stroke-width="4" stroke-linecap="round"/>` : ""}
  <path d="${shape}" fill="url(#${id}b)"/>
  <path d="${glass}" fill="url(#${id}g)"/>
  <path d="${shine}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>
  <path d="M30 104H382" stroke="${dark}" stroke-opacity=".5" stroke-width="2"/>
  <path d="M219 ${isSUV ? 78 : 81}L221 118" stroke="${dark}" stroke-opacity=".6" stroke-width="1.5"/>
  <path d="M248 92H262" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
  <path d="M150 92H164" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
  <path d="M366 ${isSUV ? 88 : 92}L386 96 385 103 365 100Z" fill="#fff7d6"/>
  <path d="M19 ${isSUV ? 92 : 96}L34 94V103L18 104Z" fill="#dc2626"/>
  <path d="M352 112H388V118H352Z" fill="${dark}" opacity=".7"/>
  ${wheels.map(wheel).join("")}
</svg>`;
  }

  /* ------------------------------------------------------------------------
     3. FAVORITES — saved in the browser (localStorage), safe if unavailable
     ------------------------------------------------------------------------ */
  const FAV_KEY = "autoline-favorites";
  let favorites = new Set();
  try {
    favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
  } catch (e) { /* storage blocked — favorites just won't persist */ }

  function saveFavorites() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...favorites])); } catch (e) { /* ignore */ }
  }

  function toggleFavorite(id) {
    if (favorites.has(id)) {
      favorites.delete(id);
      showToast("Removed from saved cars");
    } else {
      favorites.add(id);
      showToast("Saved ♥ " + carName(byId(id)));
    }
    saveFavorites();
    updateFavCount(true);
    render();
  }

  function updateFavCount(bump) {
    const el = $("#favCount");
    el.textContent = favorites.size;
    if (bump) {
      el.classList.remove("bump");
      void el.offsetWidth; // restart the animation
      el.classList.add("bump");
    }
  }

  /* ------------------------------------------------------------------------
     4. FILTER STATE
     ------------------------------------------------------------------------ */
  const PRICE_MAX = 55000000;
  const YEAR_MIN = 2015;
  const defaultFilters = () => ({
    search: "", brand: "all", model: "all", body: [], fuel: [],
    maxPrice: PRICE_MAX, minYear: YEAR_MIN, city: "all", favOnly: false, sort: "featured"
  });
  let filters = defaultFilters();

  function matches(car) {
    const f = filters;
    if (f.search) {
      const hay = `${car.brand} ${car.model} ${car.generation} ${car.year} ${car.color} ${car.city} ${car.fuel} ${car.body}`.toLowerCase();
      const words = f.search.toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.every((w) => hay.includes(w))) return false;
    }
    if (f.brand !== "all" && car.brand !== f.brand) return false;
    if (f.model !== "all" && car.model !== f.model) return false;
    if (f.body.length && !f.body.includes(car.body)) return false;
    if (f.fuel.length && !f.fuel.includes(car.fuel)) return false;
    if (car.price > f.maxPrice) return false;
    if (car.year < f.minYear) return false;
    if (f.city !== "all" && car.city !== f.city) return false;
    if (f.favOnly && !favorites.has(car.id)) return false;
    return true;
  }

  const sorters = {
    featured: () => 0,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "year-desc": (a, b) => b.year - a.year || a.mileage - b.mileage,
    "mileage-asc": (a, b) => a.mileage - b.mileage
  };

  /* ------------------------------------------------------------------------
     5. RENDERING THE INVENTORY
     ------------------------------------------------------------------------ */
  const grid = $("#carGrid");

  function cardHTML(car) {
    const fav = favorites.has(car.id);
    const inCompare = compareList.includes(car.id);
    const est = monthlyPayment(car.price, LOAN_DEFAULTS.downPct, LOAN_DEFAULTS.months, LOAN_DEFAULTS.rate);
    const badges = car.badges.map(([t, cls]) => `<span class="badge ${cls}">${t}</span>`).join("");
    return `
      <article class="car-card" data-id="${car.id}">
        <div class="car-media" data-action="details" role="button" tabindex="-1" aria-hidden="true">
          ${carSVG(car.hex, car.body)}
          <div class="car-badges">${badges}</div>
        </div>
        <button class="fav-btn ${fav ? "active" : ""}" data-action="fav" aria-pressed="${fav}" aria-label="${fav ? "Remove" : "Save"} ${carName(car)} ${car.year}">
          <svg class="icon" aria-hidden="true"><use href="#${fav ? "i-heart-fill" : "i-heart"}"/></svg>
        </button>
        <div class="car-body">
          <span class="car-gen">${car.generation}</span>
          <h3 class="car-title"><button data-action="details">${carName(car)} <span class="muted">${car.year}</span></button></h3>
          <ul class="car-specs">
            <li><svg class="icon" aria-hidden="true"><use href="#i-gauge"/></svg>${km(car.mileage)}</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-engine"/></svg>${car.engine}, ${car.power} hp</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-gear"/></svg>${car.transmission.split(" ")[0]}</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-drive"/></svg>${car.drive} · ${car.fuel}</li>
          </ul>
          <div class="car-foot">
            <div>
              <div class="car-price">${tenge(car.price)}<span class="car-monthly">from ${tenge(est.monthly)} / month</span></div>
              <span class="car-city"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>${car.city}</span>
            </div>
            <div class="car-actions">
              <button class="icon-btn ${inCompare ? "active" : ""}" data-action="compare" aria-pressed="${inCompare}" aria-label="${inCompare ? "Remove from" : "Add to"} comparison" title="Compare">
                <svg class="icon" aria-hidden="true"><use href="#i-compare"/></svg>
              </button>
              <button class="btn btn-primary btn-small" data-action="details">Details</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const list = cars.filter(matches).sort(sorters[filters.sort]);
    grid.innerHTML = list.map(cardHTML).join("");
    $("#emptyState").hidden = list.length > 0;
    $("#resultsCount").innerHTML = `Showing <strong>${list.length}</strong> of ${cars.length} cars`;
    renderActiveFilters();
  }

  // Small removable chips showing which filters are on
  function renderActiveFilters() {
    const f = filters;
    const chips = [];
    if (f.search) chips.push(["search", `"${escapeHTML(f.search)}"`]);
    if (f.brand !== "all") chips.push(["brand", f.brand]);
    if (f.model !== "all") chips.push(["model", f.model]);
    f.body.forEach((b) => chips.push(["body:" + b, b]));
    f.fuel.forEach((b) => chips.push(["fuel:" + b, b]));
    if (f.maxPrice < PRICE_MAX) chips.push(["maxPrice", "≤ " + tenge(f.maxPrice)]);
    if (f.minYear > YEAR_MIN) chips.push(["minYear", f.minYear + "+"]);
    if (f.city !== "all") chips.push(["city", f.city]);
    if (f.favOnly) chips.push(["favOnly", "Saved only"]);

    $("#activeFilters").innerHTML = chips.map(([key, label]) => `
      <span class="af-chip">${label}<button type="button" data-remove="${key}" aria-label="Remove filter ${label}">
        <svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button></span>`).join("");
  }

  $("#activeFilters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const key = btn.dataset.remove;
    const d = defaultFilters();
    if (key.startsWith("body:")) filters.body = filters.body.filter((v) => v !== key.slice(5));
    else if (key.startsWith("fuel:")) filters.fuel = filters.fuel.filter((v) => v !== key.slice(5));
    else filters[key] = d[key];
    syncControls();
    render();
  });

  // One click handler for every card button (event delegation)
  grid.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
    const id = actionEl.closest(".car-card").dataset.id;
    const action = actionEl.dataset.action;
    if (action === "fav") toggleFavorite(id);
    if (action === "compare") toggleCompare(id);
    if (action === "details") openDetails(id, actionEl);
  });

  /* ------------------------------------------------------------------------
     6. FILTER CONTROLS
     ------------------------------------------------------------------------ */
  const ui = {
    search: $("#fSearch"), brand: $("#fBrand"), model: $("#fModel"), body: $("#fBody"), fuel: $("#fFuel"),
    price: $("#fPrice"), priceOut: $("#fPriceOut"), year: $("#fYear"), yearOut: $("#fYearOut"),
    city: $("#fCity"), favOnly: $("#fFavOnly"), sort: $("#sortBy")
  };

  // Fill a <select> with the models of the chosen brand
  function modelsFor(brand) {
    return [...new Set(cars.filter((c) => brand === "all" || c.brand === brand).map((c) => c.model))];
  }
  function fillModelSelect(select, brand, selected) {
    const label = select.id === "qsModel" ? "All models" : "All models";
    select.innerHTML = `<option value="all">${label}</option>` +
      modelsFor(brand).map((m) => `<option value="${m}">${m}</option>`).join("");
    select.value = modelsFor(brand).includes(selected) ? selected : "all";
  }

  // Make every control show the current filter values
  function syncControls() {
    ui.search.value = filters.search;
    $$("button", ui.brand).forEach((b) => {
      const on = b.dataset.value === filters.brand;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    fillModelSelect(ui.model, filters.brand, filters.model);
    $$("input", ui.body).forEach((i) => (i.checked = filters.body.includes(i.value)));
    $$("input", ui.fuel).forEach((i) => (i.checked = filters.fuel.includes(i.value)));
    ui.price.value = filters.maxPrice;
    ui.priceOut.textContent = filters.maxPrice >= PRICE_MAX ? "Any" : tenge(filters.maxPrice);
    ui.year.value = filters.minYear;
    ui.yearOut.textContent = filters.minYear <= YEAR_MIN ? "Any" : filters.minYear;
    ui.city.value = filters.city;
    ui.favOnly.checked = filters.favOnly;
    ui.sort.value = filters.sort;
  }

  let searchTimer;
  ui.search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { filters.search = ui.search.value.trim(); render(); }, 200);
  });

  ui.brand.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    filters.brand = b.dataset.value;
    if (filters.model !== "all" && !modelsFor(filters.brand).includes(filters.model)) filters.model = "all";
    syncControls();
    render();
  });

  ui.model.addEventListener("change", () => { filters.model = ui.model.value; render(); });
  ui.body.addEventListener("change", () => { filters.body = $$("input:checked", ui.body).map((i) => i.value); render(); });
  ui.fuel.addEventListener("change", () => { filters.fuel = $$("input:checked", ui.fuel).map((i) => i.value); render(); });
  ui.price.addEventListener("input", () => { filters.maxPrice = +ui.price.value; syncControls(); render(); });
  ui.year.addEventListener("input", () => { filters.minYear = +ui.year.value; syncControls(); render(); });
  ui.city.addEventListener("change", () => { filters.city = ui.city.value; render(); });
  ui.favOnly.addEventListener("change", () => { filters.favOnly = ui.favOnly.checked; render(); });
  ui.sort.addEventListener("change", () => { filters.sort = ui.sort.value; render(); });

  function resetFilters() {
    const sort = filters.sort;
    filters = defaultFilters();
    filters.sort = sort;
    syncControls();
    render();
  }
  $("#resetFilters").addEventListener("click", resetFilters);
  $("#emptyReset").addEventListener("click", resetFilters);

  // Mobile: filters slide in as a panel
  const filtersPanel = $("#filters");
  let filtersBackdrop = null;
  function setFiltersOpen(open) {
    filtersPanel.classList.toggle("open", open);
    document.body.classList.toggle("no-scroll", open);
    if (open) {
      filtersBackdrop = document.createElement("div");
      filtersBackdrop.className = "filters-backdrop";
      filtersBackdrop.addEventListener("click", () => setFiltersOpen(false));
      document.body.appendChild(filtersBackdrop);
      $("#filtersClose").focus();
    } else if (filtersBackdrop) {
      filtersBackdrop.remove();
      filtersBackdrop = null;
    }
  }
  $("#filtersOpen").addEventListener("click", () => setFiltersOpen(true));
  $("#filtersClose").addEventListener("click", () => setFiltersOpen(false));
  $("#filtersApply").addEventListener("click", () => {
    setFiltersOpen(false);
    $("#inventory").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ------------------------------------------------------------------------
     7. QUICK SEARCH (hero) + QUICK CHIPS
     ------------------------------------------------------------------------ */
  const qsBrand = $("#qsBrand");
  const qsModel = $("#qsModel");
  fillModelSelect(qsModel, "all", "all");
  qsBrand.addEventListener("change", () => fillModelSelect(qsModel, qsBrand.value, qsModel.value));

  function goToInventory() {
    syncControls();
    render();
    const top = $("#inventory").getBoundingClientRect().top + window.scrollY - $("#siteHeader").offsetHeight + 1;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  $("#quickSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    filters = defaultFilters();
    filters.brand = qsBrand.value;
    filters.model = qsModel.value;
    const max = +$("#qsPrice").value;
    if (max) filters.maxPrice = max;
    goToInventory();
  });

  // Buttons with data-quick="key:value" (brand chips, Camry guide, footer)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick]");
    if (!btn) return;
    const [key, value] = btn.dataset.quick.split(":");
    filters = defaultFilters();
    if (key === "brand") filters.brand = value;
    if (key === "body") filters.body = [value];
    if (key === "fuel") filters.fuel = [value];
    if (key === "model") {
      // Exact model (e.g. "Camry 70") or a family (e.g. "Camry", "Land Cruiser") via search
      if (modelsFor("all").includes(value)) {
        filters.model = value;
        filters.brand = cars.find((c) => c.model === value).brand;
      } else {
        filters.search = value;
      }
    }
    goToInventory();
  });

  /* ------------------------------------------------------------------------
     8. CAR DETAILS MODAL
     ------------------------------------------------------------------------ */
  const carModal = $("#carModal");
  let lastFocus = null;

  function detailsHTML(car) {
    const est = monthlyPayment(car.price, LOAN_DEFAULTS.downPct, LOAN_DEFAULTS.months, LOAN_DEFAULTS.rate);
    const fav = favorites.has(car.id);
    const inCompare = compareList.includes(car.id);
    const rows = [
      ["Year", car.year], ["Mileage", km(car.mileage)], ["Engine", car.engine], ["Power", car.power + " hp"],
      ["Fuel", car.fuel], ["Transmission", car.transmission], ["Drive", car.drive], ["Body", car.body],
      ["Color", car.color], ["Location", car.city]
    ];
    return `
      <div class="detail-grid">
        <div>
          <div class="detail-media">${carSVG(car.hex, car.body)}</div>
          <div class="color-row"><span class="swatch" style="background:${car.hex}"></span>${car.color}</div>
          <h4 class="detail-h">Key features</h4>
          <ul class="feature-list">${car.features.map((f) => `<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>${f}</li>`).join("")}</ul>
        </div>
        <div>
          <span class="detail-gen">${car.generation}</span>
          <h2 class="detail-title" id="carModalTitle">${carName(car)} ${car.year}</h2>
          <div class="detail-price">${tenge(car.price)}</div>
          <p class="detail-monthly">≈ ${tenge(est.monthly)} / month · ${LOAN_DEFAULTS.downPct}% down, ${LOAN_DEFAULTS.months} months</p>
          <p class="detail-desc">${car.description}</p>
          <table class="spec-table"><tbody>
            ${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join("")}
          </tbody></table>
          <div class="detail-actions">
            <button class="btn btn-primary" data-detail="testdrive">Book test drive</button>
            <button class="btn btn-outline" data-detail="finance">Calculate loan</button>
            <button class="btn btn-outline" data-detail="fav" aria-pressed="${fav}">
              <svg class="icon" aria-hidden="true"><use href="#${fav ? "i-heart-fill" : "i-heart"}"/></svg>${fav ? "Saved" : "Save"}
            </button>
            <button class="btn btn-outline" data-detail="compare" aria-pressed="${inCompare}">
              <svg class="icon" aria-hidden="true"><use href="#i-compare"/></svg>${inCompare ? "In comparison" : "Compare"}
            </button>
          </div>
        </div>
      </div>`;
  }

  function openDetails(id, trigger) {
    const car = byId(id);
    if (!car) return;
    carModal.dataset.id = id;
    $("#carModalContent").innerHTML = detailsHTML(car);
    openModal(carModal, trigger);
  }

  $("#carModalContent").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-detail]");
    if (!btn) return;
    const id = carModal.dataset.id;
    const action = btn.dataset.detail;
    if (action === "fav") { toggleFavorite(id); $("#carModalContent").innerHTML = detailsHTML(byId(id)); }
    if (action === "compare") { toggleCompare(id); $("#carModalContent").innerHTML = detailsHTML(byId(id)); }
    if (action === "testdrive") {
      closeModal(carModal, false);
      $("#tdCar").value = id;
      scrollToEl($("#contact"));
      setTimeout(() => $("#tdName").focus({ preventScroll: true }), 600);
    }
    if (action === "finance") {
      closeModal(carModal, false);
      setCalcCar(id);
      scrollToEl($("#finance"));
    }
  });

  // Generic modal open/close with focus handling
  function openModal(modal, trigger) {
    lastFocus = trigger || document.activeElement;
    modal.hidden = false;
    modal.classList.remove("closing");
    $(".modal-dialog", modal).scrollTop = 0;
    document.body.classList.add("no-scroll");
    $(".modal-close", modal).focus();
  }

  function closeModal(modal, restoreFocus = true) {
    if (modal.hidden) return;
    const done = () => {
      modal.hidden = true;
      modal.classList.remove("closing");
      if (!$$(".modal").some((m) => !m.hidden)) document.body.classList.remove("no-scroll");
      if (restoreFocus && lastFocus && document.contains(lastFocus)) lastFocus.focus();
    };
    if (reduceMotion) done();
    else { modal.classList.add("closing"); setTimeout(done, 190); }
  }

  $$(".modal").forEach((modal) => {
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", () => closeModal(modal)));
  });

  document.addEventListener("keydown", (e) => {
    const openM = $$(".modal").find((m) => !m.hidden);
    if (e.key === "Escape") {
      if (openM) closeModal(openM);
      else if (filtersPanel.classList.contains("open")) setFiltersOpen(false);
      else if (navMenu.classList.contains("open")) { setMenu(false); navToggle.focus(); }
    }
    // Keep Tab focus inside an open modal
    if (e.key === "Tab" && openM) {
      const focusable = $$('button, a[href], input, select, textarea, [tabindex="0"]', $(".modal-dialog", openM)).filter((el) => !el.disabled);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ------------------------------------------------------------------------
     9. COMPARE (up to 3 cars)
     ------------------------------------------------------------------------ */
  const MAX_COMPARE = 3;
  let compareList = [];

  function toggleCompare(id) {
    if (compareList.includes(id)) {
      compareList = compareList.filter((x) => x !== id);
    } else {
      if (compareList.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} cars`);
        return;
      }
      compareList.push(id);
      showToast("Added to comparison");
    }
    renderCompareBar();
    render();
  }

  function renderCompareBar() {
    const bar = $("#compareBar");
    bar.hidden = compareList.length === 0;
    document.body.classList.toggle("has-compare", compareList.length > 0);
    $("#compareCount").textContent = compareList.length;
    $("#compareItems").innerHTML = compareList.map((id) => {
      const c = byId(id);
      return `<span class="compare-chip">${carName(c)} ${c.year}<button type="button" data-uncompare="${id}" aria-label="Remove ${carName(c)} from comparison"><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button></span>`;
    }).join("");
  }

  $("#compareItems").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-uncompare]");
    if (btn) toggleCompare(btn.dataset.uncompare);
  });
  $("#compareClear").addEventListener("click", () => { compareList = []; renderCompareBar(); render(); });

  $("#compareOpen").addEventListener("click", (e) => {
    const list = compareList.map(byId);
    const wrap = $("#compareTable");
    if (list.length < 2) {
      wrap.innerHTML = `<p class="compare-empty">Add at least one more car to compare (you have ${list.length}).</p>`;
    } else {
      // Highlight the best value in rows where lower/higher is clearly better
      const best = (key, mode) => {
        const vals = list.map((c) => c[key]);
        return mode === "min" ? Math.min(...vals) : Math.max(...vals);
      };
      const row = (label, fn, key, mode) =>
        `<tr><th scope="row">${label}</th>${list.map((c) => {
          const isBest = key && c[key] === best(key, mode);
          return `<td class="${isBest ? "best" : ""}">${fn(c)}</td>`;
        }).join("")}</tr>`;
      wrap.innerHTML = `
        <table class="compare-table">
          <thead><tr><th></th>${list.map((c) => `<th class="ct-car">${carSVG(c.hex, c.body)}<span class="ct-name">${carName(c)} ${c.year}</span></th>`).join("")}</tr></thead>
          <tbody>
            ${row("Price", (c) => tenge(c.price), "price", "min")}
            ${row("Year", (c) => c.year, "year", "max")}
            ${row("Mileage", (c) => km(c.mileage), "mileage", "min")}
            ${row("Engine", (c) => c.engine)}
            ${row("Power", (c) => c.power + " hp", "power", "max")}
            ${row("Fuel", (c) => c.fuel)}
            ${row("Transmission", (c) => c.transmission)}
            ${row("Drive", (c) => c.drive)}
            ${row("Body", (c) => c.body)}
            ${row("Generation", (c) => c.generation)}
            ${row("Location", (c) => c.city)}
          </tbody>
        </table>
        <p class="note"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Green = best value in that row.</p>`;
    }
    openModal($("#compareModal"), e.currentTarget);
  });

  /* ------------------------------------------------------------------------
     10. LOAN CALCULATOR
     ------------------------------------------------------------------------ */
  const calc = {
    car: $("#calcCar"), price: $("#calcPrice"), down: $("#calcDown"), downOut: $("#calcDownOut"),
    term: $("#calcTerm"), rate: $("#calcRate")
  };
  calc.car.innerHTML = cars.map((c) => `<option value="${c.id}">${carName(c)} ${c.year} — ${tenge(c.price)}</option>`).join("");

  function setCalcCar(id) {
    calc.car.value = id;
    calc.price.value = byId(id).price;
    updateCalc();
  }

  function updateCalc() {
    const price = Math.max(0, +calc.price.value || 0);
    const down = +calc.down.value;
    const months = +calc.term.value;
    const rate = Math.max(0, +calc.rate.value || 0);
    calc.downOut.textContent = `${down}% (${tenge(price * down / 100)})`;
    const r = monthlyPayment(price, down, months, rate);
    $("#calcMonthly").textContent = tenge(r.monthly);
    $("#calcLoan").textContent = tenge(r.loan);
    $("#calcInterest").textContent = tenge(r.interest);
  }

  calc.car.addEventListener("change", () => setCalcCar(calc.car.value));
  [calc.price, calc.down, calc.rate].forEach((el) => el.addEventListener("input", updateCalc));
  calc.term.addEventListener("change", updateCalc);
  $("#calcForm").addEventListener("submit", (e) => e.preventDefault());

  /* ------------------------------------------------------------------------
     11. TEST DRIVE FORM — FRONT-END DEMO ONLY
     Validates the fields and shows a confirmation; nothing is sent because
     there is no server. Connect a service like Formspree for real requests.
     ------------------------------------------------------------------------ */
  const tdForm = $("#tdForm");
  const tdCar = $("#tdCar");
  const tdDate = $("#tdDate");
  tdCar.innerHTML = `<option value="">Choose a car</option>` +
    cars.map((c) => `<option value="${c.id}">${carName(c)} ${c.year} — ${c.city}</option>`).join("");

  // Earliest date = today (local time)
  const today = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  tdDate.min = iso(today);

  const tdRules = {
    tdName: (v) => (!v ? "Please enter your name." : v.length < 2 ? "Name is too short." : ""),
    tdPhone: (v) => {
      const digits = v.replace(/[\s()-]/g, "");
      if (!v) return "Please enter your phone number.";
      return /^\+?\d{10,12}$/.test(digits) ? "" : "Enter a valid number, e.g. +7 701 234 56 78.";
    },
    tdCar: (v) => (v ? "" : "Please choose a car."),
    tdDate: (v) => (!v ? "Please choose a date." : v < tdDate.min ? "The date can't be in the past." : "")
  };

  function validateTd(id) {
    const el = $("#" + id);
    const msg = tdRules[id](el.value.trim());
    $("#" + id + "-error").textContent = msg;
    el.closest(".form-group").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", String(!!msg));
    return !msg;
  }

  Object.keys(tdRules).forEach((id) => {
    const el = $("#" + id);
    el.addEventListener("blur", () => { if (el.value) validateTd(id); });
    el.addEventListener("input", () => { if (el.closest(".form-group").classList.contains("invalid")) validateTd(id); });
    el.addEventListener("change", () => { if (el.closest(".form-group").classList.contains("invalid")) validateTd(id); });
  });

  tdForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ids = Object.keys(tdRules);
    const results = ids.map(validateTd);
    if (results.includes(false)) {
      $("#" + ids[results.indexOf(false)]).focus();
      showToast("Please check the highlighted fields");
      return;
    }
    const car = byId(tdCar.value);
    const name = $("#tdName").value.trim().split(/\s+/)[0];
    const date = new Date(tdDate.value + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    const box = $("#tdSuccess");
    box.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>
      <div><strong>Thank you, ${escapeHTML(name)}!</strong>
      <p>Your test drive of the <b>${carName(car)} ${car.year}</b> in ${car.city} on <b>${date}</b> is requested. In a live version our manager would call you to confirm.</p></div>`;
    box.hidden = false;
    tdForm.reset();
    $$(".form-group", tdForm).forEach((g) => g.classList.remove("invalid"));
    showToast("Test drive request validated (demo — not sent)");
  });

  /* ------------------------------------------------------------------------
     12. NAVIGATION, HEADER, BACK-TO-TOP
     ------------------------------------------------------------------------ */
  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");

  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  }
  navToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 920 && navMenu.classList.contains("open")) setMenu(false); });

  function scrollToEl(el) {
    const offset = el.id === "home" ? 0 : header.offsetHeight - 1;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // Smooth scrolling for in-page links (accounts for the fixed header)
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = $(a.getAttribute("href"));
      if (!target || a.getAttribute("href").length < 2) return;
      e.preventDefault();
      setMenu(false);
      scrollToEl(target);
      history.pushState(null, "", a.getAttribute("href"));
    });
  });

  // Saved-cars button in the header: show favorites in the inventory
  $("#favNavBtn").addEventListener("click", () => {
    setMenu(false);
    if (!favorites.size) { showToast("No saved cars yet — tap ♥ on a car to save it"); return; }
    filters = defaultFilters();
    filters.favOnly = true;
    goToInventory();
  });

  // Hero featured car
  const heroCar = byId("camry80-2025");
  $("#heroCar").innerHTML = carSVG(heroCar.hex, heroCar.body);
  $("#heroCarName").textContent = `${carName(heroCar)} ${heroCar.year}`;
  $("#heroCarPrice").textContent = tenge(heroCar.price);
  $("#heroCarBtn").addEventListener("click", (e) => openDetails(heroCar.id, e.currentTarget));
  $("#statCars").textContent = cars.length;

  // Camry guide illustrations and "from" prices
  $$("[data-car-art]").forEach((el) => (el.innerHTML = carSVG(el.dataset.color, "Sedan")));
  [["gen55", "Camry 55"], ["gen70", "Camry 70"], ["gen80", "Camry 80"]].forEach(([elId, model]) => {
    const prices = cars.filter((c) => c.model === model).map((c) => c.price);
    $("#" + elId).textContent = prices.length ? tenge(Math.min(...prices)) : "—";
  });

  // Header style, active nav link and back-to-top on scroll
  const navLinks = $$(".nav-link");
  const sections = navLinks.map((l) => $(l.getAttribute("href"))).filter(Boolean);
  const backToTop = $("#backToTop");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 20);
      backToTop.classList.toggle("visible", y > 700);
      const pos = y + window.innerHeight * 0.3;
      let current = null;
      sections.forEach((s) => { if (s.offsetTop <= pos) current = s.id; });
      navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ------------------------------------------------------------------------
     13. REVEAL ANIMATIONS, YEAR, TOAST
     ------------------------------------------------------------------------ */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  $("#year").textContent = new Date().getFullYear();

  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* Initial render */
  syncControls();
  render();
  updateFavCount(false);
  setCalcCar("camry70-2021");
  onScroll();
})();
