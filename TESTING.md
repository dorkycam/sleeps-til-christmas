# Testing Guide

This project uses Jest and React Testing Library for comprehensive testing.

## 🧪 Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Test Structure

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── holidays.test.ts       # Holiday database tests
│   │   └── metadata.test.ts       # SEO metadata tests
│   └── utils/
│       └── __tests__/
│           └── countdown.test.ts   # Countdown logic tests
```

## ✅ What's Tested

### Countdown Logic (`countdown.test.ts`)

- ✅ Accurate day calculations (139 days from Aug 8 to Dec 25)
- ✅ Leap year handling
- ✅ Year rollover (when holiday has passed)
- ✅ "Today is the holiday" scenarios
- ✅ Edge cases (Feb 29, New Year rollover)

### Holiday Database (`holidays.test.ts`)

- ✅ Data structure validation
- ✅ Holiday lookup functions
- ✅ Type safety and validation
- ✅ Specific holiday data accuracy

### SEO Metadata (`metadata.test.ts`)

- ✅ Dynamic title generation
- ✅ Open Graph social cards
- ✅ Twitter card metadata
- ✅ SEO robots configuration
- ✅ URL generation

## 🎯 Coverage Goals

- **80%** minimum coverage across all metrics
- **Functions**: 80%
- **Lines**: 80%
- **Branches**: 80%
- **Statements**: 80%

## 🛠️ Test Features

### Fixed Test Date

Tests use a mocked date of **August 8, 2024** for consistent results:

```typescript
// Always returns Aug 8, 2024 for predictable testing
jest.mock('dayjs', () => ...)
```

### Comprehensive Edge Cases

- **Leap years**: Feb 29 handling
- **Year boundaries**: Dec 30 → next Christmas
- **Same day**: When today is the holiday
- **Single day**: Tomorrow scenarios

### Type Safety Testing

Tests verify TypeScript type safety:

```typescript
// Ensures only valid slugs are accepted
const holiday = getHolidayBySlugSafe('christmas'); // ✅
const invalid = getHolidayBySlugSafe('easter'); // ❌ TypeScript error
```

## 🚀 Running Tests Before Commit

```bash
# Full test suite with linting
npm run lint && npm test

# With coverage report
npm run test:coverage
```

## 📊 Test Output Example

```
PASS src/lib/utils/__tests__/countdown.test.ts
PASS src/lib/__tests__/holidays.test.ts
PASS src/lib/__tests__/metadata.test.ts

Test Suites: 3 passed, 3 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        2.854 s

Coverage:
File                    | % Stmts | % Branch | % Funcs | % Lines
------------------------|---------|----------|---------|--------
countdown.ts           |   95.24 |    88.89 |     100 |   94.74
holidays.ts            |     100 |      100 |     100 |     100
metadata.ts            |   91.67 |    83.33 |     100 |   90.91
```

The test suite ensures reliability and prevents regressions! 🎉
