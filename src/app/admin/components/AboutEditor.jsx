"use client";

import { useState, useEffect, useRef } from "react";

export default function AboutEditor() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/about-section");
        const data = await res.json();
        if (data) setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Upload image from local file (S3 Upload)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // อัปโหลดไป S3
      const formDataToUpload = new FormData();
      formDataToUpload.append('file', file);

      const uploadRes = await fetch('http://localhost:3005/api/upload/image', {
        method: 'POST',
        body: formDataToUpload,
      });

      if (!uploadRes.ok) {
        throw new Error('อัปโหลดล้มเหลว');
      }

      const { url } = await uploadRes.json();
      setFormData({ ...formData, imageUrl: url });
      alert('✅ อัปโหลดรูปภาพสำเร็จ!');
    } catch (error) {
      console.error(error);
      alert('❌ อัปโหลดล้มเหลว กรุณาลองใหม่');
    } finally {
      setIsUploading(false);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    if (confirm("คุณต้องการลบรูปภาพนี้หรือไม่?")) {
      setFormData({ ...formData, imageUrl: "" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3005/api/about-section", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) alert("✅ Updated About Page!");
    } catch (error) {
      alert("Error updating");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Edit About Page</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            rows="6"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg text-black"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Image</label>
          
          {/* Upload & Remove Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Uploading...
                </>
              ) : (
                <>
                  📤 Upload Image
                </>
              )}
            </button>
            
            {formData.imageUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                🗑️ Remove
              </button>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Preview Image */}
          {formData.imageUrl && (
            <div className="mt-4 h-40 w-full rounded-lg overflow-hidden bg-gray-100 border">
              <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
          Save Changes 💾
        </button>
      </form>
    </div>
  );
}