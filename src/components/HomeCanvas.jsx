import { useCallback, useEffect, useRef, useState } from 'react';
import heroImage from '../assets/hero.png';
import homeImage from '../assets/home.png';
import shadowImage from '../assets/shadow.png';
import Canvas from '../modules/Canvas';

const HomeCanvas = (props) => {
	const [pos, setPos] = useState({ x: 5, y: 5 });
	const canvasRef = useRef();
	const imageLayerHandler = useCallback((src, callback) => {
		const image = new Image();
		image.onload = () => {
			callback(image);
		};
		image.src = src;
	}, []);
	useEffect(() => {
		canvasRef.current.draw((ctx) => {
			imageLayerHandler(homeImage, (image) => {
				ctx.drawImage(image, 0, 0);
			});
			imageLayerHandler(heroImage, (image) => {
				ctx.drawImage(image, 0, 0, 16, 16, pos.x * 16, pos.y * 16, 16, 16);
			});
			imageLayerHandler(shadowImage, (image) => {
				ctx.drawImage(
					image,
					0,
					0,
					32,
					32,
					pos.x * 16 - 8,
					pos.y * 16 - 12,
					32,
					32,
				);
			});
		});
	}, [pos, imageLayerHandler]);

	return <Canvas height='198' width='352' ref={canvasRef} />;
};

export default HomeCanvas;
