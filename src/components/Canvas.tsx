import React, {useEffect, useRef, useState} from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  var canvas_w = 0;
  var canvas_h = 0;
  var origin: any = {}
  var imageData: any = new Uint8ClampedArray([
      255, 0, 0, 128,
      255, 0, 0, 128,
      255, 0, 0, 128,
      255, 0, 0, 128
    ]);

  // const [cordinate, setCordinate] = useState(0);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };
  
  const mouseDown = (e: any) => {
    origin = {x: e.offsetX, y: e.offsetY};
    console.log(origin)
    // cordinates[i] = {x: e.offsetX, y: e.offsetY}; 
  }

  const mouseMove = (e: any) => {
    const ctx: CanvasRenderingContext2D = getContext()
    if (origin) { 
      if (!imageData) {
        ctx.putImageData(imageData, origin.x, origin.y)
      }
      drawRect(e);
    }
  }

  const drawRect = (e: any) => {
    const ctx: CanvasRenderingContext2D = getContext()
    if (origin) {
      console.log(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y)
      ctx.strokeStyle = "#00ff00";
      // ctx.clearRect(0, 0, canvas_w, canvas_h);
      ctx.beginPath();
      ctx.rect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y); 
      ctx.stroke(); 
      imageData = ctx.getImageData(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y)
    }
  }

  const mouseUp = (e: any) => {
    // console.log(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y)
    origin = null;
    //console.log(i)
    // cordinates[i] = {x:cordinates[i].x, y:cordinates[i].y, w: e.offsetX - cordinates[i].x, h: e.offsetY - cordinates[i].y}
    // setCordinate(i)
    // i = i + 1
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    if(ctx!==null)
    {
        const img = new Image()
        img.src = "elon.jpg" // 描画する画像など
        
        img.onload = () => {
          // ctx.drawImage(img, (1280 - img.width/2)/2 ,(600 - img.height/2)/2, img.width/2, img.height/2)
          const canvas: any = canvasRef.current;
          canvas.width = img.width/2;
          canvas.height = img.height/2
          ctx.drawImage(img, 0, 0, img.width/2, img.height/2)
          canvas_w = img.width/2,
          canvas_h = img.height/2
        }
    }
    // document.addEventListener("click", onClick);
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