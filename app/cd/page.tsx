'use client';

import { useState, useRef, useEffect } from 'react';

export default function CoordinatePicker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(0);

  // ইমেজের height ধরে রাখি, যা Y coordinate রিভার্স করার জন্য দরকার হবে
  useEffect(() => {
    if (imgRef.current) {
      setImgHeight(imgRef.current.clientHeight);
    }
  }, []);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = Math.round(e.clientX - rect.left);
    const clickY = Math.round(e.clientY - rect.top);

    // pdf-lib origin bottom-left, তাই y রিভার্স করে নিচ্ছি
    const pdfY = imgHeight - clickY;

    setCoords({ x: clickX, y: pdfY });
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🖼️ Click on Image to get Coordinates</h1>
      <p>Click anywhere on the image below to get (x, y) coordinates for pdf-lib.</p>

      <img
        ref={imgRef}
        src="/ytc.png" // তোমার ছবি public ফোল্ডারে রাখবে
        alt="Certificate Template"
        onClick={handleClick}
        style={{ maxWidth: '100%', border: '2px solid #333', cursor: 'crosshair', userSelect: 'none' }}
      />

      <div style={{ marginTop: '1rem', fontSize: '18px' }}>
        <strong>Coordinates:</strong> X = {coords.x}, Y = {coords.y}
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '14px', color: 'gray' }}>
        (Note: Y coordinate is inverted for pdf-lib origin bottom-left)
      </div>
    </main>
  );
}
