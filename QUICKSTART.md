# Quick Start Guide

Get the Tax Visualizer running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download here](https://nodejs.org/))
- A code editor (VS Code recommended)
- Terminal/Command Prompt

## Installation Steps

### 1. Download the Project

Download all the files and create this structure:

```
tax-visualizer/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── DEPLOYMENT.md
└── QUICKSTART.md (this file)
```

### 2. Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install:
- React
- Vite
- Tailwind CSS
- Recharts (for charts)
- Lucide React (for icons)

### 3. Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Open in Browser

Go to [http://localhost:5173/](http://localhost:5173/)

You should see the Tax Visualizer with:
- ✅ Beautiful gradient background
- ✅ Interactive charts
- ✅ State selector dropdown
- ✅ Credits & benefits panel

## Common Issues

### Issue: "npm: command not found"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: Page loads but no styling (all white)
**Solution**: Make sure you ran `npm install` and that `src/index.css` has the Tailwind directives

### Issue: Port 5173 already in use
**Solution**: Kill the process using that port or Vite will automatically use 5174

### Issue: Charts not showing
**Solution**: Check browser console for errors. Make sure all dependencies installed correctly.

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready to deploy.

## Next Steps

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` to deploy to GitHub Pages
- Explore the code in `src/App.jsx`
- Try different scenarios with the credits panel

## Testing the App

Try these scenarios:

1. **Basic usage:**
   - Select California
   - Drag income slider to $100k
   - See the tax breakdown

2. **ACA Subsidy Cliff:**
   - Click "Show Credits Panel"
   - Set dependents to 1
   - Enable "ACA Premium Tax Credit"
   - Watch the massive cliff around $80k!

3. **State Comparison:**
   - Compare California (13.3% top rate) vs Texas (0% tax)
   - See the huge difference in take-home pay

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)

## Getting Help

If you get stuck:
1. Check the browser console for errors (F12)
2. Verify all files are in the correct locations
3. Make sure `npm install` completed without errors
4. Try deleting `node_modules` and running `npm install` again

---

**You're all set!** 🎉

The app should be running at [http://localhost:5173/](http://localhost:5173/)