export type ExperienceKind = "work" | "research" | "community" | "education" | "creator";

export type Experience = {
  period: string;
  title: string;
  organization: string;
  kind: ExperienceKind;
  location?: string;
  summary: string;
  details: string[];
};

export const experiences: Experience[] = [
  {
    period: "Aug 2026 — now",
    title: "AI Content Lead",
    organization: "YAAS",
    kind: "work",
    location: "Bengaluru, India",
    summary: "AI and technology content strategy, research, scripting, workflows, publishing, and performance analysis.",
    details: [
      "Research AI tools, emerging technologies, practical use cases, and audience opportunities.",
      "Translate technical subjects into clear narratives, scripts, hooks, and visual concepts.",
      "Own the path from research and ideation through publishing, analytics, and iteration.",
    ],
  },
  {
    period: "2025 — 2026",
    title: "AI Research Associate",
    organization: "Amity University",
    kind: "research",
    location: "Noida, India",
    summary: "Applied AI/ML and computational workflows for cancer genomics, neoantigen discovery, peptide prediction, and vaccine-design research.",
    details: [
      "Worked across sequencing pipelines, peptide feature engineering, immunogenicity prediction, and model evaluation.",
      "Experimented with classical ML, sequence embeddings, GRU/CNN/LSTM approaches, and research automation workflows.",
      "Contributed to literature review, methodology, experiments, analysis, technical documentation, and research tooling.",
    ],
  },
  {
    period: "Jan 2024 — now",
    title: "Founder",
    organization: "Notansun",
    kind: "community",
    summary: "An AI-first education and product initiative for students and early-career builders.",
    details: [
      "Started with programming, AI, career workshops, mentorship, and learning content.",
      "Works across product experiments, technology, community building, and practical learning systems.",
    ],
  },
  {
    period: "Aug 2025 — Feb 2026",
    title: "Gemini Student Ambassador",
    organization: "Google",
    kind: "community",
    summary: "Explored and demonstrated practical Gemini use cases for study, writing, coding, research, brainstorming, and content.",
    details: ["Campus/community outreach, product exploration, educational use cases, and feedback."],
  },
  {
    period: "Oct 2025 — Jan 2026",
    title: "Artificial Intelligence Intern",
    organization: "Infosys Springboard",
    kind: "work",
    summary: "Structured learning and project work across AI, ML, deep learning, NLP, generative AI, and data science.",
    details: [],
  },
  {
    period: "Jul — Dec 2025",
    title: "Campus Ambassador",
    organization: "E-Cell, IIT Bombay",
    kind: "community",
    summary: "Student outreach and promotion for entrepreneurship programs, workshops, events, and participation opportunities.",
    details: [],
  },
  {
    period: "Jun — Aug 2025",
    title: "AI & ML Intern",
    organization: "IBM SkillsBuild",
    kind: "work",
    summary: "Applied machine-learning internship centered on an end-to-end employee salary prediction project.",
    details: [
      "Worked through preprocessing, feature engineering, model training, evaluation, tuning, explainability, and Streamlit deployment.",
      "Used Python, scikit-learn, Random Forest, XGBoost, GridSearchCV, SHAP, and Streamlit.",
    ],
  },
  {
    period: "Oct 2024 — Jan 2025",
    title: "AI & ML Intern",
    organization: "TechVidya Career",
    kind: "work",
    location: "Noida, India",
    summary: "Hands-on training across machine learning, deep learning, NLP, data science, and computer vision.",
    details: ["Built multiple practice projects across regression, classification, NLP, and text recognition."],
  },
  {
    period: "Nov 2023 — Jan 2024",
    title: "Campus Ambassador",
    organization: "E-Cell, IIT Guwahati",
    kind: "community",
    summary: "Campus outreach for entrepreneurship opportunities, events, workshops, and student participation.",
    details: [],
  },
  {
    period: "Apr — Nov 2023",
    title: "Subject Matter Expert",
    organization: "Brainly",
    kind: "education",
    summary: "Answered 1,000+ questions across mathematics, computer science, information technology, and related subjects.",
    details: ["Focused on clear, step-by-step explanations rather than final answers alone."],
  },
  {
    period: "2022 — 2025",
    title: "Bachelor of Computer Applications",
    organization: "Dr. Ram Manohar Lohia Avadh University / Shri Lal Bahadur Shastri Degree College",
    kind: "education",
    location: "Gonda, India",
    summary: "Computer Science & IT foundation spanning programming, databases, data structures, networking, and applied software work.",
    details: [],
  },
  {
    period: "Jan 2020 — Jul 2022",
    title: "Education Creator",
    organization: "Early YouTube chapter",
    kind: "creator",
    summary: "Created student-focused educational videos, board-exam preparation, visual explanations, and study content while still in school.",
    details: [
      "The earliest polished topics included improving handwriting and improving marks in board examinations.",
      "Later content expanded into science concepts, diagrams, exam questions, and preparation-oriented videos.",
    ],
  },
];

export const experienceKinds: Record<ExperienceKind, string> = {
  work: "Industry",
  research: "Research",
  community: "Community",
  education: "Education",
  creator: "Creator",
};
