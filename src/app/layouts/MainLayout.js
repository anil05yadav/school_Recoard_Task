import { Outlet } from 'react-router-dom';
import MainNav from '../components/common/mainNav';


const MainLayout = () => {

  return (
    <>
      <MainNav /> 
      <main className='main'>
      <Outlet />
      </main>
    </>
  );
};

export default MainLayout;