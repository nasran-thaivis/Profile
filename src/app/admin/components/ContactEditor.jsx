"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "admin_contact_content";

const DEFAULT_DATA = {
  phone: "062-209-5297",
  email: "Nasran@thaivis.com",
};

export default function ContactEditor() {
  const [contactData, setContactData] = useState(DEFAULT_DATA);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContactData(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load Contact data", error);
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contactData));
      setSuccessMessage("✅ Contact info saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save Contact data", error);
      alert("Failed to save Contact data");
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 pb-3 border-b-2 border-gray-200 flex items-center gap-2">
        <span>📞</span>
        Edit Contact Information
      </h2>

      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl px-4 py-3 text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📱 Phone Number
        </label>
        <input
          type="tel"
          value={contactData.phone}
          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="062-209-5297"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📧 Email Address
        </label>
        <input
          type="email"
          value={contactData.email}
          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
          className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 rounded-xl px-4 py-3 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <strong>ℹ️ Note:</strong> These contact details will be displayed in the footer and contact page.
        </p>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
      >
        💾 Save Contact Info
      </button>
    </div>
  );
}

