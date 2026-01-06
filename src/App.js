import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ComposedChart, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertCircle, TrendingDown, DollarSign } from 'lucide-react';

// 2026 Federal Tax Brackets for Single Filers
const FEDERAL_BRACKETS = [
  { min: 0, max: 12400, rate: 0.10 },
  { min: 12401, max: 50400, rate: 0.12 },
  { min: 50401, max: 105700, rate: 0.22 },
  { min: 105701, max: 201775, rate: 0.24 },
  { min: 201776, max: 256225, rate: 0.32 },
  { min: 256226, max: 640600, rate: 0.35 },
  { min: 640601, max: Infinity, rate: 0.37 }
];

// 2025 State tax data - comprehensive from Tax Foundation
const STATE_TAX_DATA = {
  // No income tax states
  'Alaska': { type: 'none', rate: 0 },
  'Florida': { type: 'none', rate: 0 },
  'Nevada': { type: 'none', rate: 0 },
  'New Hampshire': { type: 'none', rate: 0 },
  'South Dakota': { type: 'none', rate: 0 },
  'Tennessee': { type: 'none', rate: 0 },
  'Texas': { type: 'none', rate: 0 },
  'Wyoming': { type: 'none', rate: 0 },
  
  // Flat tax states
  'Arizona': { type: 'flat', rate: 0.025 },
  'Colorado': { type: 'flat', rate: 0.044 },
  'Georgia': { type: 'flat', rate: 0.0539 },
  'Idaho': { type: 'flat', rate: 0.05695 },
  'Illinois': { type: 'flat', rate: 0.0495 },
  'Indiana': { type: 'flat', rate: 0.03 },
  'Iowa': { type: 'flat', rate: 0.038 },
  'Kentucky': { type: 'flat', rate: 0.04 },
  'Louisiana': { type: 'flat', rate: 0.03 },
  'Michigan': { type: 'flat', rate: 0.0425 },
  'Mississippi': { 
    type: 'progressive',
    brackets: [
      { min: 0, max: 10000, rate: 0 },
      { min: 10001, max: Infinity, rate: 0.044 }
    ]
  },
  'North Carolina': { type: 'flat', rate: 0.0425 },
  'Pennsylvania': { type: 'flat', rate: 0.0307 },
  'Utah': { type: 'flat', rate: 0.0455 },
  
  // Progressive tax states
  'Alabama': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 501, max: 3000, rate: 0.04 },
      { min: 3001, max: Infinity, rate: 0.05 }
    ]
  },
  'Arkansas': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 4500, rate: 0.02 },
      { min: 4501, max: Infinity, rate: 0.039 }
    ]
  },
  'California': { 
    type: 'progressive', 
    brackets: [
      { min: 0, max: 10756, rate: 0.01 },
      { min: 10757, max: 25499, rate: 0.02 },
      { min: 25500, max: 40245, rate: 0.04 },
      { min: 40246, max: 55866, rate: 0.06 },
      { min: 55867, max: 70606, rate: 0.08 },
      { min: 70607, max: 360659, rate: 0.093 },
      { min: 360660, max: 432787, rate: 0.103 },
      { min: 432788, max: 721314, rate: 0.113 },
      { min: 721315, max: 1000000, rate: 0.123 },
      { min: 1000001, max: Infinity, rate: 0.133 }
    ]
  },
  'Connecticut': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 10000, rate: 0.02 },
      { min: 10001, max: 50000, rate: 0.045 },
      { min: 50001, max: 100000, rate: 0.055 },
      { min: 100001, max: 200000, rate: 0.06 },
      { min: 200001, max: 250000, rate: 0.065 },
      { min: 250001, max: 500000, rate: 0.069 },
      { min: 500001, max: Infinity, rate: 0.0699 }
    ]
  },
  'Delaware': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 2000, rate: 0 },
      { min: 2001, max: 5000, rate: 0.022 },
      { min: 5001, max: 10000, rate: 0.039 },
      { min: 10001, max: 20000, rate: 0.048 },
      { min: 20001, max: 25000, rate: 0.052 },
      { min: 25001, max: 60000, rate: 0.0555 },
      { min: 60001, max: Infinity, rate: 0.066 }
    ]
  },
  'Hawaii': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 9600, rate: 0.014 },
      { min: 9601, max: 14400, rate: 0.032 },
      { min: 14401, max: 19200, rate: 0.055 },
      { min: 19201, max: 24000, rate: 0.064 },
      { min: 24001, max: 36000, rate: 0.068 },
      { min: 36001, max: 48000, rate: 0.072 },
      { min: 48001, max: 125000, rate: 0.076 },
      { min: 125001, max: 175000, rate: 0.079 },
      { min: 175001, max: 225000, rate: 0.0825 },
      { min: 225001, max: 275000, rate: 0.09 },
      { min: 275001, max: 325000, rate: 0.10 },
      { min: 325001, max: Infinity, rate: 0.11 }
    ]
  },
  'Kansas': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 23000, rate: 0.052 },
      { min: 23001, max: Infinity, rate: 0.0558 }
    ]
  },
  'Maine': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 26800, rate: 0.058 },
      { min: 26801, max: 63450, rate: 0.0675 },
      { min: 63451, max: Infinity, rate: 0.0715 }
    ]
  },
  'Maryland': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1001, max: 2000, rate: 0.03 },
      { min: 2001, max: 3000, rate: 0.04 },
      { min: 3001, max: 100000, rate: 0.0475 },
      { min: 100001, max: 125000, rate: 0.05 },
      { min: 125001, max: 150000, rate: 0.0525 },
      { min: 150001, max: 250000, rate: 0.055 },
      { min: 250001, max: Infinity, rate: 0.0575 }
    ]
  },
  'Massachusetts': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 1083150, rate: 0.05 },
      { min: 1083151, max: Infinity, rate: 0.09 }
    ]
  },
  'Minnesota': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 32570, rate: 0.0535 },
      { min: 32571, max: 106990, rate: 0.068 },
      { min: 106991, max: 198630, rate: 0.0785 },
      { min: 198631, max: Infinity, rate: 0.0985 }
    ]
  },
  'Missouri': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 1313, rate: 0 },
      { min: 1314, max: 2626, rate: 0.02 },
      { min: 2627, max: 3939, rate: 0.025 },
      { min: 3940, max: 5252, rate: 0.03 },
      { min: 5253, max: 6565, rate: 0.035 },
      { min: 6566, max: 7878, rate: 0.04 },
      { min: 7879, max: 9191, rate: 0.045 },
      { min: 9192, max: Infinity, rate: 0.047 }
    ]
  },
  'Montana': { 
    type: 'progressive',
    brackets: [
      { min: 0, max: 21100, rate: 0.047 },
      { min: 21101, max: Infinity, rate: 0.059 }
    ]
  },
  'Nebraska': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 4030, rate: 0.0246 },
      { min: 4031, max: 24120, rate: 0.0351 },
      { min: 24121, max: 38870, rate: 0.0501 },
      { min: 38871, max: Infinity, rate: 0.052 }
    ]
  },
  'New Jersey': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20001, max: 35000, rate: 0.0175 },
      { min: 35001, max: 40000, rate: 0.035 },
      { min: 40001, max: 75000, rate: 0.05525 },
      { min: 75001, max: 500000, rate: 0.0637 },
      { min: 500001, max: 1000000, rate: 0.0897 },
      { min: 1000001, max: Infinity, rate: 0.1075 }
    ]
  },
  'New Mexico': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 5500, rate: 0.015 },
      { min: 5501, max: 16500, rate: 0.032 },
      { min: 16501, max: 33500, rate: 0.043 },
      { min: 33501, max: 66500, rate: 0.047 },
      { min: 66501, max: 210000, rate: 0.049 },
      { min: 210001, max: Infinity, rate: 0.059 }
    ]
  },
  'New York': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8501, max: 11700, rate: 0.045 },
      { min: 11701, max: 13900, rate: 0.0525 },
      { min: 13901, max: 80650, rate: 0.055 },
      { min: 80651, max: 215400, rate: 0.06 },
      { min: 215401, max: 1077550, rate: 0.0685 },
      { min: 1077551, max: 5000000, rate: 0.0965 },
      { min: 5000001, max: 25000000, rate: 0.103 },
      { min: 25000001, max: Infinity, rate: 0.109 }
    ]
  },
  'North Dakota': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 48475, rate: 0 },
      { min: 48476, max: 244825, rate: 0.0195 },
      { min: 244826, max: Infinity, rate: 0.025 }
    ]
  },
  'Ohio': { 
    type: 'progressive',
    brackets: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26051, max: 100000, rate: 0.0275 },
      { min: 100001, max: Infinity, rate: 0.035 }
    ]
  },
  'Oklahoma': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 1000, rate: 0.0025 },
      { min: 1001, max: 2500, rate: 0.0075 },
      { min: 2501, max: 3750, rate: 0.0175 },
      { min: 3751, max: 4900, rate: 0.0275 },
      { min: 4901, max: 7200, rate: 0.0375 },
      { min: 7201, max: Infinity, rate: 0.0475 }
    ]
  },
  'Oregon': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 4400, rate: 0.0475 },
      { min: 4401, max: 11050, rate: 0.0675 },
      { min: 11051, max: 125000, rate: 0.0875 },
      { min: 125001, max: Infinity, rate: 0.099 }
    ]
  },
  'Rhode Island': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 79900, rate: 0.0375 },
      { min: 79901, max: 181650, rate: 0.0475 },
      { min: 181651, max: Infinity, rate: 0.0599 }
    ]
  },
  'South Carolina': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 3560, rate: 0 },
      { min: 3561, max: 17830, rate: 0.03 },
      { min: 17831, max: Infinity, rate: 0.062 }
    ]
  },
  'Vermont': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 47900, rate: 0.0335 },
      { min: 47901, max: 116000, rate: 0.066 },
      { min: 116001, max: 242000, rate: 0.076 },
      { min: 242001, max: Infinity, rate: 0.0875 }
    ]
  },
  'Virginia': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3001, max: 5000, rate: 0.03 },
      { min: 5001, max: 17000, rate: 0.05 },
      { min: 17001, max: Infinity, rate: 0.0575 }
    ]
  },
  'Washington': { 
    type: 'capital_gains_only',
    rate: 0.07,
    threshold: 270000,
    note: '7% on capital gains only'
  },
  'West Virginia': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 10000, rate: 0.0222 },
      { min: 10001, max: 25000, rate: 0.0296 },
      { min: 25001, max: 40000, rate: 0.0333 },
      { min: 40001, max: 60000, rate: 0.0444 },
      { min: 60001, max: Infinity, rate: 0.0482 }
    ]
  },
  'Wisconsin': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 14680, rate: 0.035 },
      { min: 14681, max: 29370, rate: 0.044 },
      { min: 29371, max: 323290, rate: 0.053 },
      { min: 323291, max: Infinity, rate: 0.0765 }
    ]
  },
  'Washington DC': {
    type: 'progressive',
    brackets: [
      { min: 0, max: 10000, rate: 0.04 },
      { min: 10001, max: 40000, rate: 0.06 },
      { min: 40001, max: 60000, rate: 0.065 },
      { min: 60001, max: 250000, rate: 0.085 },
      { min: 250001, max: 500000, rate: 0.0925 },
      { min: 500001, max: 1000000, rate: 0.0975 },
      { min: 1000001, max: Infinity, rate: 0.1075 }
    ]
  }
};

