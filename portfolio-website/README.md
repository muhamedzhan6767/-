# Alex Morgan — Personal Portfolio Website

A modern, responsive personal portfolio website built with **HTML5, CSS3 and vanilla JavaScript**.
It presents personal information, education, skills, projects, achievements and contact details in a
premium dark design with purple and blue gradient accents.

There is no framework, no build step, no Node.js, and no database. Open `index.html` in a browser and it works.

---

## 1. What this project is

A single-page portfolio for a university student, made for professors, recruiters and potential collaborators.
It has these sections:

| Section | What it shows |
|---|---|
| **Home / Hero** | Name, title, introduction, two call-to-action buttons, avatar with floating badges, quick stats |
| **About Me** | Short biography, quick facts and four personal-value cards |
| **Education** | Timeline with dates, descriptions and icons |
| **Skills** | Eight skill cards with animated progress bars, filter buttons and a tag cloud |
| **Projects** | Three project cards, each opening a detail popup (modal) |
| **Achievements** | Four editable sample achievement cards (clearly marked as sample content) |
| **Contact** | Email, LinkedIn and GitHub placeholders and a validated contact form |
| **Footer** | Quick links, social icons and an automatic copyright year |

All names, links and details are **sample content** that you should replace with your own.

---

## 2. Files

```
portfolio-website/
├── index.html   → Page structure and all text content (sections, icons, modal, form)
├── style.css    → All styling: colors, layout, animations, responsive breakpoints
├── script.js    → All interactivity: menu, scrolling, animations, modal, form validation
└── README.md    → This guide
```

- **index.html** contains the content. Most of your edits happen here. Look for comments that start with
  `CUSTOMIZE:`. Icons are inline SVGs defined once at the top of the file (the "SVG icon sprite"), so they
  always work offline.
- **style.css** holds the visual design. Colors and fonts are set as CSS variables at the top (`:root`), so the
  whole theme can be changed in one place.
- **script.js** holds the behaviour, plus the **project popup content** (the `projects` object at the top).

---

## 3. How to run it

1. Download or unzip the `portfolio-website` folder.
2. Double-click **`index.html`**, or right-click → *Open with* → Chrome, Edge, Firefox or Safari.

That's it. Nothing to install.

Optional: if you use VS Code, the *Live Server* extension reloads the page automatically while you edit.

> **Fonts and icons offline:** the site loads the *Inter* and *Space Grotesk* fonts from Google Fonts.
> Without internet it falls back to your system font and still looks clean. Icons are built into the HTML
> and never need a network connection.

---

## 4. How to customize it

Open the files in any text editor (VS Code, Notepad++, Sublime Text, even Notepad).
Search for `CUSTOMIZE` to find every spot that needs your details.

### Name and title
In `index.html`:
- `<title>` and `<meta name="description">` in the `<head>`.
- The logo initials `AM` and the text `Alex.Morgan` (appears in the navigation **and** the footer).
- The hero heading: `Hi, I'm <span class="gradient-text">Alex Morgan</span>`.
- The subtitle: `Aspiring Technology Professional`.
- The copyright line in the footer.

In `script.js`, edit the `phrases` list (section 8) to change the rotating words after "Student |".

### Biography
In `index.html`, find the `ABOUT` section. Edit the three paragraphs inside `<div class="about-text">`,
the quick facts list (`about-facts`) and the four value cards.

### Profile image
1. Put your photo in the `portfolio-website` folder, e.g. `profile.jpg` (a square image works best).
2. In `index.html`, find the comment `CUSTOMIZE PROFILE IMAGE`.
3. Replace the whole `<div class="avatar-placeholder"> ... </div>` block with:
   ```html
   <img class="avatar-img" src="profile.jpg" alt="Portrait of Your Name">
   ```

### Education
Each `<li class="timeline-item">` is one entry. Change the date, title, school name, description and tags.
Copy a whole `<li>...</li>` block to add another entry.

### Skills
Each `<article class="skill-card">` is one skill:
- `data-level="75"` sets the progress bar (0–100). Also update `aria-valuenow` and the visible `75%` text.
- `data-category="technical"` or `"soft"` decides which filter button shows it.
- Change the icon by editing `<use href="#i-code"/>` to any icon id from the sprite at the top of the file
  (for example `#i-bulb`, `#i-users`, `#i-rocket`).

### Projects
- **Cards:** edit the title, description and tags in each `<article class="project-card">` in `index.html`.
- **Popup details:** edit the matching entry in the `projects` object at the top of `script.js`
  (description, features, what you learned, tags, role, timeline, status).
- The card button's `data-project="portfolio"` must match the key in `script.js` (`portfolio`, `ecommerce`, `team`).
  To add a project, copy a card, give it a new key, and add a matching entry to `projects`.

### Achievements
Replace the four sample cards with your own. Once your content is real, delete the yellow
`<p class="sample-note">` notice.

### Contact information
In `index.html`, replace:
- `alex.morgan@example.com` (in the contact section **and** the footer social icons),
- `https://www.linkedin.com/in/your-profile`,
- `https://github.com/your-username`,
- `https://x.com/your-handle` (footer),
- `Your City, Country`.

### Colors and fonts
At the top of `style.css`, change the variables in `:root`, for example `--purple`, `--blue` and `--bg`.

---

## 5. What is interactive, and what needs a backend

### Works fully in the browser (no backend needed)
- Smooth scrolling navigation with active-section highlighting
- Sticky navigation bar that changes style when you scroll
- Mobile hamburger menu (opens, closes on link click, outside click or **Esc**)
- Animated section reveals on scroll
- Hover animations on cards, buttons, tags and icons
- Animated skill progress bars, skill filter buttons and hero counters
- Typing effect in the hero subtitle
- Project detail popups (close with the × button, the backdrop or **Esc**; keyboard focus stays inside)
- Contact form validation with error messages, character counter and a friendly success message
- Back-to-top button
- Copyright year set automatically
- Respects the operating system's "reduce motion" setting

### Needs a backend or third-party service for real use
- **Sending contact form messages.** The form is a **front-end demonstration only**. It validates input and
  shows a success message, but it does **not** send email. To receive real messages, connect it to a service such as:
  - [Formspree](https://formspree.io) — set the form's `action` to your Formspree URL and remove the demo
    submit handler in `script.js`,
  - [Netlify Forms](https://docs.netlify.com/forms/setup/) (if you host on Netlify),
  - [EmailJS](https://www.emailjs.com) (sends from JavaScript),
  - or your own server (Node.js, PHP, Python, etc.).
- **Hosting online.** To share a link instead of a file, upload the folder to a free static host such as
  GitHub Pages, Netlify or Vercel. No configuration is needed.

---

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari, on desktop, tablet and mobile.

## Credits

Designed and built with HTML, CSS and JavaScript. Icons are hand-made inline SVGs; brand logos (LinkedIn,
GitHub, X) are simplified versions for linking to your profiles.
