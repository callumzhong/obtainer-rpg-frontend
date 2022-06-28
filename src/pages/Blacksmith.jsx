import heroImage from 'assets/images/characters/people/hero.png';
import blacksmithLowerImage from 'assets/images/map/obaiter_v1.png';
import Conversation from 'components/conversation/Conversation';
import FurnaceMessage from 'components/conversation/FurnaceMessage';
import FurnaceModal from 'components/furnaceModal/FurnaceModal';
import GameCanvas from 'components/GameCanvas';
import emitter, { eventName } from 'emitter';
import useKeyPressDirectionListener from 'hooks/useKeyPressDirectionListener';
import useKeyPressDownListener from 'hooks/useKeyPressDownListener';
import useRequestAnimationFrame from 'hooks/useRequestAnimationFrame';
import Camera from 'layouts/Camera';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayerMap from 'scripts/LayerMap';
import Person from 'scripts/Person';
import withGrid from 'utils/withGrid';

const layer = new LayerMap({
  lowerSrc: blacksmithLowerImage,
  gameObjects: {
    hero: new Person({
      isPlayerControlled: true,
      x: withGrid(2),
      y: withGrid(7),
    }),
    npc1: new Person({
      x: withGrid(1),
      y: withGrid(7),
      src: heroImage,
      direction: 'up',
      talking: [
        {
          events: [
            { type: 'conversation', element: FurnaceMessage, faceHero: 'npc1' },
            { who: 'npc1', type: 'stand', direction: 'up', time: 200 },
          ],
        },
      ],
    }),
  },
  // walls: { ...BLACKSMITH_BOUNDARIES },
  // cutsceneSpaces: {
  // 	[asGridCoord(12, 9)]: [
  // 		{
  // 			events: [{ type: 'changeMap', map: 'village' }],
  // 		},
  // 	],
  // },
});

const BlacksmithPage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [eventState, setEventState] = useState({
    type: '',
    text: '',
    onComplete: () => {},
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const directions = useKeyPressDirectionListener();
  const bindHeroPositionCheck = useCallback(
    (e) => {
      if (e.whoId === 'hero') {
        layer.checkForFootstepCutscene(setEventState, navigate);
      }
    },
    [navigate],
  );
  useKeyPressDownListener('Enter', () => {
    if (modalIsOpen) return;
    layer.checkForActionCutscene(setEventState, navigate);
  });
  useRequestAnimationFrame((time) => {
    if (modalIsOpen) return;
    Object.values(layer.gameObjects).forEach((object) => {
      object.update({
        arrow: directions[0],
        map: layer,
      });
    });
  });

  useEffect(() => {
    layer.mountObjects(setEventState);
    emitter.on(eventName.walk, bindHeroPositionCheck);
    return () => {
      emitter.off(eventName.walk, bindHeroPositionCheck);
    };
  }, [bindHeroPositionCheck]);

  return (
    <>
      <Camera>
        <GameCanvas layer={layer} />
      </Camera>
      {eventState.type === 'conversation' && <Conversation event={eventState} />}
      <FurnaceModal
        closeModal={closeModal}
        event={eventState}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      />
    </>
  );
};

export default BlacksmithPage;
