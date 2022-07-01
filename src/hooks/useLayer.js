import character_0_action from 'assets/images/characters/people/character_0_action.png';
import map003 from 'assets/images/map/Map003.png';
import emitter, { eventName } from 'emitter';
import useKeyPressDirectionListener from 'hooks/useKeyPressDirectionListener';
import { useCallback, useEffect, useState } from 'react';
import Layer from 'scripts/Layer';
import LayerImage from 'scripts/LayerImage';
import Person from 'scripts/Person';
import withGrid from 'utils/withGrid';
import useAuthRoute from './useAuthRoute';
import useKeyPressListener from './useKeyPressListener';
import useRequestAnimationFrame from './useRequestAnimationFrame';

import HOME_WALLS from 'constants/homeWalls.json';
const layerConfig = {
  home: {
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: withGrid(38),
        y: withGrid(15),
      }),
    },
    walls: {
      ...HOME_WALLS,
    },
    cutsceneSpaces: {},
  },
};

const useLayer = () => {
  const { isLoading, hero } = useAuthRoute();
  const [isDown, setIsDown] = useState(false);
  const [layer, setLayer] = useState({});
  const [layerImage, setLayerImage] = useState({});
  const directions = useKeyPressDirectionListener();
  const [event, setEvent] = useState({
    type: '',
    text: '',
    onComplete: () => {},
  });
  const init = useCallback(() => {
    if (isLoading || isDown) {
      return;
    }
    if (Array.isArray(hero) && hero.length > 0) {
      setLayer(new Layer(layerConfig.home));
      setLayerImage(
        new LayerImage({
          lowerSrc: map003,
          gameObjects: {
            hero: {
              src: hero[0].url,
              transformY: -36,
            },
            'hero-fight': {
              src: character_0_action,
              width: 96,
              height: 96,
              transformX: -25,
              transformY: -36,
            },
          },
        }),
      );
      setIsDown(true);
    }
  }, [isLoading, isDown, hero]);

  useKeyPressListener(
    'Space',
    () => {
      if (Object.keys(layer).length === 0) return;
      layer.gameObjects.hero.setAction('fight');
    },
    () => {
      if (Object.keys(layer).length === 0) return;
      layer.gameObjects.hero.setAction('');
    },
  );

  useKeyPressListener('Enter', () => {
    if (Object.keys(layer).length === 0) return;
    layer.checkForActionCutscene(setEvent);
  });

  const bindHeroPositionCheck = useCallback(
    (e) => {
      if (Object.keys(layer).length === 0) return;
      if (e.whoId === 'hero') {
        layer.checkForFootstepCutscene(setEvent);
      }
    },
    [layer],
  );
  const mountLayer = useCallback(() => {
    if (Object.keys(layer).length === 0) return;
    layer.mountObjects(setEvent);
    emitter.on(eventName.walk, bindHeroPositionCheck);
    return () => {
      emitter.off(eventName.walk, bindHeroPositionCheck);
    };
  }, [layer, bindHeroPositionCheck]);

  const update = useCallback(
    (time) => {
      if (Object.keys(layer).length === 0) return;

      Object.values(layer.gameObjects).forEach((object) => {
        object.update({
          arrow: directions[0],
          map: layer,
        });
      });
    },
    [directions, layer],
  );

  useRequestAnimationFrame(update);
  useEffect(init);
  useEffect(mountLayer);

  return {
    isLoading,
    layer,
    layerImage,
  };
};

export default useLayer;
