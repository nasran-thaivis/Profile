// ตัวอย่างข้อมูลผลงาน (Projects) แบบง่ายๆ
// สามารถขยายหรือเชื่อมต่อกับ CMS/ไฟล์ JSON จริงได้ในภายหลัง
export const PROJECTS = [
  {
    slug: "portfolio-site",
    title: "Personal Portfolio",
    cover: "https://via.placeholder.com/800x450.png?text=Portfolio+Cover",
    tags: ["Next.js", "Tailwind", "Vercel"],
    short: "A modern portfolio site built with Next.js and Tailwind.",
    description:
      "สร้าง Portfolio เพื่อโชว์โปรเจกต์ต่างๆ ใช้ Next.js App Router, Tailwind CSS และ NextAuth สำหรับระบบล็อกอิน (ตัวอย่าง)",
    github: "https://github.com/nasran-thaivis/portfolio",
    demo: "https://example-portfolio.vercel.app",
    images: [
      "https://via.placeholder.com/1200x700.png?text=Screenshot+1",
      "https://via.placeholder.com/1200x700.png?text=Screenshot+2",
    ],
  },

  {
    slug: "blog-platform",
    title: "Minimal Blog Platform",
    cover: "https://via.placeholder.com/800x450.png?text=Blog+Cover",
    tags: ["Next.js", "Sanity.io", "TypeScript"],
    short: "A small blog platform with CMS integration.",
    description:
      "ระบบบล็อกที่เชื่อมต่อกับ Sanity.io เพื่อจัดการบทความ มีระบบสรุปหน้าแรกและหน้าอ่านบทความแบบละเอียด",
    github: "https://github.com/nasran-thaivis/blog",
    demo: "",
    images: [
      "https://via.placeholder.com/1200x700.png?text=Blog+1",
      "https://via.placeholder.com/1200x700.png?text=Blog+2",
    ],
  },
];
