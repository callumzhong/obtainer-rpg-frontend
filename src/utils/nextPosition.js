const nextPosition = (initialX, initialY, direction) => {
  let x = initialX;
  let y = initialY;
  const size = 48;
  if (direction === 'left') {
    x -= size;
  }
  if (direction === 'right') {
    x += size;
  }
  if (direction === 'up') {
    y -= size;
  }
  if (direction === 'down') {
    y += size;
  }
  return { x, y };
};

export default nextPosition;
