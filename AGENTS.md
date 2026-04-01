# AGENTS.md - eduID Front

React + TypeScript SPA for Swedish eduID identity management. Uses Redux Toolkit (RTK Query), react-intl for i18n, react-final-form for forms, and react-router v7.

## Build & Run

```bash
npm install                # Install dependencies (Node >= 24.11.1, npm >= 10.9.2)
npm start                  # Dev server with webpack --watch
npm run serve              # Dev server with webpack-dev-server (port 9000)
npm run build-staging      # Staging build
npm run build-production   # Production build
make build                 # Full build (staging + production)
make prettier              # Format all files (print-width 120)
```

## Lint

```bash
npm run lint               # ESLint on src/
npm run lint:fix           # ESLint with auto-fix
```

ESLint uses flat config (`eslint.config.mjs`) with plugins: react, typescript-eslint, jest-dom, react-hooks. Unused variables must be prefixed with `_` (argsIgnorePattern `^_`).

## Test

```bash
npm test                   # Run all tests (jest)
npx jest path/to/file      # Run a single test file
npx jest --testPathPattern="LoginMain"  # Run tests matching a pattern
npx jest -t "test name"    # Run a single test by name
```

- **Framework**: Jest 30 with jest-fixed-jsdom environment
- **Libraries**: @testing-library/react, @testing-library/user-event, msw (Mock Service Worker)
- **Test location**: `src/tests/` mirroring `src/components/` structure
- **File naming**: `*-test.tsx` suffix (e.g., `LoginMain-test.tsx`)
- **Test match patterns**: `**/?(*)+(test).[jt]s?(x)` or `/__tests__/**/*-test.[jt]s?(x)`
- **Module resolution**: Paths resolve from `src/` (e.g., `import { mswServer } from "setupTests"`)

### Test Patterns

Tests use custom `render()` wrappers from `src/tests/helperFunctions/` that set up Redux store, IntlProvider, and MemoryRouter:

```typescript
import { render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";
// Each area has its own test helper: LoginTestApp-rtl, DashboardTestApp-rtl, SignupTestApp-rtl

test("renders component", async () => {
  mswServer.use(http.post("/endpoint", () => HttpResponse.json({ payload })));
  render(<Component />, { state: customState, routes: ["/path"] });
  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(/expected/);
});
```

MSW server (`mswServer`) is configured globally in `src/setupTests.ts` -- import it directly in tests.

## TypeScript Configuration

- **Strict mode**: Enabled (all strict checks active)
- **Target**: ES6
- **Base URL**: `src/` (imports resolve from src without `../` prefixes)
- **JSX**: react-jsx (no need to import React for JSX)
- **Module resolution**: node

## Code Style

### Imports

Order imports in this sequence:
1. Third-party libraries (`react`, `@reduxjs/toolkit`, `react-intl`, etc.)
2. API modules (`apis/eduidLogin`, `apis/eduidSignup`)
3. Components (`components/Common/EduIDButton`, `components/Login/Login`)
4. Local utilities and hooks (`eduid-hooks`, `eduid-init-app`)
5. Redux slices (`slices/Login`, `slices/Notifications`)
6. Relative imports (`./MultiFactorAuth`, `../../slices/Login`)
7. Styles (`../../styles/index.scss`)

Use path aliases from `src/` base -- e.g., `import { loginApi } from "apis/eduidLogin"` not `"../../apis/eduidLogin"`. Relative imports (`./`, `../`) are used for siblings and nearby modules.

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `Login`, `EduIDButton`, `MultiFactorAuth` |
| Component files | PascalCase.tsx | `Login.tsx`, `EduIDButton.tsx` |
| API files | camelCase with `eduid` prefix | `eduidLogin.ts`, `eduidSignup.ts` |
| Slice files | PascalCase | `Login.ts`, `Signup.ts` |
| Test files | ComponentName-test.tsx | `LoginMain-test.tsx` |
| Hooks | camelCase with `use` prefix | `useAppDispatch`, `useAppSelector` |
| Variables/functions | camelCase | `fetchNext`, `loginTestState` |
| Constants | UPPER_SNAKE_CASE | `SIGNUP_BASE_PATH`, `HAS_READ_ANNOUNCEMENT` |
| Interfaces | PascalCase (no `I` prefix) | `LoginParams`, `LoginNextRequest` |
| Type aliases | PascalCase | `LoginErrorInfoResponse` |

### Types

- Use `interface` for object shapes and API request/response contracts
- Use `type` for unions and aliases: `type AuthMethod = "eidas" | "freja" | "bankid"`
- Explicit return type `React.JSX.Element` on components
- Props use `Readonly<{ children: React.ReactNode }>` pattern
- Discriminated unions for API responses (e.g., `logged_in: true` vs `logged_in: false`)
- Unused parameters must be prefixed with `_` to satisfy ESLint

### Components

- Functional components only (no class components)
- Use typed Redux hooks: `useAppDispatch()`, `useAppSelector()`
- Use `useIntl()` + `<FormattedMessage>` for all user-visible text (never hardcode strings)
- Forms use `react-final-form` (`<Form>`, `<Field>`)
- RTK Query hooks for API calls: `useLazyFetchNextQuery()`, `useFetchStateQuery()`

### Error Handling

- API errors follow typed `ApiResponse<T> | ApiError<T>` pattern with type guards
- Custom `customBaseQuery` in `apis/common.ts` handles CSRF tokens and error normalization
- User-facing errors go through Redux notification system: `showNotification({ message, level })`
- No raw try-catch for API calls -- RTK Query handles async error flow

### Internationalization

All user-visible text must use react-intl. Never hardcode display strings.

```typescript
// In JSX:
<FormattedMessage id="unique.id" defaultMessage="English text" />

// In code:
const intl = useIntl();
intl.formatMessage({ id: "unique.id", defaultMessage: "English text" });

// Document titles:
document.title = intl.formatMessage({ id: "document title Log in", defaultMessage: "Log in | eduID" });
```

Extract translations after adding new messages:
```bash
npm run translations:extract
```

### Formatting

- Print width: 120 characters (via Prettier)
- Format with: `make prettier` or `npx prettier --write --print-width 120 .`
- Use double quotes for imports (enforced by default config)
- Trailing commas in multi-line structures

## Project Structure

```
src/
  apis/              # RTK Query API definitions per service (eduidLogin.ts, eduidSignup.ts, ...)
  components/        # React components organized by feature area
    Common/          # Shared components (EduIDButton, ReduxIntl, ...)
    Dashboard/       # Dashboard feature components
    Login/           # Login flow components
    Signup/          # Registration components
    ResetPassword/   # Password reset components
  slices/            # Redux Toolkit slices per feature (Login.ts, Signup.ts, ...)
  helperFunctions/   # Utilities, validators, type guards
  translation/       # i18n message catalogs (extractedMessages.json)
  entry-points/      # App entry point (index.tsx)
  styles/            # SCSS stylesheets
  tests/             # Test files mirroring components/ structure
    helperFunctions/ # Test utilities (render wrappers, test state factories)
```

## CI Checks

All of these must pass before merge (from `.github/workflows/run-tests.yaml`):
1. `make test` -- builds and runs full test suite
2. `npm run lint` -- ESLint checks
3. `npx audit-ci --skip-dev` -- security audit (production deps)
