import Directory from '../../components/category-directory/category-directory.component';
import { Outlet } from 'react-router-dom';

const Home = () => {
  
    return (
      <div className="App">
        <Outlet />
        <Directory />
        <div className="main-footer">
          <h1>Footer</h1>
        </div>
      </div>
    );
  }

  export default Home;