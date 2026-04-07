# eduID Frontend Design System

This document describes the design system used in the eduID frontend application. It serves as a reference for maintaining visual consistency and understanding the established patterns.

---

## Color Palette

### CSS Custom Properties (Light Mode)

Colors are defined as CSS custom properties on `:root` to support runtime theme switching.

| Token                | Value       | Usage                          |
|----------------------|-------------|--------------------------------|
| `--contrast-color`   | `#fff`      | Card/modal backgrounds         |
| `--body-txt`         | `#161616`   | Primary body text              |
| `--body-gray`        | `#f4f4f4`   | Page background                |
| `--txt-gray`         | `#5e5e5e`   | Secondary text, text on gray   |
| `--border-gray`      | `#d8d8d8`   | Borders, dividers              |
| `--txt-orange`       | `#c23400`   | Orange text on gray/orange bg  |
| `--bg-orange`        | `#ffe7dd`   | Orange tinted backgrounds      |
| `--error-red`        | `#d2143a`   | Error states                   |
| `--error-red-t`      | `#d2143a80` | Error with 50% transparency    |
| `--bg-gray`          | `#ebebeb`   | Secondary backgrounds          |
| `--shadow-green`     | `#c1e1cd`   | Success shadow/highlight       |
| `--txt-green`        | `#12633d`   | Success text                   |
| `--bright-orange`    | `#ff4500`   | Brand color, highlights        |
| `--btn-orange`       | `#db3a00`   | Button backgrounds             |
| `--success-green`    | `#177d4d`   | Success indicators             |

### Dark Mode Overrides

Applied via `html.dark` class. Defined in `src/styles/darkmode.css`.

| Token                | Dark Value  |
|----------------------|-------------|
| `--contrast-color`   | `#000`      |
| `--body-txt`         | `#f4f4f4`   |
| `--body-gray`        | `#2e2e2e`   |
| `--txt-gray`         | `#bdbdbd`   |
| `--border-gray`      | `#5e5e5e`   |
| `--txt-orange`       | `#ff6d32`   |
| `--bg-orange`        | `#36251e`   |
| `--error-red`        | `#ff5965`   |
| `--error-red-t`      | `#ff596580` |
| `--bg-gray`          | `#202020`   |
| `--shadow-green`     | `#177d4d`   |
| `--txt-green`        | `#30d98a`   |

Dark mode is managed by `ThemeContext` (React Context + localStorage), respects `prefers-color-scheme`, and toggles via `ThemeToggle` in the footer.

---

## Typography

### Font Families

| Token              | Font Stack                                           | Usage               |
|--------------------|------------------------------------------------------|---------------------|
| `--inter-regular`  | Inter-Regular, Arial, Helvetica, sans-serif          | Body text            |
| `--inter-bold`     | Inter-SemiBold, Arial, Helvetica, sans-serif         | Bold/emphasis        |
| `--inter-medium`   | Inter-Medium, Arial, Helvetica, sans-serif           | Medium weight        |
| `--inter-light`    | Inter-light, Arial, Helvetica, sans-serif            | Light/secondary      |
| `--akkurat`        | Akkurat, Arial, Helvetica, sans-serif                | Buttons (uppercase)  |

Font files are loaded via `@font-face` in `src/styles/fonts.css`.

### Font Scale

| Token      | Size       | Pixels | Usage                    |
|------------|------------|--------|--------------------------|
| `--txt-xs`  | `0.75rem`  | 12px   | Fine print, captions     |
| `--txt-sm`  | `0.875rem` | 14px   | Small text, labels       |
| `--txt-md`  | `1rem`     | 16px   | Body text (default)      |
| `--txt-lg`  | `1.125rem` | 18px   | Large body text          |
| `--txt-xl`  | `1.25rem`  | 20px   | Subheadings              |
| `--txt-xxl` | `1.375rem` | 22px   | Large subheadings        |

### Headings

| Element | Desktop   | Mobile     | Line Height |
|---------|-----------|------------|-------------|
| h1      | `2rem`    | `1.75rem`  | 1.2         |
| h2      | `1.5rem`  | `1.375rem` | 1.2         |
| h3      | `1.375rem`| `1.25rem`  | 1.2         |
| h4      | `1.25rem` | `1.25rem`  | 1.2         |
| h5      | `--txt-sm` | `--txt-sm`  | 1.2         |

### Line Height

Default: `--line-height: 1.4`

---

## Spacing

### Base Units

| Token          | Value      | Usage                |
|----------------|------------|----------------------|
| `--margin`      | `1rem`     | Primary spacing unit |
| `--list-indent` | `2.25rem`  | List indentation     |

### Common Spacing Values

Spacing is not a strict token scale but follows these recurring values:

- **Tight:** 0.25rem, 0.5rem, 0.75rem
- **Standard:** 1rem, 1.125rem, 1.25rem
- **Comfortable:** 1.5rem, 1.75rem, 2rem
- **Generous:** 2.5rem, 3.5rem, 4rem

