import Head from 'next/head'
import styles from './styles/Home.module.css'
import { Header } from '../components/Header';
import React, { useEffect, useState } from 'react'
const width = 255
const height = 255

export default function Home() {

  // contextを状態として持つ
  const [context,setContext] = useState(null)
  // 画像読み込み完了トリガー
  const [loaded,setLoaded] = useState(false)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(()=>{
      const canvas = document.getElementById("canvas")
      const canvasContext = canvas.getContext("2d")
      setContext(canvasContext)
  },[])

  useEffect(()=>{
    if(context!==null)
    {
        const img = new Image()
        img.src = "elon.jpg" // 描画する画像など
        img.onload = () => {
            context.drawImage(img, (1280 - img.width/2)/2 ,(780 - img.height/2)/2, img.width/2, img.height/2)
            // 更にこれに続いて何か処理をしたい場合
            setLoaded(true)
        }
    }
  },[context])

  useEffect(()=> {
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
    var x = 0;
    var y = 0;

    function onClick(e) {
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
    }
  
    function draw() {
        // 描画処理
        canvasContext.fillStyle = '#00ff00'
        canvasContext.beginPath()
        canvasContext.ellipse(x, y, 3, 3, 0, 0, Math.PI * 2);
        canvasContext.fill()
        canvasContext.closePath()
    }
    canvas.addEventListener('click', onClick, false);
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-col w-screen h-screen">
          <Header />
          {/* container */}
          <div className="flex frex-row justify-center ...">
            <canvas width="1280" height="720" id="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
