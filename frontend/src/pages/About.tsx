import React, { useEffect, useState } from 'react';

export default function About() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    // Gọi API từ Backend lúc nãy vừa tạo để lấy thông tin cá nhân
    fetch('http://localhost:5000/about')
      .then(res => res.json())
      .then(data => setInfo(data))
      .catch(err => console.error("Lỗi gọi API /about:", err));
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-20">
      <div className="bg-gray-900/80 border border-gray-800 p-10 rounded-xl w-full max-w-md shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center border-b border-gray-800 pb-4">
          THÔNG TIN SINH VIÊN
        </h1>
        
        {info ? (
          <div className="space-y-6 text-white text-lg">
            <div className="flex flex-col bg-black/50 p-4 rounded-lg">
              <span className="text-gray-400 text-sm font-medium mb-1">Họ tên sinh viên</span>
              <span className="font-semibold tracking-wide text-xl">{info["Họ tên sinh viên"]}</span>
            </div>
            
            <div className="flex flex-col bg-black/50 p-4 rounded-lg">
              <span className="text-gray-400 text-sm font-medium mb-1">Mã số sinh viên</span>
              <span className="font-semibold tracking-wide text-xl">{info["Mã số sinh viên"]}</span>
            </div>
            
            <div className="flex flex-col bg-black/50 p-4 rounded-lg">
              <span className="text-gray-400 text-sm font-medium mb-1">Lớp</span>
              <span className="font-semibold tracking-wide text-xl">{info["Lớp"]}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 animate-pulse py-10">Đang tải dữ liệu từ Backend...</div>
        )}
        
        <div className="mt-8 text-center">
          <a href="/" className="text-red-500 hover:text-red-400 hover:underline text-sm transition-colors">
            &larr; Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
