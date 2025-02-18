import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const slides = [
  "http://127.0.0.1:8000//media/upload/thumbnail/courses/Leaf-1-300x169.webp",
  "http://127.0.0.1:8000//media/upload/thumbnail/courses/cdd-1-300x169_wDFOiPe_gCDHLTj.webp",
  "http://127.0.0.1:8000//media/upload/thumbnail/courses/Leaf-1-300x169.webp",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4 position-relative">
      <motion.img
        key={currentIndex}
        src={slides[currentIndex]}
        alt="slide"
        className="img-fluid rounded shadow"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      />
      
      <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 start-0 translate-middle-y">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 end-0 translate-middle-y">
        <ChevronRight />
      </button>
    </div>
  );
}
