import { yupResolver } from '@hookform/resolvers/yup';
import useSignInApi from 'apis/useSignInApi';
import clsx from 'clsx';
import FormItem from 'components/formItem/FormItem';
import Button from 'modules/button/Button';
import ErrorMessage from 'modules/errorMessage/ErrorMessage';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsKey, BsPerson } from 'react-icons/bs';
import schema from './schema';

const SignIn = ({ handleIsSignUp }) => {
  const { isLoading, handleSignIn, error } = useSignInApi();
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
  console.log(error);
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
      <ErrorMessage className='text-center text-base'>{error}</ErrorMessage>
      <div
        className={clsx('flex justify-around gap-3', {
          'mt-10': !error,
          'mt-4': error,
        })}
      >
        <Button type='submit' className='w-full'>
          <div className='relative inline-block'>
            登入
            {isLoading && (
              <AiOutlineLoading className='absolute top-0 -right-5 h-4 w-auto animate-spin text-black text-opacity-70' />
            )}
          </div>
        </Button>
        <Button onClick={onClick} className='w-full'>
          註冊
        </Button>
      </div>
    </form>
  );
};

export default SignIn;