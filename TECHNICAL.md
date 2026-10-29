# ASUIR — Technical description

Author and owner: Anatoli Dolgov. Code: MIT License. Texts, formulas and methodology: CC BY 4.0.
Live site: https://asuir.org · Repository: https://github.com/AnatoliDolgov/asuir

## 1. What the system consists of

| File | Purpose |
|---|---|
| `index.html`, `index_ru.html` | Home page (English, Russian) |
| `ASUIRGeminiCalculationModule_en.html`, `ASUIRGemeniCalculatOptimizer_ru.html` | **Production generator**: listing of production lines, line builder (6 tabs), modules |
| `ASUIRServices_en.html`, `ASUIRServices_ru.html` | **Services generator**: hospital infusion unit, three options, users' own saved options |
| `Help_en.html` (EN + RU), `HelpServices.html` (EN + RU) | User help, step by step |
| `privacy.html` | Privacy policy (EN + RU) |
| `asuir-ai.txt` | The calculation method, published for people and AI assistants |
| `asuir-catalog.json` | Reference data: production topics, product classes, equipment, parts, shop costs, price of the same product abroad |
| `asuir-modules.json` | Changeover modules: other products the same equipment can make after buying add-ons |
| `flowsolve.html`, `flowsolve_en.html`, `flowsolve-proxy.js` | FlowSolve problem-solving tool (not finished) |
| `css/`, `icons/`, `libraries/` | Styles, icon font, jQuery and Bootstrap (home and help pages) |
| `LICENSE`, `LICENSE-TEXTS.md`, `README.md`, `CNAME` | Licences, overview, domain |

## 2. Architecture

- Static HTML pages with plain JavaScript. No server code, no build step, no framework.
- Hosting: GitHub Pages (any static web server works).
- Each page is self-contained: markup, styles and calculation code are in one file. The production catalog and the modules are also embedded in the generator pages, so the calculation works without loading any external data.
- Storage: Google Firebase Realtime Database (Firebase JS SDK 10.12.2, loaded from gstatic.com) with anonymous sign-in. Used only to save production lines and service options; all calculations run in the browser.
- Two languages: each page exists as a Russian and an English file with the same logic.
- Optional third-party calls: Google Analytics (only after the visitor presses "Agree"); MyMemory translation API (translates a supplier search phrase into English when the visitor presses "Search").
- Supplier search links open: Alibaba, 1688.com, Made-in-China, IndiaMART, LCSC, Octopart, Machinio.

## 3. Calculation — production generator

```
depreciation per day        = equipment price / 5 / 365
wages per day               = 10,000 × workers / 30            (10,000 $/month is an example; editable)
fixed costs per day         = depreciation + wages + shop costs per day
parts per item              = Σ (qty × price) × (1 + duty on imported parts %)
cost of one item            = parts per item + fixed costs per day / output per day
required output per day     = fixed costs per day / (price abroad − parts per item), rounded up
owner's profit per month    = (price abroad − cost of one item) × output per day × 30
price paid for the imported item = price abroad × (1 + freight % + import duty %)
```

"Price abroad" is the price of the same item at a factory abroad.

- **Sales:** if the visitor enters real sales per day, the cost and profit are recalculated at that volume. *Safety margin* = (sales − required output) / sales.
- **Countries:** no specific country, USA (import duty 20%, freight 10%, duty on parts 20%), European Union (5%, 10%, 3%). All values are editable. Import-market size comes from UN Comtrade 2024 for 27 countries.
- **Robotic complexes (outlook):** wages are replaced by depreciation and maintenance of the complexes: complexes × price × (1 / service life + maintenance %) / 365. The line can work up to 24 hours: output = base output × hours / 8.
- **Modules:** a module's price is added to the equipment price; output, parts and the price abroad are taken from the new product.

## 4. Calculation — services generator (infusion unit)

```
rent per day                = rent per year / working days per year
doctors per day             = doctors per 100 procedures × procedures / 100 × doctor's pay / working days per month
nurses per day              = nurses per 100 procedures × procedures / 100 × nurse's pay / working days per month
robotic complexes           = ⌈ procedures per day × minutes per patient / (admitting hours × 60) ⌉
complexes per day           = complexes × price × (1 / service life + maintenance %) / working days per year
chair equipment per day     = chairs × price per chair / service life / working days per year
direct costs per day        = rent + doctors + nurses + complexes + chair equipment
direct costs per procedure  = direct costs per day / procedures per day
full cost of a procedure    = drug + direct costs per procedure
hospital profit per month   = (payment without the drug − direct costs per procedure) × procedures per day × working days per month
chair capacity per day      = chairs × working hours / (procedure + chair preparation)
```

The drug is not a direct cost: it is the "component" of the procedure. In the US its price is set by the manufacturer and the FDA, so the full cost of a procedure tends to the local price of the drug.

## 5. Data stored in the database

| Path | Content | Who can read | Who can write |
|---|---|---|---|
| `equipment_listing` (RU), `equipment_listing_en` (EN) | Saved production lines | everyone | only the owner of a line (`owner_uid` = anonymous ID) |
| `service_variants/{uid}` | A visitor's saved service options | only that visitor | only that visitor |

Fields of one production line: `name`, `url`, `topic_title`, `class_key`, `country_key`, `cost` (equipment price, $), `perf` (items per day), `staff`, `components` [{`name`, `url`, `qty`, `price`}], `expenses` [{`name`, `url`, `qty`, `price` per day}], `market_price`, `tariff`, `freight`, `comp_tariff`, `sales_per_day`, `product_name`, `module_items` [{`name`, `url`, `price`}], `client_id`, `owner_uid`, `created_at`.

Fields of one service option: `name`, `created`, `inputs` (all input values of the generator), `rows` (results of the three options), `info`.

Database rules are in `database.rules.json` (Firebase console → Realtime Database → Rules).

## 6. Reference data files

- `asuir-catalog.json`: `{topic_key: {topic, classes: {class_key: {class_name, equipment, equipment_price_usd, output_per_day, workers, price_same_product_factory_abroad_usd, parts_per_piece: [{name, qty, price_usd}], shop_costs_per_day: [{name, qty, price_usd_per_day}]}}}}`
- `asuir-modules.json`: `[{group, topics: [topic_key], equipment_that_stays: [...], products: [{product, status, catalog_ref, module_items: [{name, search, url}], ...}]}]`

## 7. Getting the data out

- Catalog and modules: the JSON files above.
- Public listing of production lines, no login: `https://asuir-gemini-default-rtdb.firebaseio.com/equipment_listing.json` and `…/equipment_listing_en.json`
- Every calculation can be printed or saved as PDF from the page.

## 8. Running your own copy

1. Download or clone the repository.
2. Open `index.html` in a browser, or put the folder on any static hosting.
3. To save lines in your own database: create a Firebase project, enable Realtime Database and anonymous sign-in, publish the rules from `database.rules.json`, and replace the `firebaseConfig` block in the generator pages with your project's settings.
4. To change the catalog: edit the catalog object in the generator pages (and `asuir-catalog.json` for AI assistants).

## 9. Browser support

Any current browser (Chrome, Edge, Firefox, Safari), on a computer or a phone. JavaScript must be enabled.
