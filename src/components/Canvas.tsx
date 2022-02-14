import React, { useContext, useEffect, useRef } from 'react';
import { context, stageType } from '../context/State';

type Props = {
  getData: (data: string) => void;
  [key: string]: any;
};

export default function Canvas(props: Props) {
  const state = useContext(context)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const w = Math.min(window.innerWidth, 400) * 4;
    const h = (5 * w) / 4;
    const bgImage = bgImageRef.current!;
    let lineoffset = 0;

    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.drawImage(bgImage, -w / 2, 0, w * 2.4, h);
    ctx.rotate((-2 * Math.PI) / 180);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(w * 0.05, h * 0.05, w * 0.85, h * 0.9);
    ctx.translate(w * 0.08, h * 0.07);
    ctx.fillStyle = '#000000';

    const headline = `${state.name[0]}'s setlist for: coldplay music of the spheres world tour in 2022 -`;
    lineoffset += drawHeader(headline, ctx, lineoffset);
    lineoffset += drawHeader('curated at Coldplayxtra.com/setlist', ctx, lineoffset);
    lineoffset += 30;

    (state.stages[0] as stageType[]).map((stage) => {
      lineoffset += drawStageHeader(stage.name, ctx, lineoffset);

      stage.songs.map((song) => {
        lineoffset += drawSongName(song.name, song.customInfo, ctx, lineoffset);
      });
    });

    props.getData(canvas.toDataURL());
  }, []);

  const drawHeader = (title: string, ctx: CanvasRenderingContext2D, lineoffset: number): number => {
    ctx.font = '30px Lato';
    ctx.fillText(title.toUpperCase(), 0, 40 + lineoffset);
    return 40;
  };

  const drawStageHeader = (title: string, ctx: CanvasRenderingContext2D, lineoffset: number): number => {
    ctx.font = '28px Lato';
    ctx.fillText(title.toUpperCase(), 0, 40 + lineoffset);
    ctx.fillRect(0, lineoffset + 41, ctx.measureText(title.toUpperCase()).width, 2);
    return 100;
  };

  const drawSongName = (
    title: string,
    customInfo: string[],
    ctx: CanvasRenderingContext2D,
    lineoffset: number
  ): number => {
    ctx.font = '46px Lato';
    ctx.fillText(title.toUpperCase(), 0, lineoffset);
    const tw = ctx.measureText(title.toUpperCase()).width;
    ctx.font = '30px Lato';
    ctx.fillText(customInfo.join('+'), tw + 10, lineoffset);
    return 55;
  };

  return (
    <>
      <div className="hidden">
        <img src="/coldplay_bg.jpg" alt="" ref={bgImageRef} />
      </div>
      <canvas ref={canvasRef} {...props} />
    </>
  );
}
