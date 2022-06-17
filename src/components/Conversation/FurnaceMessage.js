import { AiOutlineEnter } from 'react-icons/ai';

const FurnaceMessage = () => {
	return (
		<>
			<p className='text-xl'>工作台可用於鍛造劍、盔甲、弓箭。</p>
			<ul className='absolute bottom-4 right-4 flex gap-3'>
				<li className='text-md flex items-center gap-1'>
					<span className=' w-6 rounded-full bg-green-600 text-center text-sm leading-6 text-white '>
						Q
					</span>
					鍛造
				</li>
				<li className='flex items-center gap-1'>
					<AiOutlineEnter className='h-6 w-6 rounded-full bg-red-500 px-1 font-bold text-white' />
					關閉
				</li>
			</ul>
		</>
	);
};

export default FurnaceMessage;
