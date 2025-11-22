"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

// === AuthGuard Component ===
// ป้องกันการเข้าถึงหน้าที่ต้องการ Authentication
export default function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ถ้าโหลดเสร็จแล้วและยังไม่ได้ Login → Redirect ไป /login
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // แสดง Loading ขณะตรวจสอบ Authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ถ้ายังไม่ได้ Login → แสดง null (จะถูก redirect ไปยัง /login)
  if (!isAuthenticated) {
    return null;
  }

  // ถ้า Login แล้ว → แสดงเนื้อหา
  return <>{children}</>;
}

