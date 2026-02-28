"use client";

import { useState } from "react";

type Photo = {
  src: string;
  rotation: number;
};

const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const photoSources = [
  `${BASE_PATH}/photos/2B97FAD3-0528-464A-9E34-D334EF9A2846_1_105_c.jpeg`,
  `${BASE_PATH}/photos/B239EE94-F809-4BFB-9B87-FD41C6AF8EF5.JPG`,
  `${BASE_PATH}/photos/BA5C15EE-141E-46A1-B16E-4DE15E87E61B.JPG`,
];

const photos: Photo[] = photoSources.map((src, index) => ({
  src,
  rotation: seeded(index, 8) * 4 - 2,
}));

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <section className="rounded-[2rem] bg-white/70 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-8 md:rounded-[3rem] md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-slate md:text-3xl">Polaroid Moments</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActivePhoto(photo.src)}
            className="group rounded-[2.3rem] bg-white p-3 shadow-lg shadow-slate-900/10 transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            style={{ transform: `rotate(${photo.rotation.toFixed(2)}deg)` }}
          >
            <img src={photo.src} alt="Memory" className="h-64 w-full rounded-[1.8rem] object-cover" />
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate/60 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-900/20 sm:rounded-[2.3rem] sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-3 top-3 rounded-full bg-blush px-3 py-1 text-slate transition duration-300 ease-in-out hover:scale-105 sm:right-4 sm:top-4"
            >
              Close
            </button>
            <img
              src={activePhoto}
              alt="Memory full screen"
              className="max-h-[75dvh] w-full rounded-[1.8rem] object-cover"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
