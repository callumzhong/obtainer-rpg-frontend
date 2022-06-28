import { yupResolver } from '@hookform/resolvers/yup';
import useSignUpApi from 'apis/useSignUpApi';
import FormItem from 'components/formItem/FormItem';
import Button from 'modules/button/Button';
import { useForm } from 'react-hook-form';
import { BsKey, BsPerson } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import schema from './schema';

const SignUp = ({ handleIsSignUp }) => {
  const { handleSignUp } = useSignUpApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      account: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    handleSignUp(data);
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
        IconElement={<GoMail className='h-6 w-auto' />}
        type='text'
        placeholder='電子信箱'
        error={errors.email?.message}
        {...register('email')}
      />
      <FormItem
        IconElement={<BsKey className='h-6 w-auto' />}
        type='password'
        placeholder='密碼'
        error={errors.password?.message}
        {...register('password')}
      />
      <FormItem
        IconElement={<BsKey className='h-6 w-auto' />}
        type='password'
        placeholder='確認密碼'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <div className='mt-8 flex justify-around gap-3 pl-10'>
        <Button type='submit' className='w-full'>
          提交
        </Button>
        <Button onClick={onClick} className='w-full'>
          返回
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
