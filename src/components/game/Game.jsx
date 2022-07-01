import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';
import Canvas from 'modules/Canvas';
import { useRef } from 'react';

const Game = ({ layer, layerImage }) => {
  const canvasRef = useRef();
  const { lower, upper, gameObjects } = layerImage;
  useRequestAnimationFrame((time) => {
    const cameraPerson = layer.gameObjects.hero;

    canvasRef.current &&
      canvasRef.current.draw((ctx) => {
        layer.drawLowerImage(ctx, lower, cameraPerson);

        Object.values(layer.gameObjects)
          .sort((a, b) => a.y - b.y)
          .forEach((object) => {
            const key = object.action
              ? `${object.id}-${object.action}`
              : object.id;
            object.sprite.draw(ctx, gameObjects[key], cameraPerson);
          });

        layer.drawUpperImage(ctx, upper, cameraPerson);
      });
  });

  return <Canvas height='1200' width='2160' ref={canvasRef} />;
};

export default Game;
