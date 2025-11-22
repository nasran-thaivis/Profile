"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard"; 

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลจาก Backend เรา (Port 3005)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ยิงไปขอข้อมูล
        const res = await fetch("http://localhost:3005/api/projects", {
            cache: "no-store" 
        });
        const data = await res.json();
        setProjects(data); // เก็บใส่ตัวแปร
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container title="Portfolio">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4"></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          รวมผลงานทั้งหมดที่ดึงมาจาก Database ของฉัน
        </p>
      </div>

      {/* 2. แสดงผลตามสถานะ */}
      {loading ? (
        <div className="text-center text-white py-20 animate-pulse">
          กำลังโหลดข้อมูล...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500 py-20 border-2 border-dashed border-zinc-700 rounded-xl">
          <p className="text-xl">📭 ยังไม่มีผลงาน</p>
          <p className="text-sm mt-2">ไปเพิ่มในหน้า Admin ก่อนนะ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3. วนลูปสร้างการ์ดจริง */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Container>
  );
}