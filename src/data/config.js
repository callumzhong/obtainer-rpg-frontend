import character_0_action from 'assets/images/characters/people/character_0_action.png';
import character_npc_0 from 'assets/images/characters/people/character_npc_0.png';
import character_npc_1 from 'assets/images/characters/people/character_npc_1.png';
import character_npc_2 from 'assets/images/characters/people/character_npc_2.png';
import character_npc_3 from 'assets/images/characters/people/character_npc_3.png';
import character_npc_4 from 'assets/images/characters/people/character_npc_4.png';
import homeLower from 'assets/images/map/home_lower.png';
import townLower from 'assets/images/map/town_lower.png';
import townUpper from 'assets/images/map/town_upper.png';
import HOME_WALLS from 'data/homeWalls.json';
import TOWN_WALLS from 'data/townWalls.json';
import Person from 'scripts/Person';
import asGridCoord from 'utils/asGridCoord';
import withGrid from 'utils/withGrid';

const layers = {
  home: {
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        // x: withGrid(52),
        // y: withGrid(28),
        x: withGrid(21),
        y: withGrid(32),
      }),
    },
    walls: {
      ...HOME_WALLS,
    },
    cutsceneSpaces: {
      [asGridCoord(21, 34)]: [
        {
          events: [{ type: 'changeMap', map: 'town' }],
        },
      ],
    },
  },
  town: {
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: withGrid(40),
        y: withGrid(31),
      }),
      npc_0: new Person({
        x: withGrid(46),
        y: withGrid(26),
        talking: [
          {
            events: [
              { type: 'textMessage', text: "I'm busy...", faceHero: 'npc_0' },
              { type: 'textMessage', text: 'Go away!' },
            ],
          },
        ],
      }),
    },
    walls: {
      ...TOWN_WALLS,
    },
    cutsceneSpaces: {
      [asGridCoord(40, 31)]: [
        {
          events: [{ type: 'changeMap', map: 'home' }],
        },
      ],
    },
  },
};
const layerImages = {
  home: {
    lowerSrc: homeLower,
  },
  town: {
    lowerSrc: townLower,
    upperSrc: townUpper,
  },
};
const character = {
  hero: {
    transformY: -26,
  },
  'hero-fight': {
    src: character_0_action,
    width: 96,
    height: 96,
    transformX: -25,
    transformY: -26,
  },
  npc_0: {
    src: character_npc_0,
    transformY: -26,
  },
  npc_1: {
    src: character_npc_1,
    transformY: -26,
  },
  npc_2: {
    src: character_npc_2,
    transformY: -26,
  },
  npc_3: {
    src: character_npc_3,
    transformY: -26,
  },
  npc_4: {
    src: character_npc_4,
    transformY: -26,
  },
};

export { layers, layerImages, character };
