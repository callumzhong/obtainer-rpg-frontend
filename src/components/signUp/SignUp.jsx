import { yupResolver } from '@hookform/resolvers/yup';
import useSignUpApi, { schema } from 'apis/useSignUpApi';
import clsx from 'clsx';
import FormItem from 'components/formItem/FormItem';
import Button from 'modules/Button';
import Container from 'modules/Container';
import ErrorMessage from 'modules/ErrorMessage';
import Top from 'modules/Top';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsKey, BsPerson } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';

const SignUp = ({ handleIsSignUp }) => {
  const { signUpApi, isLoading, error } = useSignUpApi();
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
    signUpApi(data);
  };
  const onClick = () => {
    handleIsSignUp();
  };
  return (
    <>
      <Top className='relative z-10 w-full text-center text-2xl font-bold text-cloud-burst'>
        註冊
      </Top>
      <Container className='-mt-2 flex-1 py-12' mode='decorate-all'>
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
          <ErrorMessage className='mb-4 text-center text-base'>
            {error}
          </ErrorMessage>
          <div
            className={clsx('flex justify-around gap-3', {
              'mt-4': !error,
            })}
          >
            <Button type='submit' className='w-full'>
              <div className='relative inline-block'>
                提交
                {isLoading && (
                  <AiOutlineLoading className='absolute top-0 -right-5 h-4 w-auto animate-spin text-black text-opacity-70' />
                )}
              </div>
            </Button>
            <Button onClick={onClick} className='w-full'>
              返回
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