const STANDARD_DEDUCTION = 16100; // 2026 Single filer

// Tax Credits and Benefits Configuration
const CREDITS_AND_BENEFITS = {
  aca_subsidy: {
    name: 'ACA Premium Tax Credit',
    description: 'Health insurance subsidy (Obamacare)',
    hasCliff: true,
    calculate: (income, numDependents) => {
      const povertyLine = 15060 + (numDependents * 5380); // 2024 federal poverty line
      const threshold400 = povertyLine * 4;
      
      if (income > threshold400) return 0; // CLIFF!
      if (income <= 0) return 0;
      
      // Simplified calculation - real formula is more complex
      const percentOfIncome = Math.min(8.5, Math.max(0, 2 + (income / povertyLine) * 0.5));
      const affordableAmount = income * (percentOfIncome / 100);
      const benchmarkPremium = 400 + (numDependents * 150); // Simplified monthly premium
      const annualPremium = benchmarkPremium * 12;
      
      return Math.max(0, annualPremium - affordableAmount);
    }
  },
  eitc: {
    name: 'Earned Income Tax Credit',
    description: 'Refundable credit for low/moderate income workers',
    hasCliff: false,
    calculate: (income, numDependents) => {
      // 2026 EITC amounts (from our federal data)
      const schedules = {
        0: { max: 664, phaseInEnd: 8680, phaseOutStart: 10860, phaseOutEnd: 19540 },
        1: { max: 4427, phaseInEnd: 13020, phaseOutStart: 23890, phaseOutEnd: 51593 },
        2: { max: 7316, phaseInEnd: 18290, phaseOutStart: 23890, phaseOutEnd: 58629 },
        3: { max: 8231, phaseInEnd: 18290, phaseOutStart: 23890, phaseOutEnd: 62974 }
      };
      
      const schedule = schedules[Math.min(numDependents, 3)];
      
      if (income >= schedule.phaseOutEnd) return 0;
      if (income <= schedule.phaseInEnd) {
        return (income / schedule.phaseInEnd) * schedule.max;
      }
      if (income <= schedule.phaseOutStart) return schedule.max;
      
      // Phase out
      const phaseOutRange = schedule.phaseOutEnd - schedule.phaseOutStart;
      const phaseOutProgress = (income - schedule.phaseOutStart) / phaseOutRange;
      return schedule.max * (1 - phaseOutProgress);
    }
  },
  ctc: {
    name: 'Child Tax Credit',
    description: '$2,200 per child under 17',
    hasCliff: false,
    calculate: (income, numDependents) => {
      if (numDependents === 0) return 0;
      
      const creditPerChild = 2200;
      const phaseOutStart = 200000; // Single filer
      const phaseOutRate = 50; // $50 per $1,000 over threshold
      
      if (income <= phaseOutStart) {
        return numDependents * creditPerChild;
      }
      
      const excessIncome = income - phaseOutStart;
      const reduction = Math.floor(excessIncome / 1000) * phaseOutRate;
      return Math.max(0, (numDependents * creditPerChild) - reduction);
    }
  },
  student_loan_interest: {
    name: 'Student Loan Interest Deduction',
    description: 'Up to $2,500 deduction',
    hasCliff: false,
    calculate: (income, numDependents) => {
      const maxDeduction = 2500;
      const phaseOutStart = 75000;
      const phaseOutEnd = 90000;
      
      if (income >= phaseOutEnd) return 0;
      if (income <= phaseOutStart) return maxDeduction;
      
      const phaseOutProgress = (income - phaseOutStart) / (phaseOutEnd - phaseOutStart);
      return maxDeduction * (1 - phaseOutProgress);
    }
  },
  medicaid: {
    name: 'Medicaid',
    description: 'Free health coverage (state-dependent)',
    hasCliff: true,
    calculate: (income, numDependents) => {
      const povertyLine = 15060 + (numDependents * 5380);
      const medicaidThreshold = povertyLine * 1.38; // 138% FPL in expansion states
      
      if (income > medicaidThreshold) return 0; // CLIFF!
      return 8000; // Approximate value of Medicaid coverage
    }
  },
  savers_credit: {
    name: "Saver's Credit",
    description: 'Retirement savings credit',
    hasCliff: false,
    calculate: (income, numDependents) => {
      const maxContribution = 2000; // Max eligible contribution
      
      if (income <= 23000) return maxContribution * 0.5; // 50% credit
      if (income <= 25000) return maxContribution * 0.2; // 20% credit
      if (income <= 38750) return maxContribution * 0.1; // 10% credit
      return 0;
    }
  }
};

