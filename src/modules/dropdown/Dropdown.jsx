import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ items, selectedIndex = 0 }) => {
	const pRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [isShow, setIsShow] = useState(false);
	const [header, setHeader] = useState(items[selectedIndex]);
	useEffect(() => {
		const rect = pRef.current.getBoundingClientRect();
		setWidth(rect.right - rect.left);
	}, []);
	const onToggleHandler = () => {
		setIsShow((val) => !val);
	};
	const onSelectedHandler = (e) => {
		const idx = e.target.tabIndex;
		setHeader(items[idx]);
		setIsShow((val) => false);
	};
	return (
		<>
			<p
				ref={pRef}
				onClick={onToggleHandler}
				className={clsx(
					styles['rpgui-dropdown-imp'],
					styles['rpgui-dropdown-imp-header'],
				)}
			>
				<label className='mr-3'>{String.fromCharCode(9660)}</label>
				{header}
			</p>
			{width && (
				<ul
					style={{
						width: width + 'px',
					}}
					className={clsx(styles['rpgui-dropdown-imp'], {
						hidden: !isShow,
						block: isShow,
					})}
				>
					{items.map((item, idx) => (
						<li key={idx} tabIndex={idx} onClick={onSelectedHandler}>
							{item}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

Dropdown.propTypes = {
	mode: PropTypes.oneOf(Object.keys(styles)),
	className: PropTypes.string,
};

export default Dropdown;
