import clsx from 'clsx';
import PropTypes from 'prop-types';

import FOLD_ARROW_LEFT from 'assets/images/ui/fold-arrow-left.png';
import FOLD_ARROW_RIGHT from 'assets/images/ui/fold-arrow-right.png';

const FoldArrow = ({ mode, className, onClick, children }) => {
  return (
    <div className={clsx('flex items-center gap-2 rendering-pixelated', className)}>
      <div className='h-6 w-10 overflow-hidden'>
        <img src={FOLD_ARROW_LEFT} alt='fold-arrow-left' />
      </div>
      {children}
      <img src={FOLD_ARROW_RIGHT} alt='fold-arrow-right' />
    </div>
  );
};

FoldArrow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default FoldArrow;
