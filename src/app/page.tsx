import Link from "next/link";

// 1. ฟังก์ชันดึงข้อมูลจาก Backend (Server Side)
async function getHeroData() {
  try {
    // ยิงไปที่ Port 3005
    const res = await fetch("http://localhost:3005/api/hero-section", {
      cache: "no-store", // สำคัญ! ห้ามจำค่าเดิม (เพื่อให้แก้ปุ๊บเปลี่ยนปั๊บ)
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hero data");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading home data:", error);
    return null;
  }
}

export default async function HomePage() {
  // 2. เรียกใช้ฟังก์ชัน
  const data = await getHeroData();

  // 3. ค่าเริ่มต้น (เผื่อ Database ล่ม หรือยังไม่มีข้อมูล)
  const hero = data || {
    title: "Welcome",
    description: "Welcome to my portfolio website.",
    imageUrl: "https://placehold.co/1920x1080",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.imageUrl}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 drop-shadow-lg">
          {hero.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/portfolio"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            View My Work
          </Link>
          <Link 
            href="/contact"
            className="px-8 py-4 bg-transparent border-2 border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-lg transition transform hover:scale-105 backdrop-blur-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}