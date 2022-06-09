const SignInItem = (props) => {
	return (
		<ul className='text-center text-3xl text-gray-400'>
			{['登入', '註冊'].map((item) => (
				<li className='leading-[2]' key={item}>
					{item}
				</li>
			))}
		</ul>
	);
};

export default SignInItem;
