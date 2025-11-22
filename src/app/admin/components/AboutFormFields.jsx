"use client";

/**
 * AboutFormFields Component
 * ฟอร์มสำหรับแก้ไขข้อมูล About page
 */
export default function AboutFormFields({ data, onChange, onSave }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📌 Page Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="About Me"
        />
        <p className="text-xs text-gray-500 mt-1">
          Main title displayed at the top of the About page
        </p>
      </div>

      {/* Description/Tagline */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ✨ Tagline / Short Description
        </label>
        <input
          type="text"
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="IT Support / Programmer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Short professional title or tagline (e.g., &quot;Full Stack Developer&quot;)
        </p>
      </div>

      {/* Profile Image URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🖼️ Profile Image URL
        </label>
        <input
          type="url"
          value={data.imageUrl || ""}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="https://example.com/profile-image.jpg"
        />
        <p className="text-xs text-gray-500 mt-1">
          URL to your profile picture (leave empty to hide image)
        </p>
        {data.imageUrl && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onError={(e) => {
                e.target.src = "";
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📝 About Content
        </label>
        <textarea
          value={data.content}
          onChange={(e) => handleChange("content", e.target.value)}
          rows={8}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all font-mono text-sm"
          placeholder="Write your bio and experience here..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Main content about yourself, your experience, and goals
        </p>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          💼 Skills & Technologies
        </label>
        <input
          type="text"
          value={data.skills || ""}
          onChange={(e) => handleChange("skills", e.target.value)}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="Next.js, React, TypeScript, Tailwind CSS, Node.js"
        />
        <p className="text-xs text-gray-500 mt-1">
          Comma-separated list of your skills and technologies
        </p>
        {data.skills && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-lg border border-[var(--color-primary)]/30"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t-2 border-gray-200">
        <button
          onClick={onSave}
          className="w-full md:w-auto bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
        >
          💾 Save About Content
        </button>
      </div>
    </div>
  );
}

