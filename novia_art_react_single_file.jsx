import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NoviaArt - Single-file React component (tailwindcss required in project)
// Default export: NoviaArtApp

const IMAGES = [
  {
    id: 1,
    title: "Aurora Over Peaks",
    tags: ["landscape", "photography"],
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "City Dreamscape",
    tags: ["digital", "city"],
    src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Neon Portrait",
    tags: ["portrait", "digital"],
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Quiet Lake",
    tags: ["landscape", "calm"],
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Abstract Flow",
    tags: ["abstract", "digital"],
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Golden Hour",
    tags: ["photography", "gold"],
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
  },
];

function Tag({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-2xl text-sm border transition-all mr-2 mb-2
        ${active ? "bg-black text-white shadow-md" : "bg-white/60 text-gray-800"}`}
    >
      {children}
    </button>
  );
}

function GalleryGrid({ items, open }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <motion.div
          key={it.id}
          layout
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-white"
        >
          <button
            onClick={() => open(it)}
            className="group block w-full text-left"
            aria-label={`Open ${it.title}`}
          >
            <div className="relative h-56 sm:h-48 lg:h-56 w-full overflow-hidden">
              <img
                src={it.src}
                alt={it.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{it.tags.join(" • ")}</p>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default function NoviaArtApp() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [selected, setSelected] = useState(null);

  const allTags = ["all", ...Array.from(new Set(IMAGES.flatMap((i) => i.tags)))];

  const filtered = IMAGES.filter((img) => {
    if (activeTag !== "all" && !img.tags.includes(activeTag)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      img.title.toLowerCase().includes(q) || img.tags.join(" ").toLowerCase().includes(q)
    );
  });

  const openModal = (item) => setSelected(item);
  const closeModal = () => setSelected(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 antialiased">
      <header className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-xl">
            NA
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">NoviaArt</h1>
            <p className="text-sm text-gray-500">Digital art &amp; visual storytelling</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a href="#gallery" className="text-sm hover:underline">Gallery</a>
          <a href="#about" className="text-sm hover:underline">About</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
          <a
            href="#"
            className="ml-4 inline-block px-4 py-2 rounded-2xl bg-black text-white text-sm shadow"
          >
            Buy Prints
          </a>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded-md border">Menu</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-extrabold leading-tight"
            >
              NoviaArt — visual stories, crafted digitally
            </motion.h2>
            <p className="mt-4 text-gray-600">
              Curated digital art, prints, and commissions. Browse the gallery or contact for
              commissions — I craft mood-driven visuals for personal and commercial projects.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="#gallery"
                className="px-4 py-2 rounded-2xl border shadow-sm text-sm hover:shadow-md"
              >
                View Gallery
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-2xl bg-black text-white text-sm shadow hover:opacity-95"
              >
                Book a Commission
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="text-sm text-gray-500">Share</div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded bg-white/60 border">Twitter</button>
                <button className="px-3 py-2 rounded bg-white/60 border">Instagram</button>
                <button className="px-3 py-2 rounded bg-white/60 border">Behance</button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl overflow-hidden shadow-2xl bg-white"
          >
            <img
              src={IMAGES[1].src}
              alt={IMAGES[1].title}
              className="object-cover w-full h-80 lg:h-96"
            />
          </motion.div>
        </section>

        <section id="gallery" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles or tags..."
                  className="px-4 py-2 rounded-2xl border w-64"
                />
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag("all");
                  }}
                  className="px-3 py-2 rounded-2xl border text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="mt-3 flex flex-wrap">
                {allTags.map((t) => (
                  <Tag
                    key={t}
                    active={t === activeTag}
                    onClick={() => setActiveTag(t)}
                  >
                    {t}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-500">Showing {filtered.length} of {IMAGES.length}</div>
          </div>

          <GalleryGrid items={filtered} open={openModal} />
        </section>

        <section id="about" className="mb-12 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-2">About Novia</h3>
          <p className="text-gray-600">
            Novia (they/them) is a digital artist focused on emotive landscapes, neon portraits,
            and abstract experiments. With a background in traditional painting, Novia fuses
            painterly composition with generative digital techniques to craft work that feels
            both intimate and cinematic.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow">
              <img src={IMAGES[0].src} alt="sample" className="w-full h-40 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow">
              <img src={IMAGES[4].src} alt="sample" className="w-full h-40 object-cover" />
            </div>
          </div>
        </section>

        <section id="contact" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Work with me</h4>
              <p className="text-gray-600 mb-4">Commissions, prints, licensing — let's make something.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  const name = fd.get("name");
                  const email = fd.get("email");
                  const message = fd.get("message");
                  // simple mailto fallback; in production wire to backend or form provider
                  window.location.href = `mailto:novia@example.com?subject=Commission%20from%20${encodeURIComponent(
                    name
                  )}&body=${encodeURIComponent(message + "\n\nContact: " + email)}`;
                }}
              >
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  <input name="name" required className="w-full px-3 py-2 rounded border" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input name="email" type="email" required className="w-full px-3 py-2 rounded border" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Message</label>
                  <textarea name="message" rows="5" required className="w-full px-3 py-2 rounded border" />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 rounded-2xl bg-black text-white">Send</button>
                  <button
                    type="button"
                    onClick={() => alert("Tip: Offer downloadable preview files or link to a shop.")}
                    className="px-4 py-2 rounded-2xl border"
                  >
                    Tips
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-50 to-indigo-50 flex flex-col justify-center items-start shadow-md">
              <h4 className="text-xl font-bold mb-2">Studio & Prints</h4>
              <p className="text-gray-700 mb-4">Available for limited edition prints and digital licensing.</p>
              <div className="flex gap-2">
                <a className="px-4 py-2 rounded-2xl bg-white border">View Shop</a>
                <a className="px-4 py-2 rounded-2xl bg-white/90 border">Wholesale</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} NoviaArt — All rights reserved</div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div>Designed with ♥</div>
            <a href="#" className="underline">Privacy</a>
            <a href="#" className="underline">Terms</a>
          </div>
        </div>
      </footer>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selected.src} alt={selected.title} className="w-full h-96 object-cover" />
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 bg-white/80 rounded-full p-2 border"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selected.tags.join(" • ")}</p>
                <div className="mt-3 flex gap-2">
                  <a href={selected.src} target="_blank" rel="noreferrer" className="px-3 py-2 rounded border">Open full</a>
                  <a href={selected.src} download className="px-3 py-2 rounded bg-black text-white">Download</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
