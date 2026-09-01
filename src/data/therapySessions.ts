export interface PaymentField {
  label: string;
  value: string;
}

export interface PaymentDetails {
  title?: string;
  bank?: string;
  accountNumber?: string;
  accountName?: string;
  usdAccount?: string;
  ghanaAccount?: string;
  customFields?: PaymentField[];
}

export interface TherapySession {
  slug: string;
  title: string;
  tagline: string;
  shortTitle: string;
  summary: string;
  fee: string;
  format: string[];
  paragraphs: string[];
  whatItCovers: string[];
  whatsIncluded: string[];
  contactEmail?: string;
  contactPhone?: string;
  paymentDetails?: PaymentDetails;
}

export const therapySessionsData: Record<string, TherapySession> = {
  "gerd-gastritis": {
    slug: "gerd-gastritis",
    title: "Healing from GERD / Gastritis / Acid Reflux / Ulcer",
    tagline: "THERAPY SESSION",
    shortTitle: "Gut healing",
    summary:
      "A guided therapy path built around gut repair, food changes, lifestyle adjustments, and herbal support for long-term digestive healing.",
    fee: "Available on enquiry",
    format: [
      "One-on-one holistic support",
      "Food + lifestyle + herbal guidance",
    ],
    paragraphs: [
      "The Holistic Farmacy site strongly positions gut repair as a healing journey grounded in diet, lifestyle, and plant support rather than symptom masking alone.",
      "Products across the live store repeatedly reference healing for GERD, gastritis, acid reflux, ulcer, and leaky gut through herbal blends, digestive enzymes, and cleansing support.",
      "This therapy session is best framed as a guided digestive-healing track that helps clients understand triggers, repair the gut lining, and build a sustainable healing routine.",
    ],
    whatItCovers: [
      "One-on-one review of symptoms and eating patterns",
      "Meal and lifestyle guidance aimed at reducing reflux triggers",
      "Herbal supplement recommendations based on digestive needs",
      "Support around gut healing, inflammation reduction, and bowel comfort",
    ],
    whatsIncluded: [
      "Consultation and therapy guidance only",
      "Digestive-healing roadmap",
      "Product recommendations purchased separately",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
  },
  hypertension: {
    slug: "hypertension",
    title: "Hypertension Therapy",
    tagline: "THERAPY SESSION",
    shortTitle: "Hypertension",
    summary:
      "A one-on-one holistic support plan focused on blood-pressure balance through food, herbal support, follow-up, and sustainable lifestyle change.",
    fee: "100,000 Naira",
    format: [
      "One-on-one support",
      "Monthly follow-up",
      "Duration: 3 months",
    ],
    paragraphs: [
      "The live site explains that natural lifestyle changes, dietary improvements, and regular exercise can help lower blood pressure and reduce associated risks.",
      "This therapy involves an assessment session, food guidance tailored toward balanced blood pressure, herbal supplement recommendations, and ongoing holistic care around related risks.",
      "Clients are also guided on maintaining the results they achieve, with product purchases handled separately from the therapy fee.",
    ],
    whatItCovers: [
      "One-on-one consultation and assessment",
      "Food guide tailored toward blood-pressure support",
      "Holistic supplement recommendations",
      "Monthly follow-up for three months",
    ],
    whatsIncluded: [
      "Treatment protocol plan",
      "Maintenance guidance after initial support",
      "Therapy and consultation only, excluding herbs purchase",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
    paymentDetails: {
      bank: "GTB",
      accountNumber: "046 812 3896",
      accountName: "Sbm botanicals",
    },
  },
  "mens-reproductive": {
    slug: "mens-reproductive",
    title: "Men's Reproductive Health",
    tagline: "THERAPY SESSION",
    shortTitle: "Men's fertility",
    summary:
      "A fertility-focused support session for men, covering testing, food, lifestyle, cleanse support, and natural reproductive wellness guidance.",
    fee: "70,000 Naira",
    format: [
      "Phone consultation",
      "Holistic fertility support",
    ],
    paragraphs: [
      "The live page frames rising male infertility as a reason for both partners to examine fertility more intentionally and to consider natural cleansing and wellness support before conception.",
      "The session covers likely causes, recommended medical testing, a holistic fertility diet, cleanse guidance, supplement recommendations, and lifestyle practices aimed at healthier fertility outcomes.",
      "This therapy is positioned as an encouraging and practical natural route for men seeking better sperm count, motility, and overall reproductive health.",
    ],
    whatItCovers: [
      "One-on-one phone consultation",
      "Advice on likely causes and medical tests",
      "Holistic fertility diet guidance",
      "Support around sperm count and motility",
    ],
    whatsIncluded: [
      "Fertility cleanse guide",
      "Herbal supplement guidance",
      "Therapy and consultation only, excluding herbs purchase",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
    paymentDetails: {
      bank: "GTB",
      accountNumber: "046 812 3896",
      accountName: "Sbm botanicals",
      usdAccount: "0464773750 USD · GTB",
      ghanaAccount: "2051268861590 GHS · GTB",
    },
  },
  "preparing-conception": {
    slug: "preparing-conception",
    title: "Preparing for Conception",
    tagline: "THERAPY SESSION",
    shortTitle: "Conception prep",
    summary:
      "A four-month natural fertility support track designed to guide clients through food, assessment, follow-up, and holistic preparation for conception.",
    fee: "100,000 Naira",
    format: [
      "Guided therapy program",
      "Detailed follow-up",
      "Duration: 4 months",
    ],
    paragraphs: [
      "The live site describes infertility as a stressful and uncertain journey, and presents this therapy as a natural fertility path for clients who want structured support.",
      "The program includes a one-on-one consultation, medical assessment guidance, a holistic fertility approach, a fertility-focused meal guide, and detailed follow-up over four months.",
      "The therapy is explicitly separated from product purchases, with herbal recommendations handled after the treatment plan is defined.",
    ],
    whatItCovers: [
      "One-on-one consultation to understand the body",
      "Advice on medical assessment",
      "Four-month fertility therapy plan",
      "Detailed follow-up for four months",
    ],
    whatsIncluded: [
      "Meal guide tailored toward fertility nutrition",
      "Natural fertility planning support",
      "Therapy and consultation only, excluding herbs purchase",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
    paymentDetails: {
      bank: "GTB",
      accountNumber: "046 812 3896",
      accountName: "Sbm botanicals",
      usdAccount: "0464773750 USD · GTB",
      ghanaAccount: "2051268861590 GHS · GTB",
    },
  },
  "reversing-diabetes": {
    slug: "reversing-diabetes",
    title: "Reversing Diabetes",
    tagline: "THERAPY SESSION",
    shortTitle: "Diabetes support",
    summary:
      "A four-month holistic diabetes support program centered on diet, lifestyle, and plant-based supplement guidance.",
    fee: "70,000 Naira",
    format: [
      "Holistic program",
      "Diet + lifestyle + herbal support",
      "Duration: 4 months",
    ],
    paragraphs: [
      "The live site says that diet, lifestyle, and herbal remedies are the constants in reversing disease holistically, and applies that principle directly to diabetes support.",
      "Clients are guided toward a diabetes-friendly nutrition pattern, healthier daily habits, and herbal supplements intended to support root-cause care rather than symptom masking.",
      "The therapy fee covers support and consultation only, with herbal product recommendations purchased separately from the online shop.",
    ],
    whatItCovers: [
      "Diet guidance tailored to diabetic needs",
      "Lifestyle support aimed at long-term change",
      "Herbal supplement recommendations",
      "Whole-person holistic healing approach",
    ],
    whatsIncluded: [
      "Therapy and consultation support",
      "Recommended product list purchased separately",
      "Four-month guidance structure",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
    paymentDetails: {
      bank: "GTB",
      accountNumber: "046 812 3896",
      accountName: "Sbm botanicals",
      usdAccount: "0464773750 USD · GTB",
      ghanaAccount: "2051268861590 GHS · GTB",
    },
  },
  "reversing-pcos": {
    slug: "reversing-pcos",
    title: "Reversing PCOS",
    tagline: "THERAPY SESSION",
    shortTitle: "PCOS support",
    summary:
      "A reproductive wellness therapy path focused on hormone balance, cycle support, womb health, and holistic lifestyle change.",
    fee: "Available on enquiry",
    format: [
      "Women's hormone support",
      "Food + herbal + lifestyle guidance",
    ],
    paragraphs: [
      "PCOS appears within the Holistic Farmacy therapy navigation alongside conception and reproductive-health support, indicating a women hormone and womb-health pathway.",
      "Across the live catalog, related products emphasize fibroid support, womb cleansing, hormone balance, fertility nutrition, and menstrual wellness, which strongly informs how this therapy should be positioned.",
      "This session can be framed as a guided plan around food, herbal support, cycle awareness, and holistic routines that support better hormonal balance and reproductive wellness.",
    ],
    whatItCovers: [
      "Hormone-supportive food and lifestyle guidance",
      "Cycle and reproductive-wellness support",
      "Herbal recommendations aligned to womb-health goals",
      "Holistic plan for long-term consistency",
    ],
    whatsIncluded: [
      "Consultation and therapy guidance",
      "Reproductive-wellness support plan",
      "Products recommended separately",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
  },
  "cancer-therapy": {
    slug: "cancer-therapy",
    title: "Cancer Therapy Program",
    tagline: "THERAPY SESSION",
    shortTitle: "Cancer therapy",
    summary:
      "A guided holistic support program that works alongside medical care, using food, lifestyle, and plant support to strengthen the healing journey.",
    fee: "120,000 Naira",
    format: [
      "Guided therapy program",
      "Medical + holistic support approach",
    ],
    paragraphs: [
      "The live site clearly states that clients dealing with cancer should use a holistic approach together with medical treatment rather than abandoning one for the other.",
      "The program focuses on lifestyle review, healthy diet guidance tailored to the ailment, and herbal supplement direction aligned to the client specific condition.",
      "After the initial information is provided, clients have access to continued communication with the therapist or founder throughout the program.",
    ],
    whatItCovers: [
      "Holistic support alongside medical care",
      "Diet guidance tailored to the client condition",
      "Lifestyle review and improvement support",
      "Open communication with the therapist during the program",
    ],
    whatsIncluded: [
      "Therapy and consultation only",
      "Prayer-request option via email",
      "Herbal products purchased separately",
    ],
    contactEmail: "customercare@sbmholisticfarmacy.com",
    contactPhone: "+(234)8055530827",
    paymentDetails: {
      bank: "GTB",
      accountNumber: "046 812 3896",
      accountName: "Sbm botanicals",
      usdAccount: "0464773750 USD · GTB",
      ghanaAccount: "2051268861590 GHS · GTB",
    },
  },
};

export const allTherapySessions = Object.values(therapySessionsData);
