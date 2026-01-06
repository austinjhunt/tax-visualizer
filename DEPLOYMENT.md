# GitHub Pages Deployment Guide

This guide will help you deploy the Tax Visualizer to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. The tax visualizer project set up locally

## Step-by-Step Setup

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `tax-visualizer`)
4. Choose "Public" (required for free GitHub Pages)
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### 2. Prepare Your Local Project

Make sure your project has the following structure:

```
tax-visualizer/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── src/
│   ├── App.jsx                 ← Your tax visualizer code
│   ├── index.css              ← Tailwind imports
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js              ← Important: base path configuration
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 3. Update vite.config.js

Ensure your `vite.config.js` has the correct base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tax-visualizer/', // Replace with your repo name
})
```

**Important**: Change `tax-visualizer` to match your actual repository name!

### 4. Initialize Git and Push to GitHub

```bash
# Navigate to your project directory
cd tax-visualizer

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Click "Save"

### 6. Deploy

The deployment happens automatically! Once you push to the `main` branch:

1. GitHub Actions will run automatically
2. Go to the "Actions" tab to watch the deployment
3. Once complete (usually 2-3 minutes), your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

## Verifying Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the progress
4. Green checkmarks = successful deployment! ✅

## Troubleshooting

### Issue: Site shows 404 or doesn't load properly

**Solution**: Check your `vite.config.js` base path matches your repository name exactly.

```javascript
// If your repo is named "my-tax-app", use:
base: '/my-tax-app/',

// If your repo is named "tax-visualizer", use:
base: '/tax-visualizer/',
```

### Issue: CSS not loading (white unstyled page)

**Solution**: Ensure you installed Tailwind CSS and configured it properly:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

And that your `src/index.css` has:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: GitHub Actions workflow fails

**Solution**: Check the Actions tab for error messages. Common issues:
- Missing `package.json` or `package-lock.json`
- Wrong Node version (use Node 18 or 20)
- Build errors in your code

### Issue: Deployment succeeds but changes don't appear

**Solution**: 
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 1-2 minutes for GitHub CDN to update
3. Check that you pushed to the `main` branch

## Custom Domain (Optional)

To use a custom domain like `tax-visualizer.com`:

1. Buy a domain from a registrar (GoDaddy, Namecheap, etc.)
2. In your GitHub repo settings, under "Pages", add your custom domain
3. In your domain registrar, add these DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```
4. Add a CNAME file in your `public/` folder with your domain name

## Updating Your Site

To update your deployed site:

```bash
# Make your changes to the code

# Commit and push
git add .
git commit -m "Updated tax calculations"
git push

# GitHub Actions will automatically redeploy!
```

## Repository Settings Checklist

- [ ] Repository is public
- [ ] GitHub Pages is enabled
- [ ] Source is set to "GitHub Actions"
- [ ] Workflow file exists at `.github/workflows/deploy.yml`
- [ ] `vite.config.js` has correct base path
- [ ] All dependencies are in `package.json`

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Need Help?

If you encounter issues:
1. Check the Actions tab for detailed error logs
2. Verify all files are committed and pushed
3. Ensure your repository is public
4. Try the deployment locally with `npm run build`

---

Once deployed, share your site:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

Example: `https://johndoe.github.io/tax-visualizer/`