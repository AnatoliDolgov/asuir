# ASUIR — driver of ultra-efficient manufacturing and services

**Live site:** https://asuir.org · **Русская версия:** https://asuir.org/index_ru.html

Products manufactured in the US are at least 2.5 times cheaper than those made in China, and there is no need to protect the market with tariffs and duties.

Welcome to ASUIR — a technology that levels the standard of living across all countries by ensuring production costs are at the same level as in Bangladesh and wages are at the same level as in the US or higher.

The economic algorithms of the ASUIR platform are identical everywhere, enabling production systems to be created for any country that ensure:

Prices of manufactured goods at the level of Bangladesh + workers' salaries: at the level of Switzerland and Washington, D.C. Entrepreneur’s income : of $100,000–$1,000,000 per month;

At the same time, the entrepreneur does not need to work personally. – The calculations include wages for hired staff at the level of Switzerland and Washington, D.C.;

Production with the ability to retool equipment for a new product type involves setting up a new production line using existing equipment to manufacture related products. Once you have set up a production line, you can use the reconfiguration module to adapt it to produce new products;

The same algorithm works for services, with robotic complexes as the equipment. Example: the infusion unit of a large hospital ([ASUIR — services](https://asuir.org/ASUIRServices_en.html)):

1. The hospital's profit grows from $0.81 million to $1.04 million a month with the same 100 procedures a day, and to $2.19 million when robotic complexes let the same 80 chairs be fully used (200 procedures a day).
2. Hospital direct costs per procedure (rent, doctors, nurses, equipment) fall from $211 to $108 (−49%) and to $83 (−61%): robotic complexes do the nurses' work.
3. The full cost of a procedure including the drug falls by only 3–4%: about 90% of it is the drug, whose price in the US is set by the maker and the FDA. The cost of a medical service therefore tends to the local price of drugs.

Changeover modules for services will be added in a future update.

## What you can do on the site

| Page | What it does |
|---|---|
| [Production generator (EN)](https://asuir.org/ASUIRGeminiCalculationModule_en.html) · [RU](https://asuir.org/ASUIRGemeniCalculatOptimizer_ru.html) | A listing of ready production lines. Building your own line from the catalog: equipment, tooling, shop expenses, components with supplier links. The result: cost of one item, profit per month, comparison with the same item imported. Modules: other products the same equipment can make after buying add-ons for it. |
| [Services generator (EN)](https://asuir.org/ASUIRServices_en.html) · [RU](https://asuir.org/ASUIRServices_ru.html) | Hospital infusion unit in three variants, with country examples (USA, Moscow, UK, Germany, France, India). Visitors can save their own variants, visible only to them. |
| [Help: production](https://asuir.org/Help_en.html) · [Help: services](https://asuir.org/HelpServices.html) | Step-by-step instructions in English and Russian. |
| [asuir-ai.txt](https://asuir.org/asuir-ai.txt), [asuir-catalog.json](https://asuir.org/asuir-catalog.json), [asuir-modules.json](https://asuir.org/asuir-modules.json) | The method and reference data published for any AI assistant (Claude, ChatGPT, Gemini), so that every AI builds a line the same way. |
| [FlowSolve (EN)](https://asuir.org/flowsolve_en.html) · [RU](https://asuir.org/flowsolve.html) | A problem-solving tool (problem → ideal final result → ways to reach it). It is not finished yet. |

## How it works

The generator uses only these formulas (also published in `asuir-ai.txt`):

```
depreciation per day      = equipment price / 5 / 365
wages per day             = 10,000 x workers / 30
fixed costs per day       = depreciation + wages + shop costs per day
cost of one item          = components per item + fixed costs per day / output per day
required output per day   = fixed costs per day / (price abroad - components per item)
owner's profit per month  = (price abroad - cost of one item) x output per day x 30
```

"Price abroad" is the price of the same item at a factory abroad. The import price the buyer pays adds delivery and import duty to it.

The wage of $10,000 a month per hired worker is only an example used in the calculations. The algorithm allows higher wages, at the level of Switzerland and Washington, D.C., and above.

## Technology

- Static HTML pages with plain JavaScript. There is no build step and no server code. The site is hosted on GitHub Pages.
- Saved production lines and saved service variants are kept in Google Firebase Realtime Database, with anonymous sign-in. Database rules: everyone can read the public listing, but only the owner of a line can change or delete it. Service variants can be read only by their owner.
- The pages work in any modern browser, on a computer or a phone.

**Run your own copy:** download or clone this repository, open `index.html` in a browser, or publish the folder on any static hosting. To use your own database, replace the `firebaseConfig` block in the generator pages with the settings of your Firebase project.

## Open data

- The catalog and the modules are plain JSON: `asuir-catalog.json`, `asuir-modules.json`.
- The public listing of production lines can be downloaded as JSON without any login:
  - https://asuir-gemini-default-rtdb.firebaseio.com/equipment_listing.json (Russian)
  - https://asuir-gemini-default-rtdb.firebaseio.com/equipment_listing_en.json (English)

## Sustainable Development Goals

ASUIR is built around the UN 2030 Agenda, mainly:

- **SDG 1, No poverty**, and **SDG 10, Reduced inequalities**: the same cost of production and US-level wages in every country.
- **SDG 8, Decent work and economic growth**: every calculation pays each hired worker at the level of Switzerland and Washington, D.C. ($10,000 a month in the examples) or more.
- **SDG 9, Industry, innovation and infrastructure**: local production lines and changeover modules instead of imports.
- **SDG 3, Good health and well-being**: robotic complexes cut hospital direct costs per procedure by about half, so the cost of a medical service tends to the local price of drugs.

## Privacy

The site does not ask for names, e-mails or other personal data. Details are in the [Privacy Policy](https://asuir.org/privacy.html). Google Analytics is switched on only if the visitor agrees.

## License

- Code: [MIT License](LICENSE).
- Texts, help, formulas and methodology: [CC BY 4.0](LICENSE-TEXTS.md). You may use them for any purpose if you credit the author.

## Author and owner

Anatoli Dolgov (Анатолий Долгов), Los Angeles, California, USA. Developed with technical support from the AI assistant Claude (Anthropic).

Contact: AnatoliDolgov@outlook.com

---

## Кратко по-русски

АСУИР — бесплатный открытый генератор производств и услуг. Он выравнивает уровень жизни во всех странах: себестоимость продукции на уровне Бангладеш, зарплаты наёмных работников на уровне США и выше, без необходимости защищать рынок тарифами и пошлинами. Сайт: https://asuir.org/index_ru.html. Код — лицензия MIT, тексты и методика — CC BY 4.0. Автор: Анатолий Долгов, AnatoliDolgov@outlook.com.
