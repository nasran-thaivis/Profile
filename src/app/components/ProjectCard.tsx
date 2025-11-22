"use client";

import React from "react";
import { getSignedImageUrl } from "../../lib/imageUtils";

// สร้าง Type แบบง่ายๆ ไว้ดัก Error
interface Project {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  createdAt?: string | Date;
}

export default function ProjectCard({ project }: { project: Project }) {
  // แปลง imageUrl เป็น full backend URL
  const imageUrl = project.imageUrl 
    ? getSignedImageUrl(project.imageUrl) 
    : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
      
      {/* 1. ส่วนรูปภาพ */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
        <img
          src={imageUrl} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay ตอนเอาเมาส์ชี้ */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-200"
            >
              Visit Site 🔗
            </a>
          )}
        </div>
      </div>

      {/* 2. ส่วนเนื้อหา */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
          <span className="text-xs text-gray-500">
            {project.createdAt ? new Date(project.createdAt).toLocaleDateString('th-TH') : 'Recently'}
          </span>
          
          {project.link ? (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-sm font-medium text-blue-400 hover:underline"
            >
              View Details →
            </a>
          ) : (
             <span className="text-sm text-gray-600">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
}