### Component Spacing

| Context               | Value                        |
|-----------------------|------------------------------|
| Button padding        | `0 1.125rem` (height 3rem)   |
| Small button padding  | `0.5rem 1rem`                |
| Input height          | `3rem`                       |
| Input padding         | `1.25rem 0.5rem`             |
| Modal header padding  | `1.5rem 1.5rem 0`            |
| Modal body padding    | `0 1.5rem 1rem`              |
| Article margin-bottom | `2.5rem` (desktop), `1.75rem` (mobile) |

---

## Layout

### Content Container

The main content area uses `.horizontal-content-margin` with responsive width scaling:

| Breakpoint   | Width                           |
|--------------|---------------------------------|
| Desktop      | 58%, max-width 870px            |
| `--bp-lg`    | `calc(80% - 2rem)`             |
| `--bp-md`    | `calc(80% - 1.25rem)`          |
| `--bp-sm`    | `calc(100% - 2rem)`            |
| `--bp-xs`    | `calc(100% - 2 * var(--margin))` |

### Page Structure

```
<div class="page-wrapper">
  <Header />
  <main id="panel" class="panel">
    <Notifications />         <!-- Sticky notification bar -->
    <ErrorBoundary>
      <Splash>                <!-- Loading spinner overlay -->
        <section id="content" class="horizontal-content-margin content">
          <Routes />          <!-- Page content -->
        </section>
      </Splash>
    </ErrorBoundary>
  </main>
  <Footer />
</div>
```

### Breakpoints

Defined as `@custom-media` rules in `variables.css`, resolved at build time by `postcss-custom-media`.

| Token      | Value    | Target           |
|------------|----------|------------------|
| `--bp-xs`  | `414px`  | Small phones     |
| `--bp-sm`  | `568px`  | Large phones     |
| `--bp-md`  | `768px`  | Tablets          |
| `--bp-lg`  | `823px`  | Small desktop    |
| `--bp-xl`  | `1200px` | Full desktop     |

The approach is primarily desktop-first with `max-width` media queries for smaller screens, though some layout patterns use `min-width`.

---

## Components

### Buttons (`EduIDButton`)

All buttons use the `EduIDButton` component with a `buttonstyle` string prop. Variants are composable (e.g., `"primary sm"`, `"secondary icon sm"`).

| Variant         | Appearance                                            |
|-----------------|-------------------------------------------------------|
| `primary`       | Orange background (`--btn-orange`), white text          |
| `secondary`     | Transparent background, orange border, orange text     |
| `link`          | Text-only, orange, underline on hover                  |
| `close`         | X icon via CSS pseudo-elements                         |
| `icon`          | Flex layout with icon + text                           |
| `sm`            | Smaller padding and font size                          |
| `normal-case`   | No uppercase transform                                 |
| `refresh`       | 360deg rotation on hover                               |

**Common button styles:** Akkurat bold, uppercase, 1px letter-spacing, 3rem height, 1.5rem border-radius, `transition: all 0.3s ease`.

### Form Inputs

Built on `react-final-form`. Key components:

| Component          | Purpose                                    |
|--------------------|--------------------------------------------|
| `CustomInput`      | Standard text input with validation        |
| `EmailInput`       | Pre-configured email input                 |
| `PasswordInput`    | With show/hide toggle                      |
| `NewPasswordInput` | For password change flows                  |
| `EduIDTextInput`   | Simple labeled text input                  |
| `InputWrapper`     | Label, help text, and error display        |

**Form layout classes:**
- `.form-wrapper` — min-height 6rem
- `.input-pair` — two inputs side-by-side on desktop, stacked on mobile
- `.single-input-form` — input + button on one row
- `.buttons` — flex container with 1rem gap

### Modals

Use the native `<dialog>` HTML element. Structure: `.modal > .modal-dialog > .modal-content`.

| Component           | Purpose                                     |
|---------------------|---------------------------------------------|
| `ConfirmModal`      | Form-based confirmation with validation     |
| `NotificationModal` | Read-only information with single action    |
| `VerifyCredentialModal` | Multi-button authentication selection   |

**Modal styles:** max-width `calc(870px - 4rem)`, 20px border-radius, backdrop `rgba(0, 0, 0, 0.5)`.

### Accordion

Uses native `<details>` / `<summary>` elements via `AccordionItemTemplate`. Supports hash-based URL targeting for deep linking.

**Styles:** 2px border, 6px border-radius, fadein animation (0.2s), orange background on open/hover.

### Notifications

Sticky bar at top of viewport (z-index 150, opacity 0.95). Shows errors first, then info. Auto-dismisses success messages. Uses `aria-live="polite"`.

### Tooltip

Circular trigger button (2.25rem), absolute-positioned popover (min-width 250px), z-index 1000. Hover and click activated.

### Select

