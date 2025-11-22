import Container from "../components/Container";
// import Image from "next/image"; // ถ้าอยากใช้ next/image ก็เปิดบรรทัดนี้

// 1. ฟังก์ชันดึงข้อมูล Server Side
async function getAboutData() {
  try {
    const res = await fetch("http://localhost:3005/api/about-section", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function AboutPage() {
  // 2. เรียกข้อมูล
  const data = await getAboutData();
  
  // 3. ค่า Default
  const about = data || {
    title: "About Me",
    description: "Loading...",
    imageUrl: "https://placehold.co/600x400",
  };

  return (
    <Container title="About">
      <div className="flex flex-col md:flex-row items-center gap-10 mt-8 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
        {/* รูปภาพซ้าย */}
        <div className="w-full md:w-1/2">
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-700 rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={about.imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* เนื้อหาขวา */}
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            {about.title}
          </h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
            {about.description}
          </div>
          
          {/* Stats เล็กๆ น้อยๆ (Hardcode ไปก่อน) */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-700">
            <div>
              <h3 className="text-2xl font-bold text-white">2+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Years Exp</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">10+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Projects</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">100%</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Passion</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}