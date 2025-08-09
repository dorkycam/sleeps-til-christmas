# GitHub Workflows Documentation

This repository uses GitHub Actions for automated testing, building, and deployment.

## 🚀 Workflows Overview

### 1. Production Deployment (`deploy-production.yml`)

**Trigger:** Push to `main` branch  
**Purpose:** Deploy to production after linting and building

**Steps:**

1. **Deploy Job:**
   - 🔧 Install Yarn and dependencies
   - ✅ Lint code (`yarn lint`)
   - 🏗️ Build application (`yarn build`)
   - ☁️ Configure AWS credentials
   - 🐍 Setup Python environment for AWS EB CLI
   - 🚀 Deploy to AWS Elastic Beanstalk

**Safety:** Deployment is **blocked** if linting or build fails!

### 2. Continuous Integration (`ci.yml`)

**Trigger:** Push to `develop` branch or PRs to `develop`/`main`  
**Purpose:** Run linting, building and quality checks

**Jobs:**

- **Lint & Build:**
  - ✅ Lint code on Node.js 23.x
  - 🏗️ Build verification
  - 📦 Bundle size check
  - 🔧 Yarn installation and caching

- **Type Check:**
  - 📝 TypeScript type validation
  - 🔧 Yarn installation and caching

- **Security:**
  - 🔒 yarn audit for vulnerabilities
  - ⚠️ Fails on high/critical security issues
  - 🔧 Yarn installation and caching

### 3. Dependabot (`dependabot.yml`)

**Trigger:** Weekly (Mondays 9am EST)  
**Purpose:** Automated dependency updates

**Updates:**

- 📦 yarn packages (weekly)
- ⚙️ GitHub Actions (weekly)
- 🏷️ Auto-labels PRs as "dependencies" or "github-actions"

## 🛡️ Quality Gates

### Before Production Deployment:

1. ✅ All tests must pass
2. ✅ Code must lint successfully
3. ✅ Build must complete without errors
4. ✅ No high/critical security vulnerabilities

### For All PRs:

1. ✅ Tests pass on Node.js 23.x
2. ✅ TypeScript compiles without errors
3. ✅ Linting passes

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
   git push origin main  # Triggers deployment after linting and build
   ```

## 🔧 Local Testing Commands

```bash
yarn lint              # Run linting
yarn build             # Build application
yarn dev               # Start development server
```

## 🚨 Troubleshooting

**If deployment fails:**

1. Check GitHub Actions tab for error details
2. Common issues:
   - Linting failures → Fix code style issues and push again
   - Build errors → Check build locally with `yarn build`
   - AWS credentials → Verify secrets are set correctly

**If CI fails:**

1. Check the specific job that failed
2. Run the same command locally to debug
3. Common fixes:
   - `yarn lint` for linting issues
   - `yarn build` for build failures
   - `yarn tsc --noEmit` for TypeScript errors

The workflows ensure code quality and prevent broken deployments! 🎉
