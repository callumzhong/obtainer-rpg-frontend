import Game from 'components/game/Game';
import useLayer from 'hooks/useLayer';
import Camera from 'layouts/Camera';

const HomePage = () => {
  const { isLoading, layer, layerImage } = useLayer();
  return (
    !isLoading && (
      <Camera>
        <Game layer={layer} layerImage={layerImage} />
      </Camera>
    )
  );
};

export default HomePage;
