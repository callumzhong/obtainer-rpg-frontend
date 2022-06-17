import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './List.module.css';

const List = ({ className, items, onClick }) => {
	const [index, setIndex] = useState();
	const clickHandler = (e) => {
		onClick();
	};
	return (
		<ul className={clsx(styles['rpgui-list-imp'], className)}>
			{items.map((item, i) => (
				<li
					onClick={(e) => {
						setIndex(i);
						clickHandler(e);
					}}
					className={clsx({
						[styles['rpgui-selected']]: i === index,
					})}
				>
					{item}
				</li>
			))}
		</ul>
	);
};

List.propTypes = {
	className: PropTypes.string,
};

export default List;
