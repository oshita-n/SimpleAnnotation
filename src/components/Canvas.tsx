import React, {useEffect, useRef} from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  var x = 0;
  var y = 0;

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
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
            ctx.drawImage(img, (1280 - img.width/2)/2 ,(600 - img.height/2)/4, img.width/2, img.height/2)
        }
    }
    document.addEventListener("click", onClick);
    ctx.save();
  })

  
  return (
    <div>
      <canvas width="1280" height="600" className="canvas" ref={canvasRef} />
    </div>
  );
}

export default Canvas;