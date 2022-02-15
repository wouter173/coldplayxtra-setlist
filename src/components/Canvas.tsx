import React, { useContext, useEffect, useRef } from 'react';
import { context, stageType } from '../context/State';

type Props = {
  getData: (data: string) => void;
  [key: string]: any;
};

const canvasStyles = {
  headLine: {
    font: '600 20px Hind',
    lineheight: 28,
  },
  songTitle: {
    font: '600 32px Hind',
    lineheight: 44,
  },
  songInfo: {
    font: '18px Hind',
    lineheight: 0,
  },
  stageTitle: {
    font: '18px Hind',
    lineheight: 42,
    top: 0,
  },
};

export default function Canvas(props: Props) {
  const state = useContext(context)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const render = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const w = 1200;
    const h = 1500;
    const bgImage = bgImageRef.current!;
    let lineoffset = 0;

    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.drawImage(bgImage, -w / 2, 0, w * 2.4, h);
    ctx.rotate((-2 * Math.PI) / 180);
    ctx.fillStyle = '#FFFFFF';
    ctx.translate(84, 60);
    ctx.fillRect(0, 0, 960, 1425);
    ctx.translate(48, 45);
    ctx.fillStyle = '#000000';

    const headline = `${state.name[0]}'s setlist for coldplay music of the spheres world tour 2022 -`;
    lineoffset += drawHeader(headline, ctx, lineoffset);
    lineoffset += drawHeader('curated at', ctx, lineoffset);
    ctx.fillStyle = '#800080';
    drawUrl('setlist.coldplayxtra.com', ctx.measureText('curated at '.toUpperCase()).width, ctx, lineoffset);
    ctx.fillStyle = '#000000';
    lineoffset += 46;

    (state.stages[0] as stageType[]).map((stage) => {
      lineoffset += drawStageHeader(stage.name, ctx, lineoffset);

      stage.songs.map((song) => {
        lineoffset += drawSongName(song.name, song.customInfo, ctx, lineoffset);
      });
    });

    ctx.resetTransform();
    ctx.fillStyle;
    ctx.font = '600 36px Hind';
    const content = 'setlist.coldplayxtra.com'.toUpperCase();
    const contentWidth = ctx.measureText(content).width;
    ctx.fillStyle = '#800080';
    ctx.fillRect(w - contentWidth - 50, h * 0.8, w, 80);
    ctx.translate(w - contentWidth - 20, h * 0.8 + 50 + 5);
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(content, 0, 0);

    props.getData(canvas.toDataURL());
  };

  useEffect(() => {
    render();
  }, []);

  const drawUrl = (url: string, widthoffset: number, ctx: CanvasRenderingContext2D, lineoffset: number) => {
    ctx.font = canvasStyles.headLine.font;
    ctx.fillText(url.toUpperCase(), widthoffset, lineoffset);
    ctx.fillRect(widthoffset, lineoffset + 2, ctx.measureText(url.toUpperCase()).width, 2);
  };

  const drawHeader = (title: string, ctx: CanvasRenderingContext2D, lineoffset: number): number => {
    ctx.font = canvasStyles.headLine.font;
    ctx.fillText(title.toUpperCase(), 0, canvasStyles.headLine.lineheight + lineoffset);
    return canvasStyles.headLine.lineheight;
  };

  const drawStageHeader = (title: string, ctx: CanvasRenderingContext2D, lineoffset: number): number => {
    ctx.font = canvasStyles.stageTitle.font;
    ctx.fillText(title.toUpperCase(), 0, canvasStyles.stageTitle.top + lineoffset);
    ctx.fillRect(0, canvasStyles.stageTitle.top + lineoffset + 2, ctx.measureText(title.toUpperCase()).width, 2);
    return canvasStyles.stageTitle.lineheight + canvasStyles.stageTitle.top;
  };

  const drawSongName = (
    title: string,
    customInfo: string[],
    ctx: CanvasRenderingContext2D,
    lineoffset: number
  ): number => {
    ctx.font = canvasStyles.songTitle.font;
    ctx.fillText(title.toUpperCase(), 0, lineoffset);
    const tw = ctx.measureText(title.toUpperCase()).width;
    ctx.font = canvasStyles.songInfo.font;
    ctx.fillText(customInfo.join('+').toUpperCase(), tw + 10, lineoffset);
    return canvasStyles.songTitle.lineheight;
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
