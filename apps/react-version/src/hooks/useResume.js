import { useState, useEffect } from "react";

export function useResume(initialResume) {
  const [resume, setResume] = useState(initialResume);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // ✅ 加载远程 JSON
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/resume");
        if (!response.ok) throw new Error("Failed to load resume");
        const data = await response.json();
        setResume(data);
      } catch (error) {
        console.error("❌ Error loading resume:", error);
      }
    };
    fetchResume();
  }, []);

  // ✅ 保存简历（POST）
  const saveResume = async () => {
    setIsSaving(true);
    setSaveStatus("");

    try {
      const response = await fetch("http://localhost:3001/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      if (response.ok) {
        setSaveStatus("success");
      } else {
        throw new Error("Save failed");
      }
    } catch (err) {
      console.error("❌ Error saving resume:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // ✅ 本地上传 JSON 文件
  const loadLocalResume = (file) => {
     if (!(file instanceof Blob)) {
    console.error("Provided file is not a Blob or File.");
    return;
  }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setResume(data);
      } catch {
        alert("❌ Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // ✅ 导出为 JSON 文件
  const exportResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    resume,
    setResume,
    isSaving,
    saveStatus,
    saveResume,
    loadLocalResume,
    exportResume,
  };
}
