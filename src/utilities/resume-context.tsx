import { createContext, useContext, useState, type ReactNode } from "react";
import type { ResumeData } from "./types";

interface ResumeContextType {
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string) => void;
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    candidate: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    },
    experience: [],
    skills: "",
    projects: [],
    achievements: "",
  });

  return (
    <ResumeContext.Provider value={{ selectedTemplate, setSelectedTemplate, resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};
