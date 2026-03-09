// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Download, FileText, Loader2, Sparkles } from "lucide-react";
// import { useResume } from "./utilities/resume-context";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
// import { saveAs } from "file-saver";
// import Preview from "./Preview";

// const Export = () => {
//     const navigate = useNavigate();
//     const { resumeData, selectedTemplate } = useResume();
//     const [generating, setGenerating] = useState(false);
//     const [summary, setSummary] = useState<string | null>(null);
//     const [exporting, setExporting] = useState(false);
//     const previewRef = useRef<HTMLDivElement>(null);

//     const generateSummary = () => {
//         setGenerating(true);
//         // TODO: API call to generate AI summary from resumeData
//         setTimeout(() => {
//             setSummary(
//                 "Results-driven professional with extensive experience in software development and project management. " +
//                 "Proven track record of delivering high-quality solutions using modern technologies."
//             );
//             setGenerating(false);
//         }, 2000);
//     };

//     const handleDownloadDOCX = async () => {
//         setExporting(true);
//         try {
//             const children: Paragraph[] = [];

//             // Name header
//             children.push(
//                 new Paragraph({
//                     children: [new TextRun({ text: "John Doe", bold: true, size: 32, font: "Calibri" })],
//                     heading: HeadingLevel.HEADING_1,
//                     alignment: AlignmentType.LEFT,
//                 }),
//                 new Paragraph({
//                     children: [new TextRun({ text: "john.doe@email.com · (555) 123-4567", size: 20, color: "666666" })],
//                     spacing: { after: 300 },
//                 })
//             );

//             // Summary
//             if (summary) {
//                 children.push(
//                     new Paragraph({ children: [new TextRun({ text: "Summary", bold: true, size: 24 })], spacing: { before: 200, after: 100 } }),
//                     new Paragraph({ children: [new TextRun({ text: summary, size: 20 })], spacing: { after: 300 } })
//                 );
//             }

//             // Experience
//             children.push(
//                 new Paragraph({ children: [new TextRun({ text: "Experience", bold: true, size: 24 })], spacing: { before: 200, after: 100 } })
//             );
//             if (resumeData.experience.length === 0) {
//                 children.push(new Paragraph({ children: [new TextRun({ text: "No experience added.", italics: true, size: 20 })] }));
//             } else {
//                 resumeData.experience.forEach((entry) => {
//                     children.push(
//                         new Paragraph({
//                             children: [
//                                 new TextRun({ text: entry.name || "Name", bold: true, size: 22 }),
//                                 new TextRun({ text: `  (${entry.fromYear || "----"} — ${entry.toYear || "----"})`, size: 20, color: "666666" }),
//                             ],
//                             spacing: { before: 100 },
//                         }),
//                         new Paragraph({ children: [new TextRun({ text: entry.details || "", size: 20 })], spacing: { after: 200 } })
//                     );
//                 });
//             }

//             // Skills
//             if (resumeData.skills) {
//                 children.push(
//                     new Paragraph({ children: [new TextRun({ text: "Skills", bold: true, size: 24 })], spacing: { before: 200, after: 100 } }),
//                     new Paragraph({ children: [new TextRun({ text: resumeData.skills, size: 20 })], spacing: { after: 300 } })
//                 );
//             }

//             // Updated Projects
//             children.push(
//                 new Paragraph({ children: [new TextRun({ text: "Projects", bold: true, size: 24 })], spacing: { before: 200, after: 100 } })
//             );
//             if (resumeData.experience.length === 0) {
//                 children.push(new Paragraph({ children: [new TextRun({ text: "No projects added.", italics: true, size: 20 })] }));
//             } else {
//                 resumeData.projects.forEach((entry) => {
//                     children.push(
//                         new Paragraph({
//                             children: [
//                                 new TextRun({ text: entry.name || "Name", bold: true, size: 22 }),
//                                 new Paragraph({ children: [new TextRun({ text: entry.technologies || "", size: 20 })], spacing: { after: 300 } })
//                             ],
//                             spacing: { before: 100 },
//                         }),
//                         new Paragraph({ children: [new TextRun({ text: entry.description || "", size: 20 })], spacing: { after: 200 } })
//                     );
//                 });
//             }

