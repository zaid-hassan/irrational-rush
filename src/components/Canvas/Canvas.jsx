import React, { useEffect, useRef } from "react";
import Game from "../../game/game";

function Canvas() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    gameRef.current = new Game(canvas, ctx);

    return () => {
      gameRef.current.stop();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bg-amber-600" />
    </>
  );
}

export default Canvas;
