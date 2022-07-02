import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';
import Canvas from 'modules/Canvas';
import { useMemo, useRef } from 'react';

const Game = ({ layer, layerImage, detectHW }) => {
  const canvasRef = useRef();
  const { lower, upper, gameObjects } = layerImage;
  console.log(detectHW);
  const centerPoint = useMemo(() => {
    const { winWidth, winHeight } = detectHW;
    const x = Math.ceil(Math.ceil(winWidth / 48) / 2) - 1;
    const y = Math.ceil(Math.ceil(winHeight / 48) / 2) - 1;

    return { x, y };
  }, [detectHW]);
  useRequestAnimationFrame((time) => {
    if (Object.keys(layer).length === 0) return;
    const cameraPerson = layer.gameObjects.hero;

    canvasRef.current &&
      canvasRef.current.draw((ctx) => {
        layer.drawLowerImage(ctx, lower, cameraPerson, centerPoint);

        Object.values(layer.gameObjects)
          .sort((a, b) => a.y - b.y)
          .forEach((object) => {
            const key = object.action
              ? `${object.id}-${object.action}`
              : object.id;
            object.sprite.draw(
              ctx,
              gameObjects[key],
              cameraPerson,
              centerPoint,
            );
          });

        layer.drawUpperImage(ctx, upper, cameraPerson, centerPoint);
      });
  });

  return <Canvas height='1200' width='2160' ref={canvasRef} />;
};

export default Game;
