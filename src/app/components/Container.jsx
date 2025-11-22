"use client";

// === Container Component สำหรับ wrap เนื้อหาแต่ละหน้า ===
// ใช้สำหรับสร้าง layout ที่สวยงามและ consistent ทุกหน้า
export default function Container({ title, children, className = "" }) {
  return (
    <section className={`min-h-[70vh] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}>
      <div className="w-full max-w-6xl mx-auto bg-[var(--color-card-bg)] border-2 border-[var(--color-border)] rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300">
        {/* Page Title with Gradient */}
        {title && (
          <div className="mb-8 pb-6 border-b-2 border-[var(--color-border)]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] bg-clip-text text-transparent animate-gradient bg-300% mb-2">
              {title}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"></div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="text-sm sm:text-base text-[var(--color-text)]">
          {children}
        </div>
      </div>
    </section>
  );
}
