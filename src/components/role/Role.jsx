import { yupResolver } from '@hookform/resolvers/yup';
import { createRoleSchema, useCreateRoleApi } from 'apis/useRoleApi';
import Button from 'modules/Button';
import Character from 'modules/Character';
import Container from 'modules/Container';
import ErrorMessage from 'modules/ErrorMessage';
import Input from 'modules/Input';
import ProgressButtons from 'modules/ProgressButtons';
import Top from 'modules/Top';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import RoleItem from './RoleItem';

const pointLimit = 10;
const characters = {
  character_0:
    'https://res.cloudinary.com/callumzhong/image/upload/v1656517774/character_0_sdiqob.png',
};

const Role = () => {
  const { createRoleApi, error } = useCreateRoleApi();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      url: characters.character_0,
    },
    resolver: yupResolver(createRoleSchema),
  });
  const selectedUrl = useWatch({ control, name: 'url' });

  const [ability, setAbility] = useState({
    pointTotal: pointLimit,
    attributes: {
      str: 0,
      crit: 0,
      speed: 0,
    },
  });

  const onAttributesHandler = (attribute) => (point) => {
    setAbility((prevState) => {
      const { attributes, pointTotal } = prevState;
      const updateAttributes = {
        ...attributes,
        [attribute]:
          point > attributes[attribute]
            ? point
            : point === attributes[attribute]
            ? point - 1
            : point,
      };
      const updatePointTotal =
        pointTotal + attributes[attribute] - updateAttributes[attribute];

      if (0 > updatePointTotal) {
        return {
          pointTotal,
          attributes,
        };
      }
      return {
        pointTotal: updatePointTotal,
        attributes: updateAttributes,
      };
    });
  };

  const onSubmitHandler = (data) => {
    if (ability.pointTotal !== 0) {
      return;
    }
    createRoleApi({
      attributes: ability.attributes,
      ...data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='mx-auto -mt-20 flex w-full flex-col gap-8 px-40'
    >
      <div className='flex w-full'>
        <div className='flex basis-1/3 flex-col'>
          <Top className='relative z-10 w-full text-center text-2xl font-bold text-cloud-burst'>
            形象選擇
          </Top>
          <Container
            className='-mt-2 flex flex-1 flex-wrap items-start justify-start gap-3 py-4'
            mode='decorate-all'
          >
            {Object.keys(characters).map((key) => (
              <RoleItem
                key={key}
                name='url'
                isHover={true}
                src={characters[key]}
                {...register('url')}
              />
            ))}
          </Container>
        </div>
        <div className='flex min-h-[370px] basis-1/3 flex-col justify-around'>
          <Character
            className={'mx-auto'}
            isAnimate={true}
            src={selectedUrl}
            size={8}
          />
          <div className='mx-auto mt-10 w-3/5'>
            <Input
              maxLength={8}
              className='text-lg'
              placeholder='請輸入角色名稱'
              {...register('name')}
            />
            {errors.name?.message && (
              <ErrorMessage className='bg-black bg-opacity-80 text-center text-sm'>
                {errors.name?.message}
              </ErrorMessage>
            )}
          </div>
        </div>
        <div className='flex basis-1/3 flex-col'>
          <Top className='relative z-10 w-full text-center text-2xl font-bold text-cloud-burst'>
            點數分配
          </Top>
          <Container className='-mt-2 flex-1' mode='decorate-all'>
            <p>剩餘點數 {ability.pointTotal}</p>
            <hr className='my-2' />
            <ul>
              <li className='flex items-center gap-2'>
                <span>攻擊</span>
                <ProgressButtons
                  handleAttributes={onAttributesHandler('str')}
                  length={pointLimit}
                  amount={ability.attributes.str}
                />
              </li>
              <li className='flex items-center gap-2'>
                <span>爆擊</span>
                <ProgressButtons
                  handleAttributes={onAttributesHandler('crit')}
                  length={pointLimit}
                  amount={ability.attributes.crit}
                />
              </li>
              <li className='flex items-center gap-2'>
                <span>速度</span>
                <ProgressButtons
                  handleAttributes={onAttributesHandler('speed')}
                  length={pointLimit}
                  amount={ability.attributes.speed}
                />
              </li>
            </ul>
          </Container>
        </div>
      </div>
      <Button type='submit' className='mx-auto w-max px-12 text-xl'>
        創建角色
      </Button>
    </form>
  );
};

export default Role;
