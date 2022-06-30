import progressButtonBlank from 'assets/images/ui/progress-button-blank.png';
import progressButtonMaxBlank from 'assets/images/ui/progress-button-max-blank.png';
import progressButtonMax from 'assets/images/ui/progress-button-max.png';
import progressButtonMinBlank from 'assets/images/ui/progress-button-min-blank.png';
import progressButtonMin from 'assets/images/ui/progress-button-min.png';
import progressButton from 'assets/images/ui/progress-button.png';

const Button = ({ src, point, handleClick }) => {
  const onClickHandler = () => {
    handleClick(point);
  };

  return (
    <button
      type='button'
      value={point}
      onClick={onClickHandler}
      className='relative py-1 outline-none'
    >
      <img
        className='h-full w-4 object-fill rendering-pixelated'
        src={src}
        alt=''
      />
    </button>
  );
};

const ProgressButtons = ({ handleAttributes, length, amount }) => {
  const items = new Array(length).fill(0);
  return (
    <div className='flex gap-2'>
      {items.map((item, i) => {
        let src = '';
        const _i = i + 1;
        if (_i === 1 && amount < _i) {
          src = progressButtonMinBlank;
        }
        if (_i === 1 && amount >= _i) {
          src = progressButtonMin;
        }
        if (_i !== 1 && _i !== length && amount < _i) {
          src = progressButtonBlank;
        }
        if (_i !== 1 && _i !== length && amount >= _i) {
          src = progressButton;
        }
        if (_i === length && amount < _i) {
          src = progressButtonMaxBlank;
        }
        if (_i === length && amount >= _i) {
          src = progressButtonMax;
        }
        return (
          <Button point={_i} key={i} handleClick={handleAttributes} src={src} />
        );
      })}
    </div>
  );
};

export default ProgressButtons;
