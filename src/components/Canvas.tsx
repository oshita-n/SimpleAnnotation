import React, {useEffect, useRef} from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  var x = 0;
  var y = 0;
  var origin: any = {}

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  const getContext2 = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef2.current;
    return canvas.getContext('2d');
  };

  const onClick = (e: any) => {
    /*
        * rectでcanvasの絶対座標位置を取得し、
        * クリック座標であるe.clientX,e.clientYからその分を引く
        * ※クリック座標はdocumentからの位置を返すため
        * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
        */
    var rect = e.target.getBoundingClientRect();
    
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    draw();
  };
  
  const mouseDown = (e: any) => {
    origin = {x: e.offsetX, y: e.offsetY}; 
  }

  const mouseMove = (e: any) => {
    const ctx: CanvasRenderingContext2D = getContext2()
    if (origin) { 
        ctx.strokeStyle = "#00ff00";
        ctx.clearRect(0, 0, 1280, 600);
        ctx.beginPath();
        ctx.rect(origin.x, origin.y, e.offsetX - origin.x, e.offsetY - origin.y); 
        ctx.stroke(); 
    }
  }

  const mouseUp = (e: any) => {
    origin = null;
  }

  function draw() {
    const ctx: CanvasRenderingContext2D = getContext()
    // 描画処理
    ctx.fillStyle = '#00ff00'
    ctx.beginPath()
    ctx.ellipse(x, y, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath()
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
          const canvas2: any = canvasRef2.current;
          canvas.width = img.width/2;
          canvas.height = img.height/2
          canvas2.width = img.width/2;
          canvas2.height = img.height/2
          ctx.drawImage(img, 0, 0, img.width/2, img.height/2)
        }
    }
    // document.addEventListener("click", onClick);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);

    ctx.save();
  })

  
  return (
    <div className='relative p-0 w-full	h-full box-content before;content-[""] before:block before:pt-[50%]'>
      <canvas className='m-0 p-0 absolute top-0 left-0 box-content' ref={canvasRef} />
      <canvas className='m-0 p-0 absolute top-0 left-0 box-content' ref={canvasRef2} />
    </div>
  );
}

export default Canvas;