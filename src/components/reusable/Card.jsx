import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      {title && <h2 className="font-semibold text-gray-800 mb-3">{title}</h2>}
      {children}
    </div>
  );
}
