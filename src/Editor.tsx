import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useResume } from "./utilities/resume-context";
import Preview from "./Preview";
import type { ExperienceEntry, ProjectEntry } from "./utilities/types";
import { Plus, Trash2 } from "lucide-react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 40 }, (_, i) => String(currentYear - i));

const otherFields = [
  { key: "skills" as const, label: "Skills", rows: 3, placeholder: "React, TypeScript, Node.js, Python, AWS, Docker" },
  { key: "achievements" as const, label: "Achievements", rows: 5, placeholder: "• Award or recognition\n• Certification or milestone" },
];

const candidateInfoFields = [
  { key: "fullName" as const, label: "Full Name", rows: 1, placeholder: "John Doe" },
  { key: "email" as const, label: "Email", rows: 2, placeholder: "john.doe@email.com" },
  { key: "phone" as const, label: "Phone", rows: 2, placeholder: "(555) 123-4567" },
  { key: "linkedin" as const, label: "LinkedIn", rows: 3, placeholder: "john.doe-linkedin" },
  { key: "github" as const, label: "GitHub", rows: 3, placeholder: "john.doe-github" },
];

const Editor = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData, selectedTemplate } = useResume();

  const updateField = (field: "skills" | "projects" | "achievements" | "candidate.fullName" | "candidate.email" | "candidate.phone" | "candidate.linkedin" | "candidate.github", value: string) => {
    console.log(`Updated ${field}:`, value);
    if (field.startsWith("candidate.")) {
      const candidateField = field.split(".")[1] as keyof typeof resumeData.candidate;
      setResumeData({
        ...resumeData,
        candidate: {
          ...resumeData.candidate,
          [candidateField]: value,
        },
      });
    } else {
      setResumeData({ ...resumeData, [field]: value });
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: crypto.randomUUID(), name: "", role: "", details: "", fromYear: "", toYear: "" },
      ],
    });
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((e) => e.id !== id),
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: crypto.randomUUID(), name: "", link: "", description: "", technologies: "" },
      ],
    });
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Step 2</p>
            <h1 className="font-display font-bold text-xl">Edit Your Resume</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/")} className="px-6 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={() => navigate("/export")}
              className="gradient-accent text-accent-foreground rounded-full px-8 py-2 font-display hover:scale-105 transition-transform"
            >
              Continue to Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 p-6">
        {/* Left: Editor */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">

          {/* Candidate Info Section */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border space-y-4">
            <p className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Candidate Info
            </p>

            {/* Row 1: fullName, email, phone */}
            <div className="grid gap-4 md:grid-cols-3">
              {candidateInfoFields
                .filter((f) => ["fullName", "email", "phone"].includes(f.key))
                .map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={resumeData.candidate[field.key]}
                      onChange={(e) => updateField(`candidate.${field.key}`, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border-0 bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                ))}
            </div>

            {/* Row 2: linkedin, github */}
            <div className="grid gap-4 md:grid-cols-2">
              {candidateInfoFields
                .filter((f) => ["linkedin", "github"].includes(f.key))
                .map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={resumeData.candidate[field.key]}
                      onChange={(e) => updateField(`candidate.${field.key}`, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border-0 bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <label className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Experience
              </label>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                <Plus size={14} /> Add Company
              </button>
            </div>

            {resumeData.experience.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No experience added yet. Click "Add Company" to start.
              </p>
            )}

            <div className="space-y-4">
              {resumeData.experience.map((entry, index) => (
                <div key={entry.id} className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
                    <button
                      onClick={() => removeExperience(entry.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Company Name */}
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => updateExperience(entry.id, "name", e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  {/* Role */}
                  <input
                    type="text"
                    value={entry.role}
                    onChange={(e) => updateExperience(entry.id, "role", e.target.value)}
                    placeholder="Role"
                    className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  {/* From / To Year */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">From Year</label>
                      <select
                        value={entry.fromYear}
                        onChange={(e) => updateExperience(entry.id, "fromYear", e.target.value)}
                        className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">To Year</label>
                      <select
                        value={entry.toYear}
                        onChange={(e) => updateExperience(entry.id, "toYear", e.target.value)}
                        className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select</option>
                        <option value="Present">Present</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Experience Details */}
                  <textarea
                    value={entry.details}
                    onChange={(e) => updateExperience(entry.id, "details", e.target.value)}
                    placeholder="• Describe your responsibilities and achievements"
                    rows={4}
                    className="w-full resize-none rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Project Section */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <label className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Projects
              </label>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            {resumeData.projects.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No projects added yet. Click "Add Project" to start.
              </p>
            )}

            <div className="space-y-4">
              {resumeData.projects.map((entry, index) => (
                <div key={entry.id} className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
                    <button
                      onClick={() => removeProject(entry.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Project Name */}
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => updateProject(entry.id, "name", e.target.value)}
                    placeholder="Name"
                    className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  {/* Link */}
                  <input
                    type="text"
                    value={entry.link}
                    onChange={(e) => updateProject(entry.id, "link", e.target.value)}
                    placeholder="Link"
                    className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  {/* Technologies */}
                  <input
                    type="text"
                    value={entry.technologies}
                    onChange={(e) => updateProject(entry.id, "technologies", e.target.value)}
                    placeholder="Technologies used (comma separated)"
                    className="w-full rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  {/* Project Details */}
                  <textarea
                    value={entry.description}
                    onChange={(e) => updateProject(entry.id, "description", e.target.value)}
                    placeholder="• Describe your responsibilities and achievements"
                    rows={4}
                    className="w-full resize-none rounded-lg border-0 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other fields */}
          {otherFields.map((field) => (
            <div key={field.key} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <label className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                {field.label}
              </label>
              <textarea
                value={resumeData[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows}
                className="w-full resize-none rounded-lg border-0 bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          ))}
        </motion.div>

        {/* Right: Preview */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 text-center">Live Preview</p>
          <Preview data={resumeData} templateId={selectedTemplate} summary=""/>
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;
