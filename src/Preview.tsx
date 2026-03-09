import type { ResumeData } from "./utilities/types";

interface Props {
  data: ResumeData;
  templateId: string | null;
  summary: string | null;
}

const sectionTitle = "font-display font-semibold text-sm uppercase tracking-wider mb-2";

const Preview = ({ data, templateId, summary }: Props) => {
  const accentColor = templateId === "modern" ? "hsl(40 90% 55%)"
    : templateId === "creative" ? "hsl(280 60% 50%)"
    : templateId === "tech" ? "hsl(160 60% 35%)"
    : templateId === "executive" ? "hsl(210 50% 15%)"
    : templateId === "minimal" ? "hsl(0 0% 25%)"
    : "hsl(220 60% 20%)";

  return (
    <div className="bg-card rounded-2xl shadow-elevated p-8 max-w-[600px] mx-auto min-h-[700px] border border-border">

      {/* Header */}
      <div className="mb-6 pb-4" style={{ borderBottom: `3px solid ${accentColor}` }}>
        <h2 className="font-display text-2xl font-bold" style={{ color: accentColor }}>
          {data.candidate.fullName || "John Doe"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {data.candidate.email || "john.doe@email.com"} · {data.candidate.phone || "(555) 123-4567"}
        </p>
        <p className="text-muted-foreground text-sm">
          {data.candidate.linkedin || "john.doe-linkedin"} · {data.candidate.github || "john.doe-github"}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <h3 className={sectionTitle} style={{ color: accentColor }}>Summary</h3>
        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {summary || "Your summary will appear here..."}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h3 className={sectionTitle} style={{ color: accentColor }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills
            ? data.skills.split(",").map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  {s.trim()}
                </span>
              ))
            : <p className="text-sm text-muted-foreground">Your skills will appear here...</p>}
        </div>
      </div>
      
      {/* Experience */}
      <div className="mb-5">
        <h3 className={sectionTitle} style={{ color: accentColor }}>Experience</h3>
        {data.experience.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your experience details will appear here...</p>
        ) : (
          <div className="space-y-4">
            {data.experience.map((entry) => (
              <div key={entry.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {entry.name || "Company Name"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {entry.fromYear || ""} — {entry.toYear || ""}
                  </span>
                </div>
                <p className="text-xs italic text-foreground whitespace-pre-wrap leading-relaxed mt-1">
                  {entry.role || "Role"}
                </p>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mt-1">
                  {entry.details || "Experience details..."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Updated Projects */}
      <div className="mb-5">
        <h3 className={sectionTitle} style={{ color: accentColor }}>Projects</h3>
        {data.projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your project details will appear here...</p>
        ) : (
          <div className="space-y-4">
            {data.projects.map((entry) => (
              <div key={entry.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {entry.name || "Name"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {entry.link}
                  </span>
                </div>
                <p className="text-xs italic text-foreground whitespace-pre-wrap leading-relaxed mt-1">
                  {entry.technologies || "Technologies"}
                </p>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mt-1">
                  {entry.description || "Project description..."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h3 className={sectionTitle} style={{ color: accentColor }}>Achievements</h3>
        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {data.achievements || "Your achievements will appear here..."}
        </p>
      </div>
    </div>
  );
};

export default Preview;
