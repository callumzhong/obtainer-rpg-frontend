import { character, layerImages, layers } from 'data/config';
import emitter, { eventName } from 'emitter';
import useKeyPressDirectionListener from 'hooks/useKeyPressDirectionListener';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Layer from 'scripts/Layer';
import LayerImage from 'scripts/LayerImage';
import LoadContext from 'store/loadContext';
import isEmptyObject from 'utils/isEmptyObject';
import useAuthRoute from './useAuthRoute';
import useKeyPressListener from './useKeyPressListener';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const defaultLayer = 'town';
const cloneCharacter = (source, update) =>
  Object.keys(source).reduce(
    (obj, key) => ({
      [key]: { ...source[key], ...update[key] },
      ...obj,
    }),
    {},
  );

const useLayer = () => {
  const { isSwitchScene, setSwitchScene } = useContext(LoadContext);
  const { hero } = useAuthRoute();
  const [layer, setLayer] = useState({});
  const [layerImage, setLayerImage] = useState({});
  const directions = useKeyPressDirectionListener();
  const [event, setEvent] = useState({
    type: '',
    text: '',
    map: '',
    onComplete: () => {},
  });

  const isEmptyObjectByLayer = useMemo(() => isEmptyObject(layer), [layer]);

  const updateLayer = useCallback((layer, layerImage) => {
    setLayer(
      new Layer({
        walls: { ...layer.walls },
        ...layer,
      }),
    );
    setLayerImage(new LayerImage(layerImage));
  }, []);

  const init = useCallback(() => {
    if (!hero || !isEmptyObject(layer)) return;
    updateLayer(layers[defaultLayer], {
      ...layerImages[defaultLayer],
      gameObjects: {
        ...cloneCharacter(character, {
          hero: {
            src: hero.url,
          },
        }),
      },
    });
  }, [layer, updateLayer, hero]);

  const bindHeroPositionCheck = useCallback(
    (e) => {
      if (isEmptyObject(layer)) return;
      if (e.whoId === 'hero') {
        layer.checkForFootstepCutscene(setEvent);
      }
    },
    [layer],
  );

  const mountLayer = useCallback(() => {
    if (isEmptyObject(layer)) return;
    layer.mountObjects(setEvent);
    emitter.on(eventName.walk, bindHeroPositionCheck);
    return () => {
      emitter.off(eventName.walk, bindHeroPositionCheck);
    };
  }, [layer, bindHeroPositionCheck]);

  const update = useCallback(
    (time) => {
      if (isEmptyObject(layer) || isSwitchScene) return;
      Object.values(layer.gameObjects).forEach((object) => {
        object.update({
          arrow: directions[0],
          map: layer,
        });
      });
    },
    [directions, layer, isSwitchScene],
  );

  const updateEvent = useCallback(() => {
    const { type, map, text } = event;
    if (!type) return;
    if (type === 'changeMap') {
      setSwitchScene(true);
      updateLayer(layers[map], {
        ...layerImages[map],
        gameObjects: {
          ...cloneCharacter(character, {
            hero: {
              src: hero.url,
            },
          }),
        },
      });
      setSwitchScene(false);
    }
    if (type === 'textMessage') {
      alert(text);
    }
  }, [event, hero, setSwitchScene, updateLayer]);

  const completeEvent = useCallback(() => {
    if (isSwitchScene) return;
    if (!isSwitchScene && !event.type) return;
    event.onComplete();
  }, [isSwitchScene, event]);

  useKeyPressListener(
    'Space',
    () => {
      if (isEmptyObject(layer) || isSwitchScene) return;
      layer.gameObjects.hero.setAction('fight');
    },
    () => {
      if (isEmptyObject(layer) || isSwitchScene) return;
      layer.gameObjects.hero.setAction('');
    },
  );

  useKeyPressListener('Enter', () => {
    if (isEmptyObject(layer) || isSwitchScene) return;
    layer.checkForActionCutscene(setEvent);
  });

  useRequestAnimationFrame(update);
  useEffect(init);
  useEffect(mountLayer);
  useEffect(updateEvent);
  useEffect(completeEvent);

  return {
    isLoading: isEmptyObjectByLayer,
    layer,
    layerImage,
  };
};

export default useLayer;
