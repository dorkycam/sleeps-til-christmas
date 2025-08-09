# GitHub Workflows Documentation

This repository uses GitHub Actions for automated testing, building, and deployment.

## 🚀 Workflows Overview

### 1. Production Deployment (`deploy-production.yml`)

**Trigger:** Push to `main` branch  
**Purpose:** Deploy to production after running full test suite

**Steps:**

1. **Test Job:**
   - ✅ Lint code (`npm run lint`)
   - 🧪 Run test suite (`npm test`)
   - 🏗️ Build verification (`npm run build`)

2. **Deploy Job:** (only runs if tests pass)
   - 🏗️ Build application
   - ☁️ Configure AWS credentials
   - 🚀 Deploy to AWS Elastic Beanstalk

**Safety:** Deployment is **blocked** if any tests fail!

### 2. Continuous Integration (`ci.yml`)

**Trigger:** Push to `develop` branch or PRs to `develop`/`main`  
**Purpose:** Run comprehensive testing and quality checks

**Jobs:**

- **Test & Build:**
  - 🧪 Run tests with coverage on Node.js 18.x & 20.x
  - 📊 Upload coverage to Codecov
  - 🏗️ Build verification
  - 📦 Bundle size check

- **Type Check:**
  - 📝 TypeScript type validation

- **Security:**
  - 🔒 npm audit for vulnerabilities
  - ⚠️ Fails on high/critical security issues

### 3. Dependabot (`dependabot.yml`)

**Trigger:** Weekly (Mondays 9am EST)  
**Purpose:** Automated dependency updates

**Updates:**

- 📦 npm packages (weekly)
- ⚙️ GitHub Actions (weekly)
- 🏷️ Auto-labels PRs as "dependencies" or "github-actions"

## 🛡️ Quality Gates

### Before Production Deployment:

1. ✅ All tests must pass
2. ✅ Code must lint successfully
3. ✅ Build must complete without errors
4. ✅ No high/critical security vulnerabilities

### For All PRs:

1. ✅ Tests pass on Node.js 18.x & 20.x
2. ✅ TypeScript compiles without errors
3. ✅ Linting passes
4. ✅ Security audit passes

## 📊 Status Badges

The README shows real-time status:

- [![CI](https://github.com/dorkycam/sleeps-til-christmas/actions/workflows/ci.yml/badge.svg)](https://github.com/dorkycam/sleeps-til-christmas/actions/workflows/ci.yml)
- [![Deploy](https://github.com/dorkycam/sleeps-til-christmas/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/dorkycam/sleeps-til-christmas/actions/workflows/deploy-production.yml)

## 🔄 Recommended Workflow

1. **Development:**

   ```bash
   git checkout develop
   git pull origin develop
   # Make changes
   npm test          # Run tests locally
   npm run lint      # Check linting
   git push origin develop  # Triggers CI
   ```

2. **Pull Request:**

   ```bash
   git checkout -b feature/my-feature
   # Make changes
   git push origin feature/my-feature
   # Create PR to develop → CI runs automatically
   ```

3. **Production Release:**
   ```bash
   git checkout main
   git merge develop
   git push origin main  # Triggers deployment after tests
   ```

## 🔧 Local Testing Commands

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint          # Run linting
npm run build         # Build application
```

## 🚨 Troubleshooting

**If deployment fails:**

1. Check GitHub Actions tab for error details
2. Common issues:
   - Test failures → Fix tests and push again
   - Build errors → Check build locally with `npm run build`
   - AWS credentials → Verify secrets are set correctly

**If CI fails:**

1. Check the specific job that failed
2. Run the same command locally to debug
3. Common fixes:
   - `npm run lint` for linting issues
   - `npm test` for test failures
   - `npx tsc --noEmit` for TypeScript errors

The workflows ensure code quality and prevent broken deployments! 🎉
