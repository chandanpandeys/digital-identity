export type ResumeVariant = "ai-llm-engineer" | "ai-research-ml" | "ai-content-developer-educator";

type ResumeEntry = {
  title: string;
  organization?: string;
  meta?: string;
  bullets: string[];
  evidence?: string;
  url?: string;
};

type ResumeSkill = { label: string; value: string };

export type ResumeData = {
  filename: string;
  headline: string;
  summary: string;
  experience: ResumeEntry[];
  work: ResumeEntry[];
  skills: ResumeSkill[];
  educationNote?: string;
};

const education = "Bachelor of Computer Applications (BCA) - Shri Lal Bahadur Shastri Degree College / Dr. Ram Manohar Lohia Avadh University | 2022 - 2025 | Gonda, India | CS & IT: OOP, DBMS, data structures, networking, applied software";

export const resumeData: Record<ResumeVariant, ResumeData> = {
  "ai-llm-engineer": {
    filename: "Chandan_Pandey_AI_LLM_Engineer_Resume.pdf",
    headline: "AI Engineer | LLM Systems | Developer Tools",
    summary: "AI engineer and builder across LLM infrastructure, agents, applied ML, developer tooling, automation, and computational research. Public work emphasizes reproducible evidence and systems that survive beyond the demo.",
    experience: [
      {
        title: "AI Research Associate",
        organization: "Amity University",
        meta: "2025 - 2026 | Noida, India",
        bullets: [
          "Built and evaluated AI/ML workflows for cancer genomics, neoantigen discovery, peptide prediction, sequence modelling, and computational vaccine research.",
          "Worked across classical ML, embeddings, GRU/CNN/LSTM approaches, research automation, evaluation, and AI-powered research/web tools.",
        ],
      },
      {
        title: "AI Content Lead",
        organization: "YAAS",
        meta: "Aug 2026 - Present | Bengaluru, India",
        bullets: ["Research AI tools and use cases; turn technical material into practical workflows, scripts, and narratives, with analytics/SEO-led iteration."],
      },
      {
        title: "AI & ML Intern",
        organization: "IBM SkillsBuild",
        meta: "Jun - Aug 2025 | Remote",
        bullets: ["Built an end-to-end salary classification system with preprocessing, model comparison, tuning, explainability, and Streamlit deployment; first-party record reports 85.7% test accuracy for the selected model."],
      },
    ],
    work: [
      {
        title: "ByteToken",
        organization: "Public open source | LLM infrastructure",
        bullets: ["Tokenizer-aware lossless transport for agent/MCP payloads; public o200k_base benchmarks explicitly separate raw encoding gains from compression gains."],
        evidence: "PUBLIC / INSPECTABLE",
        url: "github.com/chandanpandeys/bytetoken",
      },
      {
        title: "InferBench",
        organization: "Public open source | Local LLM evaluation",
        bullets: ["Python CLI for hardware preflight and local-model evaluation across fit, speed, memory, power/energy, quality, reports, and comparison."],
        evidence: "PUBLIC / INSPECTABLE",
        url: "github.com/chandanpandeys/inferbench",
      },
      {
        title: "EpitopePred",
        organization: "Computational vaccine platform",
        bullets: ["Contributed to Next.js + FastAPI + Celery + Redis async scientific workflows and 15+ bioinformatics/tool integrations."],
        evidence: "DOCUMENTED / FIRST-PARTY",
      },
      {
        title: "DekhoSuno",
        organization: "Public | AI accessibility",
        bullets: ["Flutter app combining Gemini, ML Kit, OCR, speech, computer vision, sensors, and accessible visual/audio assistance flows."],
        evidence: "PUBLIC / INSPECTABLE",
        url: "github.com/chandanpandeys/DekhoSuno",
      },
    ],
    skills: [
      { label: "LLM / Agents", value: "AI agents, RAG, LangGraph, MCP, context engineering, Gemini/model APIs, automation" },
      { label: "ML / Data", value: "Python, scikit-learn, TensorFlow, pandas, NumPy, NLP, embeddings, sequence modelling, evaluation" },
      { label: "Engineering", value: "TypeScript/JavaScript, Next.js, FastAPI, Flask, REST APIs, Streamlit, Docker, Git/GitHub, CI/CD, Linux" },
      { label: "Research", value: "Experiment design, benchmarking, literature review, computational biology workflows, technical documentation" },
    ],
    educationNote: education,
  },
  "ai-research-ml": {
    filename: "Chandan_Pandey_AI_Research_ML_Resume.pdf",
    headline: "AI Research | Machine Learning | Computational Biology",
    summary: "Applied AI/ML researcher and builder with experience in cancer genomics, neoantigen and peptide modelling, sequence-oriented ML, scientific workflow integration, evaluation, and research software.",
    experience: [
      {
        title: "AI Research Associate",
        organization: "Amity University",
        meta: "2025 - 2026 | Noida, India",
        bullets: [
          "Contributed to AI-based personalized neoantigen/cancer-vaccine research across whole-exome/transcriptome processing, mutation identification, peptide/MHC prediction, and downstream analysis.",
          "Worked with FASTp, BWA, GATK/Mutect2, STAR, HTSeq, IEDB, SYFPEITHI, NetMHCcons, NetChop, and TAP-binding prediction.",
          "Compared Random Forest, SVM, and Naive Bayes; applied sequence embeddings and GRU-based modelling; evaluated with accuracy, sensitivity/specificity, precision/recall, and AUC.",
          "Contributed to literature review, methodology, experiment design, results analysis, research tooling, and technical documentation.",
        ],
      },
      {
        title: "AI & ML Intern",
        organization: "IBM SkillsBuild",
        meta: "Jun - Aug 2025 | Remote",
        bullets: ["Built salary classification workflow with EDA, preprocessing, feature engineering, model comparison, CV/tuning, explainability, and Streamlit; first-party record reports 85.7% test accuracy."],
      },
      {
        title: "AI & ML Intern",
        organization: "TechVidya Career",
        meta: "Oct 2024 - Jan 2025 | Noida, India",
        bullets: ["Hands-on ML/DL/NLP/data-science/computer-vision training with multiple regression, classification, NLP, and text-recognition projects."],
      },
    ],
    work: [
      {
        title: "EpitopePred",
        organization: "Computational vaccine-design platform",
        bullets: [
          "Integrated Next.js with FastAPI, Celery, and Redis for durable async scientific jobs; worked across BLAST+, NetMHCpan/IIpan, NetChop, SignalP, DeepTMHMM, ESMFold and related stages.",
          "Master project record reports an approximately 400x operation-level improvement after vectorizing a dipeptide-composition feature path.",
        ],
        evidence: "DOCUMENTED / FIRST-PARTY",
      },
      {
        title: "ByteToken",
        organization: "Public open source | Benchmarking discipline",
        bullets: ["Reproducible token-cost benchmarking for structured/binary transport; reports preserve tokenizer, baseline, and compression qualifications."],
        evidence: "PUBLIC / INSPECTABLE",
        url: "github.com/chandanpandeys/bytetoken",
      },
    ],
    skills: [
      { label: "ML / DL", value: "scikit-learn, Random Forest, SVM, Naive Bayes, TensorFlow, CNN/LSTM/GRU, embeddings, sequence modelling" },
      { label: "Bioinformatics", value: "FASTp, BWA, GATK/Mutect2, STAR, HTSeq, IEDB, SYFPEITHI, NetMHCcons, NetChop" },
      { label: "Evaluation", value: "Accuracy, precision/recall, sensitivity/specificity, AUC, CV, model comparison, benchmarking" },
      { label: "Research Eng.", value: "Python, pandas, NumPy, FastAPI, Celery, Redis, Docker, async scientific jobs, tool integration" },
    ],
    educationNote: education + " | IBM SkillsBuild AI Fundamentals | Infosys AI Primer | TechVidya AI Program",
  },
  "ai-content-developer-educator": {
    filename: "Chandan_Pandey_AI_Content_Developer_Educator_Resume.pdf",
    headline: "AI Content Lead | Developer Educator | Technical Storytelling",
    summary: "AI and technology communicator with hands-on engineering/research depth. Works from technical research and validation through scripts, narratives, workflows, publishing, analytics, education, and community.",
    experience: [
      {
        title: "AI Content Lead",
        organization: "YAAS",
        meta: "Aug 2026 - Present | Bengaluru, India",
        bullets: [
          "Lead AI/technology content strategy and execution; research tools, emerging technologies, practical use cases, productivity/career themes, and audience opportunities.",
          "Develop formats, scripts, hooks, narratives, and visual concepts; translate complex technical subjects into clear explanations.",
          "Own research-to-publishing workflows and iterate using SEO, analytics, social insights, audience behaviour, and platform trends.",
        ],
      },
      {
        title: "Founder",
        organization: "Notansun",
        meta: "Jan 2024 - Present",
        bullets: ["Built an AI-first education/product initiative spanning programming and AI workshops, mentorship, learning content, community, and product experiments; professional record reports reaching hundreds of students."],
      },
      {
        title: "Gemini Student Ambassador",
        organization: "Google",
        meta: "Aug 2025 - Feb 2026",
        bullets: ["Demonstrated practical Gemini use cases for studying, writing, coding, research, brainstorming, and content; shared resources and gathered student feedback."],
      },
      {
        title: "Subject Matter Expert",
        organization: "Brainly",
        meta: "Apr - Nov 2023 | Remote",
        bullets: ["Answered 1,000+ mathematics, computer-science, IT, and related questions with step-by-step reasoning."],
      },
      {
        title: "Education Creator",
        organization: "Early YouTube chapter",
        meta: "2020 - 2022",
        bullets: ["Created student-focused educational/exam-prep content while in school; earliest documented polished topics include handwriting and improving board-exam marks. Archive links remain unverified."],
      },
    ],
    work: [
      {
        title: "ByteToken + InferBench",
        organization: "Public developer tools",
        bullets: ["Open-source LLM context/transport and local-inference evaluation work provides implementation depth behind AI/technology storytelling."],
        evidence: "PUBLIC / INSPECTABLE",
        url: "github.com/chandanpandeys",
      },
      {
        title: "AI Research - Amity University",
        organization: "2025 - 2026",
        bullets: ["Applied ML research in cancer genomics, neoantigen discovery, peptide modelling, evaluation, and computational vaccine workflows strengthens scientific communication."],
        evidence: "PROFESSIONAL RECORD / FIRST-PARTY DETAILS",
      },
    ],
    skills: [
      { label: "Research", value: "AI tool evaluation, emerging-tech scanning, use-case analysis, source synthesis, technical fact-checking" },
      { label: "Content", value: "Strategy, scripting, hooks, story structure, visual concepts, technical simplification, education formats" },
      { label: "Growth", value: "SEO, AEO/GEO research, platform-aware formats, social insights, performance analysis, iteration" },
      { label: "AI / Tech", value: "Gemini/LLM tools, agents/RAG/LangGraph/MCP awareness, workflow design, Python, applied ML, developer tooling" },
    ],
    educationNote: education + " | Google Gemini Student Ambassador | IBM SkillsBuild AI & ML Internship | Infosys Springboard AI Program | E-Cell IIT Bombay / IIT Guwahati",
  },
};

export const resumeVariants = Object.keys(resumeData) as ResumeVariant[];

export function isResumeVariant(value: string): value is ResumeVariant {
  return value in resumeData;
}
