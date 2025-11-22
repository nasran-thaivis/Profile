"use client";
import { useState, useEffect } from "react";

export default function ReviewEditor() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });

  // 1. โหลดข้อมูล
  const fetchReviews = async () => {
    const res = await fetch("http://localhost:3005/api/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => { fetchReviews(); }, []);

  // 2. เพิ่มรีวิว
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3005/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("✅ Review Added!");
    setFormData({ name: "", rating: 5, comment: "" });
    fetchReviews();
  };

  // 3. ลบรีวิว
  const handleDelete = async (id) => {
    if(!confirm("Delete this review?")) return;
    await fetch(`http://localhost:3005/api/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Client Name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="p-3 border rounded-lg w-full text-black" required 
            />
            <select 
              value={formData.rating}
              onChange={e => setFormData({...formData, rating: e.target.value})}
              className="p-3 border rounded-lg w-full text-black"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
            </select>
          </div>
          <textarea 
            placeholder="Comment..." 
            rows="3"
            value={formData.comment}
            onChange={e => setFormData({...formData, comment: e.target.value})}
            className="p-3 border rounded-lg w-full text-black" required
          ></textarea>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">+ Add Review</button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4">All Reviews</h3>
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
              <div>
                <div className="font-bold text-gray-800">{review.name} <span className="text-yellow-500 text-sm">{"⭐".repeat(review.rating)}</span></div>
                <div className="text-sm text-gray-500 truncate max-w-md">{review.comment}</div>
              </div>
              <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-200 rounded">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}