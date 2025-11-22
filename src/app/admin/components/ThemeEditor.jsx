"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * ThemeEditor Component
 * จัดการและปรับแต่งธีมสีของเว็บไซต์
 */
export default function ThemeEditor() {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [themeData, setThemeData] = useState(theme);
  const [successMessage, setSuccessMessage] = useState("");

  // อัปเดต themeData เมื่อ theme เปลี่ยน
  useEffect(() => {
    setThemeData(theme);
  }, [theme]);

  // ฟังก์ชัน: บันทึกธีม
  const saveTheme = () => {
    const result = updateTheme(themeData);
    if (result.success) {
      setSuccessMessage("✅ Theme saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      alert("Failed to save theme");
    }
  };

  // ฟังก์ชัน: Reset ธีม
  const handleResetTheme = () => {
    if (!confirm("Reset theme to default colors?")) return;
    const result = resetTheme();
    if (result.success) {
      setSuccessMessage("✅ Theme reset to default!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] flex items-center gap-2 mb-2">
            <span>🎨</span>
            Customize Theme
          </h2>
          <p className="text-sm text-gray-500">
            Customize the color scheme of your website. Changes will apply site-wide.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl px-4 py-3 text-green-700 font-medium animate-fade-in">
          {successMessage}
        </div>
      )}

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Primary Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>🎯</span> Primary Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.primary}
              onChange={(e) => setThemeData({ ...themeData, primary: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.primary}
              onChange={(e) => setThemeData({ ...themeData, primary: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#10b981"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>✨</span> Secondary Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.secondary}
              onChange={(e) => setThemeData({ ...themeData, secondary: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.secondary}
              onChange={(e) => setThemeData({ ...themeData, secondary: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>🌌</span> Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.background}
              onChange={(e) => setThemeData({ ...themeData, background: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.background}
              onChange={(e) => setThemeData({ ...themeData, background: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>📝</span> Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.text}
              onChange={(e) => setThemeData({ ...themeData, text: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.text}
              onChange={(e) => setThemeData({ ...themeData, text: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>💫</span> Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.accent}
              onChange={(e) => setThemeData({ ...themeData, accent: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.accent}
              onChange={(e) => setThemeData({ ...themeData, accent: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#ef4444"
            />
          </div>
        </div>

        {/* Card Background Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>🃏</span> Card Background
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.cardBg || "#18181b"}
              onChange={(e) => setThemeData({ ...themeData, cardBg: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.cardBg || "#18181b"}
              onChange={(e) => setThemeData({ ...themeData, cardBg: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#18181b"
            />
          </div>
        </div>

        {/* Border Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>🔲</span> Border Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeData.border || "#27272a"}
              onChange={(e) => setThemeData({ ...themeData, border: e.target.value })}
              className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={themeData.border || "#27272a"}
              onChange={(e) => setThemeData({ ...themeData, border: e.target.value })}
              className="flex-1 bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 text-sm font-mono transition-all"
              placeholder="#27272a"
            />
          </div>
        </div>
      </div>

      {/* Border Radius Slider */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-5">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📐</span>
          Border Radius: <span className="text-[var(--color-primary)] text-lg">{themeData.borderRadius || 12}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="24"
          value={themeData.borderRadius || 12}
          onChange={(e) => setThemeData({ ...themeData, borderRadius: e.target.value })}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0px (Sharp)</span>
          <span>12px (Default)</span>
          <span>24px (Rounded)</span>
        </div>
      </div>

      {/* Shadow Style Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>🌟</span> Shadow Style
        </label>
        <select
          value={themeData.shadow || "lg"}
          onChange={(e) => setThemeData({ ...themeData, shadow: e.target.value })}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
        >
          <option value="none">None - No shadow</option>
          <option value="sm">Small - Subtle shadow</option>
          <option value="md">Medium - Moderate shadow</option>
          <option value="lg">Large - Prominent shadow</option>
          <option value="xl">Extra Large - Bold shadow</option>
        </select>
      </div>

      {/* Color Preview */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <span>👁️</span>
          Color Preview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.primary }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Primary</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.secondary }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Secondary</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.background }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Background</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.text }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Text</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.accent }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Accent</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.cardBg || "#18181b" }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Card BG</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-20 rounded-xl border-2 border-gray-600 shadow-lg mb-2"
              style={{ backgroundColor: themeData.border || "#27272a" }}
            ></div>
            <span className="text-xs text-gray-300 font-medium">Border</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-gray-200">
        <button
          onClick={saveTheme}
          className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
        >
          💾 Save Theme
        </button>
        <button
          onClick={handleResetTheme}
          className="flex-1 min-w-[200px] bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
        >
          🔄 Reset to Default
        </button>
      </div>
    </div>
  );
}

