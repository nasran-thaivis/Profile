"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// === 1. กำหนด URL ของ API Backend ===
// ตรงนี้ต้องตรงกับ @Controller('hero-section') ของคุณ
const API_URL = "http://localhost:3005/api/hero-section"; 

export default function LogoEditor({ size = 36, showControls = true }) {
  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // === 2. ฟังก์ชัน: โหลด Logo จาก Database ===
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // แก้ไข: ลบ /1 ออก ให้ยิงไปที่ http://localhost:3001/hero-section โดยตรง
        const res = await fetch(API_URL); 
        if (res.ok) {
          const data = await res.json();
          if (data.imageUrl) {
            setLogo(data.imageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      }
    };

    fetchLogo();
  }, []);

  // === 3. ฟังก์ชัน: อัปโหลดรูปและบันทึก (S3 Upload) ===
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    setIsLoading(true);

    try {
      // อัปโหลดไป S3 ก่อน
      const formDataToUpload = new FormData();
      formDataToUpload.append('file', file);

      const uploadRes = await fetch('http://localhost:3005/api/upload/image', {
        method: 'POST',
        body: formDataToUpload,
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image to S3');
      }

      const { url } = await uploadRes.json();

      // จากนั้นบันทึก URL ลง Database
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: url
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update logo");
      }

      setLogo(url);
      alert("Logo updated successfully!");

    } catch (error) {
      console.error("LogoEditor: unable to save logo", error);
      alert("Failed to save logo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // === 4. ฟังก์ชัน: ลบ Logo ===
  const clearLogo = async () => {
    if (!confirm("Are you sure you want to remove the logo?")) return;
    
    setIsLoading(true);
    try {
       // แก้ไข: ลบ /1 ออก
       const res = await fetch(API_URL, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: null }), 
        });

        if (res.ok) {
            setLogo(null);
        }
    } catch (error) {
        console.error("Failed to remove logo", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        {/* === ส่วนแสดงผลรูปภาพ === */}
        <div className="relative overflow-hidden rounded border border-zinc-700" style={{ width: size, height: size }}>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                <span className="text-xs text-gray-400">...</span>
            </div>
          ) : logo ? (
            <Image
              src={logo}
              alt="Site Logo"
              fill
              sizes={`${size}px`}
              unoptimized 
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white font-semibold text-sm">
              NS
            </div>
          )}
        </div>

        {/* === ปุ่มควบคุม === */}
        {showControls && (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={isLoading}
              className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors disabled:opacity-50"
            >
              {logo ? "Edit" : "Upload"}
            </button>
            {logo && (
              <button
                onClick={clearLogo}
                disabled={isLoading}
                className="text-[10px] px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}