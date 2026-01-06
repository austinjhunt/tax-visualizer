# 2026 Tax Visualizer

An interactive web application that visualizes the relationship between gross income, federal taxes, state taxes, and net income for 2026. Features real tax trap detection showing where earning more money can actually result in taking home less due to benefit cliffs and credit phaseouts.

![Tax Visualizer Demo](https://img.shields.io/badge/React-18.0+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Core Functionality
- **Real-time Tax Calculations**: Accurate federal and state tax calculations for all 50 states + DC
- **Tax Trap Detection**: Automatically identifies income ranges where earning more results in taking home less
- **Interactive Visualizations**: Multiple charts showing income vs. net take-home, tax breakdown, and effective rates
- **State Comparison**: Compare tax burdens across all US states

### Tax Credits & Benefits System
Configure various tax credits and benefits to see realistic tax scenarios:
- **ACA Premium Tax Credit** ⚠️ (with cliff at 400% FPL)
- **Earned Income Tax Credit (EITC)**
- **Child Tax Credit (CTC)**
- **Student Loan Interest Deduction**
- **Medicaid** ⚠️ (with cliff at 138% FPL)
- **Saver's Credit**

### Data Sources
- 2026 Federal Tax Brackets (IRS Revenue Procedure 2025-32)
- 2025 State Tax Rates (Tax Foundation)
- 2026 EITC, CTC, and ACA subsidy calculations
- All states including progressive, flat, and no-tax states

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Modern web browser

### Installation

#### Option 1: Using Vite (Recommended)
```bash
# Clone or download the repository
cd tax-visualizer

# Create new Vite project
npm create vite@latest . -- --template react

# Install dependencies
npm install
npm install recharts lucide-react

# Install Tailwind CSS
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind (see Tailwind Setup section below)

# Copy tax-visualizer.jsx to src/App.jsx

# Run the app
npm run dev
```

#### Option 2: Using Create React App
```bash
# Create new React app
npx create-react-app tax-visualizer
cd tax-visualizer

# Install dependencies
npm install recharts lucide-react

# Install Tailwind CSS
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind (see Tailwind Setup section below)

# Copy tax-visualizer.jsx to src/App.js

# Run the app
npm start
```

### Tailwind CSS Setup

1. **Update `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **Update `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Restart the development server**

## 📊 Usage

### Basic Usage
1. **Select a State**: Choose from all 50 states + DC to see state-specific tax rates
2. **Adjust Income Range**: Use the slider to set maximum income to visualize
3. **Enable Tax Trap Detection**: Toggle to highlight danger zones

### Configuring Credits & Benefits
1. Click "Show Credits Panel" to expand the configuration
2. Set the number of dependents (0-5)
3. Enable relevant tax credits and benefits
4. Watch the visualizations update in real-time

### Understanding the Charts
- **Income vs. Net Take-Home**: Shows gross income vs. actual take-home after taxes and credits
- **Tax Breakdown**: Stacked area chart showing federal vs. state taxes
- **Effective Tax Rate**: Your actual tax rate across income levels
- **Danger Zones**: Red markers indicate where net income decreases despite higher gross income

## 🎯 Example Scenarios

### Scenario 1: ACA Subsidy Cliff
```
State: California
Dependents: 1
Credits: ACA Premium Tax Credit (enabled)
Income Range: $100k

Result: Massive cliff around $80k where earning $1 more costs $6,000+ in subsidies!
```

### Scenario 2: EITC Phaseout
```
State: Texas (no income tax)
Dependents: 2
Credits: EITC (enabled)
Income Range: $75k

Result: Effective marginal tax rate over 40% during phaseout range
```

### Scenario 3: Medicaid Cliff
```
State: New York
Dependents: 0
Credits: Medicaid (enabled)
Income Range: $50k

Result: Cliff at ~$21k where losing Medicaid is worth $8,000
```

## 🏗️ Project Structure

```
tax-visualizer/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── index.css              # Tailwind CSS imports
│   └── main.jsx               # Application entry point
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js (or)
├── craco.config.js
└── README.md
```

## 🔧 Configuration

### Federal Tax Brackets
Located in the `FEDERAL_BRACKETS` constant. Updated for 2026 tax year with 7 brackets:
- 10%, 12%, 22%, 24%, 32%, 35%, 37%

### State Tax Data
The `STATE_TAX_DATA` object contains tax information for all states:
- No income tax states (8 states)
- Flat tax states (14 states)
- Progressive tax states (28 states + DC)

### Credits and Benefits
Modify the `CREDITS_AND_BENEFITS` object to:
- Add new credits/benefits
- Update phaseout thresholds
- Adjust calculation formulas

## 🚢 Deployment

### GitHub Pages
See `.github/workflows/deploy.yml` for automated deployment configuration.

### Manual Deployment
```bash
# Build the app
npm run build

# Deploy the dist/ folder to your hosting provider
```

### Environment Variables
No environment variables required - all data is included in the application.

## 📈 Technical Details

### Technologies Used
- **React 18+**: Component-based UI framework
- **Recharts**: Interactive chart library
- **Lucide React**: Icon library
- **Tailwind CSS 3+**: Utility-first CSS framework

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Renders 1000 data points per visualization
- Real-time calculations with React hooks
- Optimized re-renders with useEffect dependencies

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional tax credits and benefits
- Married filing jointly calculations
- Alternative Minimum Tax (AMT) calculations
- Payroll taxes (Social Security, Medicare)
- Local/city taxes
- Tax planning recommendations
- Export functionality for tax planning

## 📝 Limitations

This tool:
- Uses single filer status only
- Does not include payroll taxes (FICA)
- Does not include local/city taxes (except via state averages)
- Assumes standard deduction (no itemization)
- Simplifies some credit calculations for clarity
- Does not constitute tax advice

**Always consult a tax professional for your specific situation.**

## 📜 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- IRS for 2026 tax bracket data
- Tax Foundation for comprehensive state tax data
- React and Recharts communities for excellent documentation

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the Tax Foundation and IRS documentation for data questions

## 🔮 Future Enhancements

- [ ] Married filing jointly support
- [ ] Head of household filing status
- [ ] Alternative Minimum Tax (AMT)
- [ ] Self-employment tax calculator
- [ ] 401(k) and IRA contribution optimizer
- [ ] Tax planning recommendations
- [ ] Export to PDF/CSV
- [ ] Historical tax year comparison
- [ ] Mobile-responsive improvements
- [ ] Dark mode

---

**Disclaimer**: This tool is for educational and planning purposes only. Tax laws are complex and subject to change. Always consult with a qualified tax professional for advice specific to your situation.# tax-visualizer
