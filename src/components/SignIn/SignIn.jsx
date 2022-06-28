import { yupResolver } from '@hookform/resolvers/yup';
import useSignInApi from 'apis/useSignInApi';
import FormItem from 'components/formItem/FormItem';
import Button from 'modules/button/Button';
import { useForm } from 'react-hook-form';
import { BsKey, BsPerson } from 'react-icons/bs';
import schema from './schema';
const SignIn = ({handleIsSignUp}) => {
  const { handleSignIn } = useSignInApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    handleSignIn(data);
  };
  const onClick = () => {
    handleIsSignUp();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <FormItem
        IconElement={<BsPerson className='h-6 w-auto' />}
        type='text'
        placeholder='帳號'
        maxLength={12}
        error={errors.account?.message}
        {...register('account')}
      />
      <FormItem
        IconElement={<BsKey className='h-6 w-auto' />}
        type='password'
        placeholder='密碼'
        error={errors.password?.message}
        {...register('password')}
      />
      <div className='mt-8 flex justify-around gap-3 pl-10'>
        <Button type='submit' className='w-full'>
          登入
        </Button>
        <Button onClick={onClick} className='w-full'>
          註冊
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
