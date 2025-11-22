"use client";

/**
 * AboutPreview Component
 * แสดงตัวอย่างหน้า About ก่อนบันทึก
 */
export default function AboutPreview({ data }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            Preview Mode
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
          {data.title || "Untitled"}
        </h1>

        {/* Description/Tagline */}
        {data.description && (
          <p className="text-2xl text-center text-gray-600 italic mb-8">
            {data.description}
          </p>
        )}

        {/* Profile Image */}
        {data.imageUrl && (
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full blur opacity-75"></div>
              <img
                src={data.imageUrl}
                alt={data.title}
                className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        {data.content && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
              {data.content}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💼</span>
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white text-[var(--color-primary)] font-semibold rounded-xl text-sm border-2 border-[var(--color-primary)] shadow-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preview Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a preview. Click "Edit" to make changes.</p>
        </div>
      </div>
    </div>
  );
}

