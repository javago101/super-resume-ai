import React from "react";
import { useResume } from "../hooks/useResume";
import PDFResume from "./PDFResume";
import { pdf } from "@react-pdf/renderer";

const defaultResume = {
  hero: { name: "", intro: "", goal: "" },
  skills: [],
  projects: [],
  education: { school: "", degree: "", graduation: "" },
  contact: { email: "", github: "", linkedin: "" },
};

function formatPhone(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7
    )}`;
  } else {
    return phone;
  }
}

export default function ResumeEditor() {
  const {
    resume,
    setResume,
    isSaving,
    saveStatus,
    saveResume,
    loadLocalResume,
    exportResume,
  } = useResume(defaultResume);

  // 定义导出 PDF 的函数
  const handleExportPDF = async () => {
    const blob = await pdf(<PDFResume resume={resume} />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  // 如果 resume 还没加载好，先显示 loading
  if (!resume || !resume.hero) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading resume...</div>
    );
  }

  const updateHeroField = (field, value) => {
    setResume((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));

    const exportToPDF = async () => {
      const input = document.getElementById("resume-content");
      if (!input) return;

      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("My_Resume.pdf");
    };
  };

  return (
    <div
      id="resume-content"
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10"
    >
      {/* Hero Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">👤 Personal Introduction</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={resume.hero.name}
            onChange={(e) => updateHeroField("name", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Introduction</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={2}
            value={resume.hero.intro}
            onChange={(e) => updateHeroField("intro", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Goal</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={resume.hero.goal}
            onChange={(e) => updateHeroField("goal", e.target.value)}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🧠 Skills</h2>

        {resume.skills.map((skill, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              className="flex-1 border px-3 py-2 rounded mr-2"
              value={skill}
              onChange={(e) => {
                const updatedSkills = [...resume.skills];
                updatedSkills[index] = e.target.value;
                setResume((prev) => ({ ...prev, skills: updatedSkills }));
              }}
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const updatedSkills = resume.skills.filter(
                  (_, i) => i !== index
                );
                setResume((prev) => ({ ...prev, skills: updatedSkills }));
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setResume((prev) => ({
              ...prev,
              skills: [...prev.skills, ""],
            }));
          }}
        >
          ➕ Add Skill
        </button>
      </section>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">💻 Projects</h2>

        {resume.projects.map((project, index) => (
          <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
            <div className="mb-2">
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].title = e.target.value;
                  setResume((prev) => ({ ...prev, projects: updatedProjects }));
                }}
              />
            </div>

            <div className="mb-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                rows={2}
                value={project.description}
                onChange={(e) => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].description = e.target.value;
                  setResume((prev) => ({ ...prev, projects: updatedProjects }));
                }}
              />
            </div>

            <div className="mb-2">
              <label className="block font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                className="w-full border px-3 py-2 rounded"
                value={project.url}
                onChange={(e) => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].url = e.target.value;
                  setResume((prev) => ({ ...prev, projects: updatedProjects }));
                }}
              />
            </div>

            <button
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => {
                const updatedProjects = resume.projects.filter(
                  (_, i) => i !== index
                );
                setResume((prev) => ({ ...prev, projects: updatedProjects }));
              }}
            >
              🗑 Delete Project
            </button>
          </div>
        ))}

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setResume((prev) => ({
              ...prev,
              projects: [
                ...prev.projects,
                { title: "", description: "", url: "" },
              ],
            }));
          }}
        >
          ➕ Add Project
        </button>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🎓 Education</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">School</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={resume.education.school}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                education: { ...prev.education, school: e.target.value },
              }))
            }
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Degree</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={resume.education.degree}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                education: { ...prev.education, degree: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Expected Graduation Year
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={resume.education.graduation}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                education: { ...prev.education, graduation: e.target.value },
              }))
            }
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📬 Contact Information</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border px-3 py-2 rounded"
            value={formatPhone(resume.contact.phone || "")}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                contact: { ...prev.contact, phone: e.target.value },
              }))
            }
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={resume.contact.email}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                contact: { ...prev.contact, email: e.target.value },
              }))
            }
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">GitHub</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            value={resume.contact.github}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                contact: { ...prev.contact, github: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-1">LinkedIn</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            value={resume.contact.linkedin}
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                contact: { ...prev.contact, linkedin: e.target.value },
              }))
            }
          />
        </div>
      </section>

      {/* Save / Export / Import Buttons */}
      <section className="mt-10 text-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={saveResume}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={exportResume}
        >
          ⬇️ Export JSON
        </button>

        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={handleExportPDF}
        >
          📄 Export PDF
        </button>

        <label className="inline-block cursor-pointer px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          📁 Import JSON
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) loadLocalResume(file);
            }}
            className="hidden"
          />
        </label>

        {saveStatus === "success" && (
          <p className="text-green-600 mt-2">✅ Saved successfully!</p>
        )}
        {saveStatus === "error" && (
          <p className="text-red-600 mt-2">
            ❌ Failed to save. Please try again.
          </p>
        )}
      </section>
    </div>
  );
}
