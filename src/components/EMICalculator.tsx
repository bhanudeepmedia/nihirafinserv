import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Calendar, ArrowRight, ShieldAlert, CheckCircle, FileText, Table } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.45); // 8.45% default
  const [loanTerm, setLoanTerm] = useState<number>(20); // 20 years default
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  // Input states representing direct raw typed text to allow smooth typing & formatting
  const [typedAmount, setTypedAmount] = useState<string>('5,000,000');
  const [typedRate, setTypedRate] = useState<string>('8.45');
  const [typedTerm, setTypedTerm] = useState<string>('20');

  // Calculate Amortization
  const emiData = useMemo(() => {
    const P = loanAmount;
    const annualR = interestRate;
    const totalMonths = termUnit === 'years' ? loanTerm * 12 : loanTerm;
    
    if (P <= 0 || annualR <= 0 || totalMonths <= 0) {
      return {
        monthlyEMI: 0,
        totalInterest: 0,
        totalRepayment: 0,
        principalPercentage: 50,
        interestPercentage: 50,
        yearlyBreakdown: []
      };
    }

    const r = annualR / (12 * 100);
    const emi = (P * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
    const totalRepayment = emi * totalMonths;
    const totalInterest = totalRepayment - P;

    const principalPct = Math.round((P / totalRepayment) * 100);
    const interestPct = 100 - principalPct;

    // Amortization schedule per year (or per group of 12 months)
    const breakdown: { year: number; principalPaid: number; interestPaid: number; endingBalance: number }[] = [];
    let remainingBalance = P;
    const yearsCount = Math.ceil(totalMonths / 12);

    for (let u = 1; u <= yearsCount; u++) {
      let annualPrincipal = 0;
      let annualInterest = 0;
      const monthsInThisSegment = Math.min(12, totalMonths - (u - 1) * 12);

      for (let m = 0; m < monthsInThisSegment; m++) {
        const monthlyInterestBill = remainingBalance * r;
        const monthlyPrincipalBill = emi - monthlyInterestBill;
        
        annualInterest += monthlyInterestBill;
        annualPrincipal += monthlyPrincipalBill;
        remainingBalance = Math.max(0, remainingBalance - monthlyPrincipalBill);
      }

      breakdown.push({
        year: u,
        principalPaid: Math.round(annualPrincipal),
        interestPaid: Math.round(annualInterest),
        endingBalance: Math.round(remainingBalance)
      });
    }

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      principalPercentage: principalPct,
      interestPercentage: interestPct,
      yearlyBreakdown: breakdown
    };
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  // Format Helper
  const formatINR = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };

  const handleAmountChange = (valStr: string) => {
    const numericStr = valStr.replace(/[^0-9]/g, '');
    setTypedAmount(Number(numericStr).toLocaleString('en-IN'));
    const val = Number(numericStr);
    if (!isNaN(val) && val >= 0) {
      setLoanAmount(val);
    }
  };

  const handleRateChange = (valStr: string) => {
    setTypedRate(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val) && val >= 0 && val <= 40) {
      setInterestRate(val);
    }
  };

  const handleTermChange = (valStr: string) => {
    const numericStr = valStr.replace(/[^0-9]/g, '');
    setTypedTerm(numericStr);
    const val = parseInt(numericStr, 10);
    if (!isNaN(val) && val >= 1) {
      setLoanTerm(val);
    }
  };

  // CSV Exporter
  const downloadCSV = () => {
    const csvRows = [
      ["NIHIRA FINSERV", "OFFICIAL LOAN AMORTIZATION SCHEDULE RECONCILIATION REPORT"],
      ["Report Generated", `${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN')}`],
      ["Contact Support", "Phone/WhatsApp: +91 8143355559"],
      [],
      ["LOAN INFORMATION AND SUMMARY", ""],
      ["Principal Loan Value Requested", `INR ${loanAmount}`],
      ["Annual Interest Rate (APR)", `${interestRate}%`],
      ["Repayment Tenure Period", `${loanTerm} ${termUnit === 'years' ? 'Years' : 'Months'}`],
      ["Calculated Equated Monthly Installment", `INR ${emiData.monthlyEMI}`],
      ["Calculated Total Interest Payable", `INR ${emiData.totalInterest}`],
      ["Total Cumulative Repayment Amount", `INR ${emiData.totalRepayment}`],
      [],
      ["AMORTIZATION LEDGER DETAILS", ""],
      ["Year / Segment", "Principal Repaid (INR)", "Interest Paid (INR)", "Remaining Balance (INR)"]
    ];

    emiData.yearlyBreakdown.forEach((row) => {
      csvRows.push([
        `Year ${row.year}`,
        row.principalPaid.toString(),
        row.interestPaid.toString(),
        row.endingBalance.toString()
      ]);
    });

    const csvContent = csvRows.map(e => e.map(val => {
      let cleanVal = val.replace(/"/g, '""');
      if (cleanVal.includes(',') || cleanVal.includes('\n')) {
        cleanVal = `"${cleanVal}"`;
      }
      return cleanVal;
    }).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Nihira_Finserv_EMI_Schedule_${loanAmount}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // PDF Exporter
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Draw Top Colored Header Strip
    doc.setFillColor(242, 245, 248);
    doc.rect(0, 0, 210, 8, "F");

    // Brand Header Text and Slogan (left-aligned without the vector logo icon)
    doc.setTextColor(13, 57, 121); // #0d3979
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("NIHIRA FINSERV", 20, 24);
    
    doc.setTextColor(47, 110, 115); // #2F6E73
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("STANDARD GUIDANCE & SERVICE SUPPORT", 20, 28);

    // Business Contact Support Details (Right Aligned)
    doc.setTextColor(13, 57, 121);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("CONTACT SUPPORT", 190, 24, { align: "right" });
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Phone/WhatsApp: +91 8143355559", 190, 28, { align: "right" });

    // Document Main Title
    doc.setTextColor(17, 24, 39); // #111827
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("LOAN AMORTIZATION LEDGER", 20, 42);

    // Document Metadata
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Generated Date: ${new Date().toLocaleDateString('en-IN')} | Time: ${new Date().toLocaleTimeString('en-IN')}`, 20, 47);

    // Horizontal Divider
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(0.4);
    doc.line(20, 51, 190, 51);

    // Summary Section Header
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("LOAN CONFIGURATION SUMMARY", 20, 59);

    // Summary Box Background
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.rect(20, 63, 170, 34, "F");
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(0.3);
    doc.rect(20, 63, 170, 34, "S");

    // Summary Left Column info
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Principal Loan Amount:", 25, 71);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`INR ${loanAmount.toLocaleString('en-IN')}`, 65, 71);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Annual Interest Rate:", 25, 79);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`${interestRate}%`, 65, 79);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Repayment Tenure:", 25, 87);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`${loanTerm} ${termUnit === 'years' ? 'Years' : 'Months'}`, 65, 87);

    // Summary Right Column info
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Monthly Installment (EMI):", 110, 71);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`INR ${emiData.monthlyEMI.toLocaleString('en-IN')}`, 154, 71);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Total Interest Cost:", 110, 79);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`INR ${emiData.totalInterest.toLocaleString('en-IN')}`, 154, 79);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Total Repayment Balance:", 110, 87);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text(`INR ${emiData.totalRepayment.toLocaleString('en-IN')}`, 154, 87);

    // Table Header Header Text (removed redundant words)
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("ESTIMATED REPAYMENT LEDGER (YEARLY BREAKDOWN)", 20, 106);

    // Table Header Accent background
    doc.setFillColor(13, 57, 121);
    doc.rect(20, 110, 170, 7, "F");

    // Table Column Labels (Optimally aligned to solve overlapping)
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("YEAR / CYCLE", 25, 115);
    doc.text("PRINCIPAL REPAID (INR)", 80, 115, { align: "right" });
    doc.text("INTEREST CHARGED (INR)", 135, 115, { align: "right" });
    doc.text("REMAINING BALANCE (INR)", 186, 115, { align: "right" });

    let yPos = 122;
    const rowHeight = 7;
    const maxPageBottom = 265;

    emiData.yearlyBreakdown.forEach((row, idx) => {
      // Dynamic page breaks
      if (yPos > maxPageBottom) {
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text("Page of Nihira Finserv Repayment Statement", 105, 285, { align: "center" });

        doc.addPage();

        doc.setFillColor(13, 57, 121);
        doc.rect(20, 15, 170, 7, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("YEAR / CYCLE", 25, 20);
        doc.text("PRINCIPAL REPAID (INR)", 80, 20, { align: "right" });
        doc.text("INTEREST CHARGED (INR)", 135, 20, { align: "right" });
        doc.text("REMAINING BALANCE (INR)", 186, 20, { align: "right" });

        yPos = 27;
      }

      // Alternating Row Styling
      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, yPos - 5, 170, rowHeight, "F");
      }

      // Row values with exact spacing
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(13, 57, 121);
      doc.text(`Year ${row.year}`, 25, yPos);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(17, 24, 39);
      doc.text(row.principalPaid.toLocaleString('en-IN'), 80, yPos, { align: "right" });

      doc.setTextColor(47, 110, 115);
      doc.text(row.interestPaid.toLocaleString('en-IN'), 135, yPos, { align: "right" });

      doc.setTextColor(17, 24, 39);
      doc.text(row.endingBalance.toLocaleString('en-IN'), 186, yPos, { align: "right" });

      // Fine line separator
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(20, yPos + 2, 190, yPos + 2);

      yPos += rowHeight;
    });

    // Disclaimer footer output at extreme page bottom
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Disclaimer: Values provided are projected estimations. Actual terms are subject to formal underwriting and policies of partner banks. Nihira Finserv standard advisory norms apply.", 105, 282, { align: "center", maxWidth: 160 });

    doc.save(`Nihira_Finserv_Amortization_Ledger_${loanAmount}.pdf`);
  };

  // SVG circular loader offsets
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const principalStrokeDashoffset = circumference - (emiData.principalPercentage / 100) * circumference;

  return (
    <div id="emi_calculator_module" className="bg-white border border-[#E6E6E6] rounded-3xl p-6 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E6E6E6] pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase block mb-1 font-bold">
            Interactive Tools
          </span>
          <h3 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-[#0d3979] uppercase">
            Loan EMI Calculator
          </h3>
        </div>
        <div className="bg-[#F5F5F4] px-4 py-2 rounded-xl flex items-center gap-2 border border-[#E6E6E6]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-[#111827] font-semibold uppercase tracking-wider">
            Standard Estimation Tool
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sliders and direct entry panels */}
        <div className="lg:col-span-12 xl:col-span-6 flex flex-col gap-8">
          
          {/* LOAN AMOUNT Panel */}
          <div className="group transition-all">
            <div className="flex justify-between items-center mb-3">
              <label className="font-sans font-semibold text-xs tracking-wider uppercase text-[#111827]">
                Principal Loan Amount
              </label>
              <div className="relative flex items-center bg-white border border-[#E6E6E6] group-focus-within:border-black rounded-xl px-3 py-1.5 transition-colors">
                <span className="font-mono text-xs font-semibold text-[#2F6E73] mr-1.5">₹</span>
                <input
                  type="text"
                  value={typedAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="font-mono text-sm font-bold text-[#0d3979] w-28 focus:outline-none text-right"
                  placeholder="0"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="250000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLoanAmount(val);
                setTypedAmount(val.toLocaleString('en-IN'));
              }}
              className="w-full h-1.5 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-black focus:outline-none"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#111827]/50 mt-2">
              <span>Min: ₹1 Lakh</span>
              <span>Max: ₹25 Crores</span>
            </div>
          </div>

          {/* INTEREST RATE Panel */}
          <div className="group transition-all">
            <div className="flex justify-between items-center mb-3">
              <label className="font-sans font-semibold text-xs tracking-wider uppercase text-[#111827]">
                Annualized Interest Rate
              </label>
              <div className="relative flex items-center bg-white border border-[#E6E6E6] group-focus-within:border-black rounded-xl px-3 py-1.5 transition-colors">
                <input
                  type="text"
                  value={typedRate}
                  onChange={(e) => handleRateChange(e.target.value)}
                  className="font-mono text-sm font-bold text-[#0d3979] w-14 focus:outline-none text-right"
                  placeholder="0.00"
                />
                <span className="font-mono text-xs font-semibold text-[#111827]/60 ml-1">%</span>
              </div>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="0.05"
              value={interestRate}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setInterestRate(val);
                setTypedRate(val.toString());
              }}
              className="w-full h-1.5 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-black focus:outline-none"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#111827]/50 mt-2">
              <span>Min: 4.00%</span>
              <span>Max: 24.00%</span>
            </div>
          </div>

          {/* TIME DURATION Panel */}
          <div className="group transition-all">
            <div className="flex justify-between items-center mb-3">
              <label className="font-sans font-semibold text-xs tracking-wider uppercase text-[#111827]">
                Repayment Tenure
              </label>
              <div className="flex items-center gap-2">
                <div className="flex bg-[#F5F5F4] border border-[#E6E6E6] rounded-xl p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setTermUnit('years');
                      // Convert month valuation to year approximation
                      const newTerm = termUnit === 'months' ? Math.max(1, Math.round(loanTerm / 12)) : loanTerm;
                      setLoanTerm(newTerm);
                      setTypedTerm(newTerm.toString());
                    }}
                    className={`px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                      termUnit === 'years' ? 'bg-[#0d3979] text-white font-bold' : 'text-[#111827]/60 hover:text-black'
                    }`}
                  >
                    Yrs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTermUnit('months');
                      // Convert year value to months
                      const newTerm = termUnit === 'years' ? loanTerm * 12 : loanTerm;
                      setLoanTerm(newTerm);
                      setTypedTerm(newTerm.toString());
                    }}
                    className={`px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                      termUnit === 'months' ? 'bg-[#0d3979] text-white font-bold' : 'text-[#111827]/60 hover:text-black'
                    }`}
                  >
                    Mths
                  </button>
                </div>
                <div className="relative flex items-center bg-white border border-[#E6E6E6] group-focus-within:border-black rounded-xl px-3 py-1.5 transition-colors">
                  <input
                    type="text"
                    value={typedTerm}
                    onChange={(e) => handleTermChange(e.target.value)}
                    className="font-mono text-sm font-bold text-[#0d3979] w-12 focus:outline-none text-right"
                    placeholder="0"
                  />
                  <span className="font-mono text-xs font-semibold text-[#111827]/60 ml-1">
                    {termUnit === 'years' ? 'Y' : 'M'}
                  </span>
                </div>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={termUnit === 'years' ? 35 : 360}
              step="1"
              value={loanTerm}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setLoanTerm(val);
                setTypedTerm(val.toString());
              }}
              className="w-full h-1.5 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-black focus:outline-none"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#111827]/50 mt-2">
              <span>Min: {termUnit === 'years' ? '1 Year' : '1 Month'}</span>
              <span>Max: {termUnit === 'years' ? '35 Years' : '360 Months'}</span>
            </div>
          </div>

          <div className="bg-[#F5F5F4]/60 border border-[#E6E6E6] rounded-2xl p-4 flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-[#2F6E73] shrink-0 mt-0.5" />
            <p className="font-sans text-[11px] text-[#111827]/70 leading-relaxed">
              <strong>Nihira Finserv Support:</strong> Receive complete guidance regarding loan structures, eligibility advice and document preparation. Ask our team of consultants to explore custom choices.
            </p>
          </div>
        </div>

        {/* Dashboard Outcomes Display */}
        <div className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Monthly Installment (EMI) */}
            <div className="bg-[#0d3979] text-white p-6 rounded-2xl border border-white/5 flex flex-col justify-between shadow-[0_10px_30px_rgba(10,26,51,0.06)] relative overflow-hidden">
               <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 rounded-full border border-white/5 pointer-events-none" />
               <div>
                 <span className="font-mono text-[9px] tracking-wider text-white/50 font-bold block mb-1">
                   ESTIMATED MONTHLY installment
                 </span>
                 <span className="font-sans font-bold text-3xl tracking-tight text-white block">
                   {formatINR(emiData.monthlyEMI)}
                 </span>
               </div>
               <span className="font-sans text-[10px] text-white/50 block mt-4">
                 Equated Monthly Installment (EMI)
               </span>
             </div>

             {/* Total Balance */}
             <div className="bg-[#F5F5F4] border border-[#E6E6E6] p-6 rounded-2xl flex flex-col justify-between">
               <div>
                 <span className="font-mono text-[9px] tracking-wider text-[#111827]/50 block mb-1">
                   TOTAL PAYMENT CUMULATIVE
                 </span>
                 <span className="font-sans font-bold text-2xl tracking-tight text-[#0d3979] block">
                   {formatINR(emiData.totalRepayment)}
                 </span>
               </div>
               <span className="font-sans text-[10px] text-[#111827]/50 block mt-4">
                 Principal amount + total cumulative interest charges
               </span>
             </div>

             {/* Net Principal */}
             <div className="bg-white border border-[#E6E6E6] p-5 rounded-2xl flex items-center gap-4">
               <div className="w-2.5 h-10 bg-black rounded-md" />
               <div>
                 <span className="font-mono text-[9px] text-[#111827]/50 block">NET PRINCIPAL AMOUNT</span>
                 <span className="font-sans font-semibold text-lg text-[#0d3979]">{formatINR(loanAmount)}</span>
               </div>
             </div>

             {/* Total Interest Cost */}
             <div className="bg-white border border-[#E6E6E6] p-5 rounded-2xl flex items-center gap-4">
               <div className="w-2.5 h-10 bg-[#2F6E73] rounded-md" />
               <div>
                 <span className="font-mono text-[9px] text-[#111827]/50 block">TOTAL INTEREST COST</span>
                 <span className="font-sans font-semibold text-lg text-[#0d3979]">{formatINR(emiData.totalInterest)}</span>
               </div>
             </div>
          </div>

          {/* SVG Visual Donut Chart */}
          <div className="border border-[#E6E6E6] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                {/* Background segment (represents Total Interest) */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="#2F6E73"
                  strokeWidth="10"
                  fill="transparent"
                  className="opacity-90"
                />
                {/* Foreground segment (represents Principal) */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="#000000"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={principalStrokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-sans text-[11px] text-[#111827]/50 block">Principal</span>
                <span className="font-sans font-bold text-xl text-[#0d3979]">{emiData.principalPercentage}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <span className="font-sans font-bold text-xs tracking-wider text-[#0d3979] uppercase border-b border-[#E6E6E6] pb-2">
                Capital Ratio Breakdown
              </span>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                  <span className="font-sans text-[#111827]/70">Principal Cost</span>
                </div>
                <span className="font-mono font-bold text-[#0d3979]">{emiData.principalPercentage}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F6E73]" />
                  <span className="font-sans text-[#111827]/70">Interest Cost</span>
                </div>
                <span className="font-mono font-bold text-[#0d3979]">{emiData.interestPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Ledger breakdown (Amortization Schedule) */}
      <div className="mt-12 border-t border-[#E6E6E6] pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h4 className="font-sans font-black text-sm uppercase tracking-widest text-[#0d3979] mb-0">
            Yearly Amortization Schedule
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="download_csv_button"
              onClick={downloadCSV}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 hover:text-[#0d3979] text-[10px] font-mono tracking-widest uppercase font-black rounded-xl transition-all border border-stone-200 cursor-pointer shadow-xs select-none"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
            <button
              id="download_pdf_button"
              onClick={downloadPDF}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-[#0d3979] hover:bg-black text-white text-[10px] font-mono tracking-widest uppercase font-black rounded-xl transition-all cursor-pointer shadow-xs select-none"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto max-h-76 overflow-y-auto border border-[#E6E6E6] rounded-xl scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F4] border-b border-[#E6E6E6]">
                <th className="py-2.5 px-4 font-mono text-[10px] uppercase font-bold tracking-wider text-[#111827]">Year</th>
                <th className="py-2.5 px-4 font-mono text-[10px] uppercase font-bold tracking-wider text-[#111827] text-right">Principal Paid</th>
                <th className="py-2.5 px-4 font-mono text-[10px] uppercase font-bold tracking-wider text-[#111827] text-right">Interest Charged</th>
                <th className="py-2.5 px-4 font-mono text-[10px] uppercase font-bold tracking-wider text-[#111827] text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E6]">
              {emiData.yearlyBreakdown.map((row) => (
                <tr key={row.year} className="hover:bg-[#F5F5F4]/30 transition-colors">
                  <td className="py-2 px-4 font-sans text-xs text-[#0d3979] font-semibold">Year {row.year}</td>
                  <td className="py-2 px-4 font-mono text-xs text-right text-black">{formatINR(row.principalPaid)}</td>
                  <td className="py-2 px-4 font-mono text-xs text-right text-[#2F6E73]">{formatINR(row.interestPaid)}</td>
                  <td className="py-2 px-4 font-mono text-xs text-right text-[#111827]/80">{formatINR(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
