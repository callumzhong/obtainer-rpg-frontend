import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';
import Canvas from 'modules/Canvas';
import React, { useMemo, useRef } from 'react';

const Game = React.memo(({ layer, layerImage, detectHW }) => {
  const { winWidth, winHeight } = detectHW;
  const canvasRef = useRef();
  const { lower, upper, gameObjects } = layerImage;
  const centerPoint = useMemo(() => {
    const x = Math.ceil(Math.ceil(winWidth / 48) / 2) - 1;
    const y = Math.ceil(Math.ceil(winHeight / 48) / 2) - 1;
    return { x, y };
  }, [winWidth, winHeight]);

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
  return <Canvas height={winHeight} width={winWidth} ref={canvasRef} />;
});

export default Game;
