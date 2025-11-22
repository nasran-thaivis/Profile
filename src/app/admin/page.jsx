"use client";

import AdminClient from "./AdminClient";
import AuthGuard from "../components/AuthGuard";

// === หน้า Admin Dashboard ===
// สำหรับแก้ไขข้อมูลทุกหน้าในเว็บไซต์
// ต้อง Login ก่อนจึงจะเข้าถึงได้
export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminClient />
    </AuthGuard>
  );
}

