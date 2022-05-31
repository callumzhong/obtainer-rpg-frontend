import { useEffect, useRef } from 'react';
import heroImage from '../assets/hero.png';
import homeImage from '../assets/home.png';
import Canvas from '../modules/Canvas';
import GameObject from '../scripts/GameObject';
import imageLayerHandler from '../utils/imageLayerHandler';

const HomeCanvas = (props) => {
	const canvasRef = useRef();
	const hero = new GameObject({
		x: 5,
		y: 5,
		src: heroImage,
		useShadow: true,
	});
	useEffect(() => {
		canvasRef.current.draw((ctx) => {
			imageLayerHandler(homeImage, (image) => {
				ctx.drawImage(image, 0, 0);
			});
			const timer = setTimeout(() => {
				hero.sprite.draw(ctx);
			}, 200);
			return () => {
				clearTimeout(timer);
			};
		});
	}, [hero.sprite]);

	return <Canvas height='198' width='352' ref={canvasRef} />;
};

export default HomeCanvas;
