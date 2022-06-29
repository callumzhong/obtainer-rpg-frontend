const Progress = () => {
  return (
    <div class='relative h-1 overflow-hidden'>
      <div class='absolute h-full w-full bg-gray-800 '></div>
      <div class='relative h-full w-full animate-fill bg-gradient-to-r from-green-700 to-green-300 transition-all duration-1000 ease-out'></div>
    </div>
  );
};

export default Progress;
