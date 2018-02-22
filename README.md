# Jam3 Generator v2
Second generation of the Jam3 Generator, many new features and breaking feature changes.

## Features
* Webpack
  * create-react-app
  * react-app-rewired
  * pre-builds
  * post-builds
  * Kept the same structure than the generator
* Code splitting
  * By routes (component loaded)
  * First chunk merged into the main chunk
* Improved unsupported algorithm for the frontend
  * Inclusive
  * Not repeated bowser + mobile-detect
  * Added to the main bundle (In progress)
* React Router v4 + Redux + Transition Group
* `react-addons-perf` by `why-did-you-update`
* Inline Critical CSS
* Resolutions
  * Scalable strategy using rem (supported every resolution)
* Linters
  * ESLint
  * Styleling
  * Disallow git push if there is a violation in the linters
    * This is also checked in the CI
* Formaters
  * Prettier in every IDE
  * Runs automatically after every commit
* Added Storybook
* PWA
  * Service Worker
  * Basic Manifest
* Lazy loading images by scrolled
* WebP images (server side)
* Tracking
  * Completely trackeable using GTM
  * GA
  * FB Pixel
* Scripts
  * Everything is defer or async
  * Main bundle with many chunks
* Accesibility
  * No Images without alt (Decorative + Content)
  * Right tags for every context
  * Contrast-fontsize perfect
  * Site scalable (no restricted the viewport)
* SEO
  * Proper metatags for every page
  * Sitemap page
  * Sitemap.xml
  * Google/Bing Web master tool
  * Canonical tags
  * Proper robots.txt
* Security
  * Package checking: NSP + SNYK + Github
  * Cross-site scripting (XSS)
  * Cross-Site Request Forgery (CSRF)
  * Protected public access to the API
  * Added content-security-policy (CSP)
  * Disallow iframed - x-frame-options (XFO)
  * X-XSS-Protection -> on
  * X-Content-Type-Options -> nosniff
* CMS
  * Dynamic content everywhere (Content, menu)
  * Dynamic routes from the CMS
  * Rest APIs for every content
  * First load doesn't fetch from the API
* Fonts
  * Standarized browser strategy
  * Not render blocking fonts
* Component builder
  * Script to create components (classes and stateless)
* Browserslist
  * Polyfills
  * Autoprefixr
* Animations
  * Very lite version of gsap-promises
  * raf
  * debounced events
* Big supported device matrix
* Green License checking
* CSS Standards
  * SASS
  * anim.scss + fonts.scss + global.scss + mixins.scss + polyfills.scss + shared.scss + vars.scss
  * Everything that is reusable will be in vars.scss
  * Basic color palette + variable for every case
* Project WIKI
* Basic project rules
  * CODE_OF_CONDUCT.md
  * CODE_REVIEW.md
  * CONTRIBUTING.md
  * FEATURES.md
* Modernizr -> Progressive enhancement 
* Pull Request
  * Templates
  * Lead + Optional reviewer
  * Included the owner of the project (by commiter or lead dev)
* Printing styling