//             // // Projects
//             // if (resumeData.projects) {
//             //     children.push(
//             //         new Paragraph({ children: [new TextRun({ text: "Projects", bold: true, size: 24 })], spacing: { before: 200, after: 100 } }),
//             //         new Paragraph({ children: [new TextRun({ text: resumeData.projects, size: 20 })], spacing: { after: 300 } })
//             //     );
//             // }

//             // Achievements
//             if (resumeData.achievements) {
//                 children.push(
//                     new Paragraph({ children: [new TextRun({ text: "Achievements", bold: true, size: 24 })], spacing: { before: 200, after: 100 } }),
//                     new Paragraph({ children: [new TextRun({ text: resumeData.achievements, size: 20 })], spacing: { after: 300 } })
//                 );
//             }

//             const doc = new Document({ sections: [{ children }] });
//             const blob = await Packer.toBlob(doc);
//             saveAs(blob, "resume.docx");
//         } catch (err) {
//             console.error("DOCX export failed:", err);
//         } finally {
//             setExporting(false);
//         }
//     };

//     const handleDownloadPDF = async () => {
//         if (!previewRef.current) return;
//         setExporting(true);
//         try {
//             const canvas = await html2canvas(previewRef.current, {
//                 scale: 2,
//                 useCORS: true,
//                 backgroundColor: "#ffffff",
//             });
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//             pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//             pdf.save("resume.pdf");
//         } catch (err) {
//             console.error("PDF export failed:", err);
//         } finally {
//             setExporting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-background py-16 px-4">
//             <div className="max-w-4xl mx-auto">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
//                     <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-2">Step 3</p>
//                     <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Finalize & Export</h1>
//                     <p className="text-muted-foreground max-w-md mx-auto">Generate an AI summary and download your polished resume.</p>
//                 </motion.div>

//                 {/* AI Summary */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8"
//                 >
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                             <Sparkles className="h-5 w-5 text-accent" />
//                             <h3 className="font-display font-semibold">AI-Generated Summary</h3>
//                         </div>
//                         <button
//                             onClick={generateSummary}
//                             disabled={generating}
//                             className="px-4 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors inline-flex items-center gap-2 text-sm disabled:opacity-50"
//                         >
//                             {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
//                             {generating ? "Generating..." : "Generate Summary"}
//                         </button>
//                     </div>
//                     {summary ? (
//                         <p className="text-foreground leading-relaxed bg-muted/50 rounded-xl p-4">{summary}</p>
//                     ) : (
//                         <p className="text-muted-foreground text-sm italic">Click "Generate Summary" to create an AI-powered professional summary.</p>
//                     )}
//                 </motion.div>

//                 {/* Preview */}
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
//                     <div ref={previewRef}>
//                         <Preview data={resumeData} templateId={selectedTemplate} />
//                     </div>
//                 </motion.div>

//                 {/* Actions */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="flex flex-col sm:flex-row justify-center gap-4"
//                 >
//                     <button onClick={() => navigate("/editor")} className="px-8 py-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors">
//                         Back to Editor
//                     </button>
//                     <button
//                         onClick={handleDownloadPDF}
//                         disabled={exporting}
//                         className="gradient-accent text-accent-foreground rounded-full px-8 py-2.5 font-display hover:scale-105 transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-50"
//                     >
//                         {exporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />} Download PDF
//                     </button>
//                     <button
//                         onClick={handleDownloadDOCX}
//                         disabled={exporting}
//                         className="px-8 py-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
//                     >
//                         {exporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />} Export as DOCX
//                     </button>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Export;
