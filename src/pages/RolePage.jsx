import Role from 'components/role/Role';

const RolePage = (props) => {
  return (
    <div className='relative flex h-screen w-full items-center bg-hero bg-cover rendering-pixelated before:absolute before:left-3 before:top-3 before:h-[80px] before:w-[calc(80px*4.5)] before:bg-logo before:bg-contain before:bg-no-repeat'>
      <Role />
    </div>
  );
};
export default RolePage;