Uses `react-select` with custom styling. Standard variant has 2px border. MFA variant has button-like appearance (3rem height, 1.5rem border-radius, orange border, Akkurat uppercase text).

### Toggle Switch

`ThemeToggle` component: 54px wide, 28px tall, 16px border-radius, 22px inner circle.

### Password Strength Meter

Uses lazy-loaded `zxcvbn`. Displays `<meter>` element with score 0-4 mapping to "terrible" through "strong".

---

## Borders & Shadows

### Border Radius

| Value   | Usage                                    |
|---------|------------------------------------------|
| `20px`  | Modals, buttons (also `1.5rem`)          |
| `10px`  | Accordion, cards, tooltips, submenus     |
| `6px`   | Nested accordion items                   |
| `4px`   | react-select                             |
| `50%`   | Circular elements (toggle, radio, tooltip trigger) |

### Box Shadows

Defined as CSS custom properties on `:root` in `variables.css`.

| Token          | Value                                       | Usage                              |
|----------------|---------------------------------------------|------------------------------------|
| `--shadow-sm`  | `0 1px 3px 2px rgb(0 0 0 / 5%)`            | Accordion, status boxes, icons     |
| `--shadow-md`  | `0 4px 14px rgb(89 89 89 / 7%)`            | Login options, tooltips            |
| `--shadow-lg`  | `0 5px 17px rgb(89 89 89 / 7%)`            | Buttons, radio buttons             |
| `--shadow-nav` | `0 -6px 17px rgba(89, 89, 89, 0.07)`       | Header navigation (box + drop)     |

### Border Width

Default: `--border-width: 2px`

---

## Z-Index Scale

| Value  | Usage                         |
|--------|-------------------------------|
| 5      | Copy button tooltip           |
| 100    | Modals, header submenus       |
| 150    | Notification bar              |
| 200    | Mobile nav menu               |
| 1000   | Custom tooltips               |

---

## Transitions & Animation

| Value                       | Usage                            |
|-----------------------------|----------------------------------|
| `all 0.3s ease`            | Buttons                          |
| `all 0.2s ease`            | Links                            |
| `all 0.1s ease-in`         | Accordion toggle                 |
| `all 0.25s`                | Toggle switch                    |
| `all 0.5s ease`            | Mobile menu                      |
| `opacity 0.3s`             | Modal backdrop                   |
| `fadein 0.2s ease-in`      | Accordion content (keyframe)     |

The app respects `prefers-reduced-motion` for scroll behavior.

---

## Accessibility

- **Semantic HTML:** `<dialog>` for modals, `<details>`/`<summary>` for accordions, `<meter>` for password strength
- **ARIA:** `aria-live="polite"` on notifications, `role="alert"` on validation errors, `aria-required` on inputs, `aria-labelledby` linking details to summaries
- **Focus management:** `autoFocus` on modal inputs, `tabIndex={-1}` on error messages, 2px dashed outline on focus
- **Keyboard navigation:** Native element behavior, visible focus states on all interactive elements
- **Visually hidden text:** `.visuallyhidden` class for screen-reader-only content
- **Reduced motion:** `prefers-reduced-motion` check before smooth scrolling
- **Safe areas:** `env(safe-area-inset-*)` padding for notched devices

---

## Internationalization

- **Library:** react-intl (FormatJS)
- **Languages:** English (`en`), Swedish (`sv`)
- **Usage:** All user-facing strings use `<FormattedMessage>` or `intl.formatMessage()`
- **State:** Language stored in Redux, synced with `IntlProvider`
- **Detection:** Initial language from `navigator.languages[0]`
- **Switching:** Language selector in footer dispatches `updateIntl({ locale, messages })`

---

## Technology Stack

| Concern           | Library                             |
|-------------------|-------------------------------------|
| UI framework      | React 19, TypeScript                |
| State             | Redux Toolkit, RTK Query            |
| Forms             | react-final-form                    |
| Routing           | react-router 7                      |
| i18n              | react-intl                          |
| Icons             | FontAwesome 7 (free-solid-svg-icons)|
| Select            | react-select                        |
| Loading spinner   | spin.js                             |
| Password strength | zxcvbn (lazy)                       |
| Styling           | Plain CSS + CSS custom properties   |
| Build             | Webpack 5                           |

---

## Style File Organization

```
src/styles/
  variables.css          Color tokens, typography, breakpoints, layout
  base.css               Panel, content containers, page layout
  reset.css              CSS reset
  typography.css         Heading and text styles
  fonts.css              @font-face declarations
  darkmode.css           Dark theme CSS variable overrides
  buttons.css            All button variants
  inputs.css             Input field styles
  forms.css              Form layout patterns
  modals.css             Modal dialog styling
  accordion.css          Accordion component
  Notifications.css      Alert/notification bar
  reactSelect.css        react-select overrides
  Header.css             Header and navigation
  Footer.css             Footer
  links.css              Link styling
  Splash.css             Loading spinner
  [Feature].css          Feature-specific styles
```