function TaxVisualizer() {
  const [selectedState, setSelectedState] = useState('South Carolina');
  const [maxIncome, setMaxIncome] = useState(250000);
  const [showDangerZones, setShowDangerZones] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [dangerZones, setDangerZones] = useState([]);
  
  // New state for credits and benefits
  const [enabledCredits, setEnabledCredits] = useState({
    aca_subsidy: false,
    eitc: false,
    ctc: false,
    student_loan_interest: false,
    medicaid: false,
    savers_credit: false
  });
  const [numDependents, setNumDependents] = useState(0);
  const [showCreditsPanel, setShowCreditsPanel] = useState(false);

  // Get sorted list of states
  const statesList = Object.keys(STATE_TAX_DATA).sort();

  // Calculate federal tax
  const calculateFederalTax = (income) => {
    const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
    let tax = 0;
    let previousMax = 0;

    for (const bracket of FEDERAL_BRACKETS) {
      if (taxableIncome <= previousMax) break;
      
      const taxableInBracket = Math.min(
        taxableIncome - previousMax,
        bracket.max - previousMax
      );
      
      tax += taxableInBracket * bracket.rate;
      previousMax = bracket.max;
      
      if (taxableIncome <= bracket.max) break;
    }

    return tax;
  };

  // Calculate state tax
  const calculateStateTax = (income, state) => {
    const stateData = STATE_TAX_DATA[state];
    
    if (!stateData || stateData.type === 'none') {
      return 0;
    }
    
    // Washington only taxes capital gains - for wage income it's effectively 0
    if (stateData.type === 'capital_gains_only') {
      return 0;
    }
    
    if (stateData.type === 'flat') {
      return income * stateData.rate;
    }
    
    // Progressive brackets
    let tax = 0;
    let previousMax = 0;

    for (const bracket of stateData.brackets) {
      if (income <= previousMax) break;
      
      const taxableInBracket = Math.min(
        income - previousMax,
        bracket.max - previousMax
      );
      
      tax += taxableInBracket * bracket.rate;
      previousMax = bracket.max;
      
      if (income <= bracket.max) break;
    }

    return tax;
  };

  // Calculate effective tax rate
  const calculateEffectiveRate = (income, federalTax, stateTax) => {
    if (income === 0) return 0;
    return ((federalTax + stateTax) / income) * 100;
  };

  // Calculate total credits and benefits
  const calculateCreditsAndBenefits = (income) => {
    let totalCredits = 0;
    const creditBreakdown = {};
    
    Object.keys(enabledCredits).forEach(creditKey => {
      if (enabledCredits[creditKey]) {
        const credit = CREDITS_AND_BENEFITS[creditKey];
        const amount = credit.calculate(income, numDependents);
        totalCredits += amount;
        creditBreakdown[creditKey] = amount;
      }
    });
    
    return { total: totalCredits, breakdown: creditBreakdown };
  };

  // Find danger zones where net income decreases
  const findDangerZones = (data) => {
    const zones = [];
    let currentZone = null;

    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      const previous = data[i - 1];

      if (current.netIncome < previous.netIncome) {
        if (!currentZone) {
          currentZone = {
            start: previous.grossIncome,
            startNet: previous.netIncome,
            losses: []
          };
        }
        currentZone.losses.push({
          income: current.grossIncome,
          netLoss: previous.netIncome - current.netIncome
        });
      } else if (currentZone) {
        currentZone.end = previous.grossIncome;
        currentZone.endNet = previous.netIncome;
        zones.push(currentZone);
        currentZone = null;
      }
    }

    if (currentZone) {
      currentZone.end = data[data.length - 1].grossIncome;
      currentZone.endNet = data[data.length - 1].netIncome;
      zones.push(currentZone);
    }

    return zones;
  };

  // Generate chart data
  useEffect(() => {
    const data = [];
    const step = maxIncome / 1000;

    for (let income = 0; income <= maxIncome; income += step) {
      const federalTax = calculateFederalTax(income);
      const stateTax = calculateStateTax(income, selectedState);
      const totalTax = federalTax + stateTax;
      
      // Calculate credits and benefits
      const credits = calculateCreditsAndBenefits(income);
      
      // Net income includes tax credits and benefits
      const netIncome = income - totalTax + credits.total;
      const effectiveRate = calculateEffectiveRate(income, federalTax, stateTax);

      data.push({
        grossIncome: Math.round(income),
        federalTax: Math.round(federalTax),
        stateTax: Math.round(stateTax),
        totalTax: Math.round(totalTax),
        credits: Math.round(credits.total),
        netIncome: Math.round(netIncome),
        effectiveRate: effectiveRate.toFixed(2),
        marginalRate: income > 0 ? ((totalTax / income) * 100).toFixed(2) : 0,
        creditBreakdown: credits.breakdown
      });
    }

    setChartData(data);
    
    if (showDangerZones) {
      setDangerZones(findDangerZones(data));
    } else {
      setDangerZones([]);
    }
  }, [selectedState, maxIncome, showDangerZones, enabledCredits, numDependents]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-lg max-w-xs">
          <p className="font-bold text-lg mb-2">
            Gross Income: ${data.grossIncome.toLocaleString()}
          </p>
          <p className="text-red-600">
            Federal Tax: ${data.federalTax.toLocaleString()}
          </p>
          <p className="text-orange-600">
            State Tax: ${data.stateTax.toLocaleString()}
          </p>
          <p className="text-gray-600 font-semibold">
            Total Tax: ${data.totalTax.toLocaleString()}
          </p>
          {data.credits > 0 && (
            <p className="text-purple-600 font-semibold">
              Credits/Benefits: +${data.credits.toLocaleString()}
            </p>
          )}
          <p className="text-green-600 font-bold text-lg mt-2">
            Net Income: ${data.netIncome.toLocaleString()}
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Effective Rate: {data.effectiveRate}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              2026 Tax Visualizer
            </h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Interactive visualization of gross income, federal tax, state tax, and net income for 2026. 
            Includes automatic detection of "tax trap" zones where earning more results in taking home less.
            Configure tax credits and benefits below to see how they phase out and create real tax cliffs!
          </p>

          {/* Credits and Benefits Configuration */}
          <div className="mb-8 bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-900">
                💰 Tax Credits & Benefits Configuration
              </h2>
              <button
                onClick={() => setShowCreditsPanel(!showCreditsPanel)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {showCreditsPanel ? 'Hide' : 'Show'} Credits Panel
              </button>
            </div>
            
            {showCreditsPanel && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Number of Dependents/Children: {numDependents}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={numDependents}
                    onChange={(e) => setNumDependents(Number(e.target.value))}
                    className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(CREDITS_AND_BENEFITS).map((creditKey) => {
                    const credit = CREDITS_AND_BENEFITS[creditKey];
                    return (
                      <div key={creditKey} className="bg-white rounded-lg p-4 border-2 border-purple-200">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabledCredits[creditKey]}
                            onChange={(e) => setEnabledCredits({
                              ...enabledCredits,
                              [creditKey]: e.target.checked
                            })}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 mt-1"
                          />
                          <div className="flex-1">
                            <span className="font-semibold text-gray-800 flex items-center gap-2">
                              {credit.name}
                              {credit.hasCliff && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                  ⚠️ CLIFF
                                </span>
                              )}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">{credit.description}</p>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Credits/benefits marked with ⚠️ CLIFF have sudden drop-offs 
                    that create real tax traps where earning $1 more can cost thousands!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state} {STATE_TAX_DATA[state].type === 'none' ? '(No Income Tax)' : 
                     STATE_TAX_DATA[state].type === 'flat' ? `(Flat ${(STATE_TAX_DATA[state].rate * 100).toFixed(2)}%)` : 
                     STATE_TAX_DATA[state].type === 'capital_gains_only' ? '(Capital Gains Only)' : '(Progressive)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Income: ${maxIncome.toLocaleString()}
              </label>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={maxIncome}
                onChange={(e) => setMaxIncome(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDangerZones}
                  onChange={(e) => setShowDangerZones(e.target.checked)}
                  className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Highlight Tax Trap Zones
                </span>
              </label>
            </div>
          </div>

          {/* Danger Zones Alert */}
          {dangerZones.length > 0 && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-800 mb-2">
                    ⚠️ Tax Trap Zones Detected ({dangerZones.length})
                  </h3>
                  <p className="text-red-700 text-sm mb-3">
                    These income ranges show decreasing net income despite higher gross income. 
                    This happens when tax credits/benefits phase out or cliff faster than income increases.
                  </p>
                  {dangerZones.map((zone, idx) => (
                    <div key={idx} className="bg-white rounded p-3 mb-2 border border-red-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-800">
                          Zone {idx + 1}: ${zone.start.toLocaleString()} - ${zone.end.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Maximum net loss: ${Math.max(...zone.losses.map(l => l.netLoss)).toFixed(0)} at peak
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Likely cause: Credit/benefit phaseout or cliff
                      </p>
                    </div>
                  ))}
                  {Object.values(enabledCredits).every(v => !v) && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> No credits/benefits are currently enabled. 
                        Tax traps are extremely rare with just tax brackets. 
                        Enable credits above to see real-world tax traps!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Chart */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Income vs. Net Take-Home
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="grossIncome" 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Gross Income', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Highlight danger zones */}
                {dangerZones.map((zone, idx) => (
                  <React.Fragment key={idx}>
                    <ReferenceLine 
                      x={zone.start} 
                      stroke="red" 
                      strokeDasharray="3 3" 
                      label={{ value: '⚠️ Trap Start', position: 'top', fill: 'red' }}
                    />
                    <ReferenceLine 
                      x={zone.end} 
                      stroke="red" 
                      strokeDasharray="3 3" 
                      label={{ value: 'Trap End', position: 'top', fill: 'red' }}
                    />
                  </React.Fragment>
                ))}

                <Line 
                  type="monotone" 
                  dataKey="grossIncome" 
                  stroke="#9ca3af" 
                  strokeWidth={2}
                  name="Gross Income"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="netIncome" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Net Income (after tax + credits)"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalTax" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Total Tax"
                  dot={false}
                />
                {Object.values(enabledCredits).some(v => v) && (
                  <Line 
                    type="monotone" 
                    dataKey="credits" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Credits/Benefits"
                    dot={false}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Tax Breakdown Chart */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Tax Breakdown: Federal vs. State
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="grossIncome" 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Gross Income', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Tax Amount ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                <Area 
                  type="monotone" 
                  dataKey="stateTax" 
                  stackId="1"
                  stroke="#f97316" 
                  fill="#fed7aa"
                  name="State Tax"
                />
                <Area 
                  type="monotone" 
                  dataKey="federalTax" 
                  stackId="1"
                  stroke="#dc2626" 
                  fill="#fecaca"
                  name="Federal Tax"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Effective Tax Rate Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Effective Tax Rate Over Income
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="grossIncome" 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Gross Income', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Effective Rate (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 'auto']}
                />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelFormatter={(value) => `Income: $${value.toLocaleString()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="effectiveRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Effective Tax Rate"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">📊 About Tax Traps</h3>
              <p className="text-blue-800 text-sm mb-2">
                Pure tax brackets almost never create "traps" because of marginal rates - 
                each additional dollar is taxed at the higher rate, not all your income.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Real traps happen when:</strong> Tax credits phase out, benefits cliff, 
                or deductions disappear faster than income increases. Enable credits above to see real traps!
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-3">📋 Data Sources</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• 2026 Federal Tax Brackets (IRS)</li>
                <li>• 2025 State Tax Rates (Tax Foundation)</li>
                <li>• All 50 states + DC included</li>
                <li>• 2026 EITC, CTC, and ACA subsidy data</li>
                <li>• Standard Deduction: $16,100 (Single)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>
            Note: This visualization uses 2026 federal tax rates and 2025 state tax rates for single filers. 
            It does not include payroll taxes (Social Security, Medicare), local taxes, 
            deductions beyond standard deduction, or tax credits. State data from Tax Foundation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaxVisualizer;