import { Service, CaseStudy } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'loans',
    title: 'Loans',
    description: 'Providing trusted guiding pathways across Visakhapatnam for securing hassle-free housing, personal, mortgage, unsecured business, and MSME loans.',
    detailIntro: 'Accessing the right financing shouldn\'t be complicated. Based in Visakhapatnam (Vizag), Andhra Pradesh, we provide expert guidance, consultation, and paperwork support to locate and secure local funding solutions matching your personal or commercial goals.',
    howItWorks: [
      'Step 1: Consultation - Assess funding eligibility customized for Vizag residents & local business firms.',
      'Step 2: Document Check - Help compile paperwork, ITR copies, and required collateral proof sets.',
      'Step 3: Option Analysis - Review and compare loan interest rates from prominent lender channels in Andhra Pradesh.',
      'Step 4: Application Support - End-to-end guidance during submission, tracking & prompt capital release.'
    ],
    benefits: [
      'Housing loans',
      'Personal loans',
      'Mortgage loans',
      'Unsecured business loans',
      'Working capital OD/CC loans',
      'MSME loans',
      'Professional loans',
      'Machinery loans',
      'Vehicle loans',
      'Project funding',
      'School and college funding',
      'Solar funding',
      'NRA loans'
    ],
    caseExample: {
      client: 'Visakhapatnam Small Business Owner',
      challenge: 'Needed swift machinery funding for an industrial setup in Gajuwaka, Vizag but lacked bank filing experience.',
      solution: 'Assisted in compiling tax folders, credit report records and prepared a clean application folder for Machinery & MSME loans.',
      result: 'The industrial project was fully funded with a competitive interest rate in record processing times.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    stats: { label: 'Vizag Loan Advisor Experience', value: '10+ Years' },
    order: 1,
    isVisible: true,
    faqs: [
      { question: 'What types of loans do you consult for in Visakhapatnam?', answer: 'We offer specialized consultation for Housing loans, Personal loans, Mortgage loans, Unsecured business loans, Working capital OD/CC, MSME loans, Professional loans, Machinery/Equipment loans, Vehicle loans, Project funding, School/College funding, Solar funding, and NRA loans across Vizag and AP.' },
      { question: 'How does Nihira Finserv assist in the process?', answer: 'We guide you on documentation preparation, eligibility analysis, and coordinate with trusted channels to find the most cost-effective terms in Vizag, Andhra Pradesh.' }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Expert consultation in Vizag for Life, Health, Motor, Business, and General Insurance to safeguard what matters most.',
    detailIntro: 'Secure tomorrow, today. We act as independent risk advisors in Visakhapatnam, explaining policy details, waiting periods, and claiming rules for personal, vehicle, commercial, and general insurance products.',
    howItWorks: [
      'Step 1: Coverage Analysis - Assess individual or corporate risk exposure across Visakhapatnam.',
      'Step 2: Compare Quotes - Evaluate premium quotes, claim settlement ratios, and copay brackets.',
      'Step 3: Exclusions Briefing - Read fine-print exclusions, co-pay rules, and network hospital lists.',
      'Step 4: Form Guidance - Guide on filling up proposal folders with appropriate declarations.'
    ],
    benefits: [
      'Health Insurance Guidance',
      'Life Insurance Planning',
      'Vehicle Insurance Support',
      'Business Insurance Consulting',
      'General Insurance'
    ],
    caseExample: {
      client: 'Seaport Logistics Firm in Visakhapatnam',
      challenge: 'Required comprehensive general marine and cargo security options amid unpredictable shipping bottlenecks.',
      solution: 'Explained risk coverage details, compared commercial policies side-by-side, and simplified coverage limits.',
      result: 'Secured seamless general insurance coverage matching statutory standards perfectly.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    stats: { label: 'Vizag Insurance Advisor', value: 'Trusted' },
    order: 2,
    isVisible: true,
    faqs: [
      { question: 'What insurance lines do you consult on?', answer: 'We consult on Life, Health, Vehicle/Motor, Commercial Business plans, and General Insurance products in Vizag.' },
      { question: 'Do you collect premium amounts directly?', answer: 'No, we provide independent consulting and explain claim parameters; the actual premium payments are made directly to standard certified providers.' }
    ]
  },
  {
    id: 'credit-repair',
    title: 'Credit Score Repair',
    description: 'Premier credit score advice and financial habit coaching in Visakhapatnam to rebuild your rating and access cheaper credit.',
    detailIntro: 'A high credit rating opens doors to the best loan parameters in Vizag. We provide complete analysis of credit file anomalies, late-payment marks, and advice on healthy habits to optimize scores legally.',
    howItWorks: [
      'Step 1: Folder Scrubbing - Retrieve and analyze credit file summaries from major bureaus.',
      'Step 2: Error Identification - Pinpoint incorrect account postings, closed-loop duplicates or late reports.',
      'Step 3: Rectification Support - Formally guide on drafting dispute representations to correct clerical errors.',
      'Step 4: Habit Optimization - Educate on utilization ratios and timely debt-rollover structures.'
    ],
    benefits: [
      'Credit Education Support',
      'Score Improvement Support',
      'Healthy Financial Habit Guidance'
    ],
    caseExample: {
      client: 'IT Professional in Madhurawada, Vizag',
      challenge: 'Ineligible for a home loan because a paid-off card was still reporting active delinquent balances.',
      solution: 'Identified the error, guided on filing standard data dispute requests to the bureau along with settlement receipts.',
      result: 'Resolved discrepancy and fully restored credit rating in under 45 days, enabling housing loan approval.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    stats: { label: 'Financial Credibility', value: 'Guided' },
    order: 3,
    isVisible: true,
    faqs: [
      { question: 'Why is credit repair consultation important?', answer: 'Discrepancies in credit files are common. Our local Vizag consultants help pinpoint and guide you on correcting these errors formally.' },
      { question: 'How quickly can credit scores be updated?', answer: 'Once rectified, bureaus take about 30 to 45 business days to process and reflect standard database updates in Andhra Pradesh.' }
    ]
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds',
    description: 'Diversified wealth planning, Sip, and lumpsum fund advisory in Vizag tailored around long-term security goals.',
    detailIntro: 'Build generational wealth. We offer neutral, personalized consulting on mutual funds categories—debt, equity, liquid, and hybrid models—assisting Visakhapatnam families to select plans aligned to their goals.',
    howItWorks: [
      'Step 1: Goal Setup - Plan clear milestones like home buy, kids education or comfortable retirement.',
      'Step 2: Risk Scoring - Gauge comfortable market volatility levels for balanced asset split configurations.',
      'Step 3: Performance Scan - Scrutinize mutual fund expense ratios, fund manager tenures and historical gains.',
      'Step 4: Regular Inspection - Review your investment portfolio periodically to keep holdings fully synchronized.'
    ],
    benefits: [
      'No Claim of Guaranteed Returns',
      'Diversification Consulting',
      'Long-term Growth Planning',
      'Regular Review Support'
    ],
    caseExample: {
      client: 'Retiring Professional in MVP Colony, Vizag',
      challenge: 'Unsecured allocation of retirement proceeds leading to rapid purchasing-power decay.',
      solution: 'Formulated a diversified monthly withdrawal SIP strategy across liquid and top large-cap equity mutual funds.',
      result: 'Maintained excellent wealth preservation margins with controlled inflation hedge factors.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1200&auto=format&fit=crop',
    stats: { label: 'Asset Diversification Strategy', value: 'Balanced' },
    order: 4,
    isVisible: true,
    faqs: [
      { question: 'Are mutual fund returns guaranteed?', answer: 'Market investments do not carry absolute guarantees. Our Vizag consultations focus entirely on asset diversification, SIP planning, and avoiding emotional market trades.' },
      { question: 'What is SIP?', answer: 'A Systematic Investment Plan allows structured recurring savings in a selected mutual fund program to enjoy compound interest gains.' }
    ]
  },
  {
    id: 'tax-filing',
    title: 'Accounts & Tax Filing',
    description: 'Stress-free GST setup, tax planning, and Income Tax Return (ITR) filing support for businesses and individuals in Visakhapatnam.',
    detailIntro: 'Simplify compliances and accounting in Vizag. We provide professional support for quarterly GST filings, micro-ledger maintenance, and end-of-year tax computing for retail, commercial and freelancer profiles.',
    howItWorks: [
      'Step 1: Document Gathering - Securely compile business invoice details, bank statements, and tax-saving receipts.',
      'Step 2: Computation and Review - Perform exact deduction comparisons under newer and legacy tax structures.',
      'Step 3: Verification Check - Present drafted calculations to you to secure thorough filing approval.',
      'Step 4: Dispatch & Archiving - Process smooth online filing on central government portals and provide acknowledgement PDFs.'
    ],
    benefits: [
      'GST Filing Support',
      'Income Tax Returns Filing',
      'Basic Accounting Support',
      'Documentation Guidance'
    ],
    caseExample: {
      client: 'Vizag Pharma & Logistic Retailer',
      challenge: 'Faced sudden show-cause regulatory notices due to inconsistent monthly invoice mismatches.',
      solution: 'Rebuilt systematic ledger files, resolved tax-credit differences, and compiled accurate compliance records.',
      result: 'The notices were completely resolved, preserving spotless corporate regulatory standings.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&auto=format&fit=crop',
    stats: { label: 'Local Compliance Advisor', value: '10+ Years' },
    order: 5,
    isVisible: true,
    faqs: [
      { question: 'Do you help with monthly GST returns in Visakhapatnam?', answer: 'Yes, we provide local support to small businesses in Vizag with accounts preparation, ledger audits, and timely GST filing.' },
      { question: 'What papers do I need for my ITR submission?', answer: 'You typical require Form 16/16A from employers, bank interest summaries, TDS summaries, and relevant saving proofs like insurance receipts.' }
    ]
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'personal-loan-structuring',
    title: 'Personal Loan Selection Guidance',
    category: 'Loans Guidance',
    clientType: 'Individual Client',
    metrics: [
      { label: 'Evaluation Time', value: '48 Hours' },
      { label: 'Options Scanned', value: '8+ Lenders' },
      { label: 'Documentation Clarity', value: '100%' }
    ],
    summary: 'A client needed clear personal funding choices but was confused by multiple bank offerings.',
    challenge: 'Unclear eligibility criteria, fluctuating processing charges, and complex application jargon across banking portals.',
    strategy: 'Reviewed the financial credentials, simplified multiple offers, and structured standard application sets clearly.',
    execution: 'Assisted in correct file collection, explained exact interest schedules, and guided submission through chosen channel.',
    outcome: 'Successful loan approval with absolute transparency with zero hidden processing costs.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'tax-gst-compliance',
    title: 'GST & Income Tax Return Setup',
    category: 'Accounts & Tax Filing',
    clientType: 'Local Retailer Shop',
    metrics: [
      { label: 'Accounting Cycle', value: 'Quarterly' },
      { label: 'GST Compliance', value: 'On-Time' },
      { label: 'Penalty Saved', value: 'Yes' }
    ],
    summary: 'A shop owner required simple recordkeeping and systematic quarterly GST submissions support.',
    challenge: 'Manual management of paper receipts and missing critical dates leading to recurring penalty notices.',
    strategy: 'Designed an easy cash ledger collection template and established routine filing timelines.',
    execution: 'Validated cash inflows/outflows, computed accurate liabilities, and coordinated smooth draft filing receipts.',
    outcome: 'Stress-free tax compliance posture and simplified document compilation for future audits.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop'
  }
];
