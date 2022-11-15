import React, {useEffect, useRef, useState} from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  var canvas_w = 0;
  var canvas_h = 0;
  var origin: any = {};
  const data = new Uint8ClampedArray([
    255, 0, 0, 128,
    255, 0, 0, 128,
    255, 0, 0, 128,
    255, 0, 0, 128
  ]);
  
  var imageData: any;

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };
  
  const mouseDown = (e: any) => {
    origin = {x: e.offsetX, y: e.offsetY};
  }

  const mouseMove = (e: any) => {
    const ctx: CanvasRenderingContext2D = getContext();
    if (origin) { 
      if (imageData) {
        console.log(origin)
        ctx.putImageData(imageData, origin.x, origin.y)
      }
      drawRect(e);
    }
  }

  const drawRect = (e: any) => {
    
    const ctx: CanvasRenderingContext2D = getContext()
    if (origin) {
      console.log(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y)
      if (e.offsetX - origin.x >= 0 &&  e.offsetY - origin.y >= 0) { // 左上から下に線を引く場合のみ考慮
        imageData = ctx.getImageData(origin.x, origin.y, e.offsetX+10 - origin.x, e.offsetY+10 - origin.y) // widthとheightがマイナスにならないよに値を足す
        ctx.strokeStyle = "#00ff00";
        // ctx.clearRect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y);
        ctx.beginPath();
        ctx.rect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y); 
        ctx.stroke(); 
        ctx.save();
      }
    }
  }

  const mouseUp = (e: any) => {
    imageData = null;
    origin = null;
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    new ImageData(data, 2, 2);
    if(ctx!==null)
    {
        const img = new Image();
        img.src = "elon.jpg" // 描画する画像など
        
        img.onload = () => {
          const canvas: any = canvasRef.current;
          canvas.width = img.width/2;
          canvas.height = img.height/2
          ctx.drawImage(img, 0, 0, img.width/2, img.height/2)
          canvas_w = img.width/2,
          canvas_h = img.height/2
        }
    }
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);

    ctx.save();
  })
  
  return (
    <div>
      <canvas className='m-0 p-0' ref={canvasRef} />
    </div>
  );
}

export default Canvas;