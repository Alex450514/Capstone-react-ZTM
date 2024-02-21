import Directory from '../../components/category-directory/category-directory.component';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const categories = [
      {
        id: 1,
        title:"Hats",
        imageUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        title: "Jackets",
        imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        title: "Sneakers",
        imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        title: "Mens",
        imageUrl: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        title: "Womens",
        imageUrl: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ]
  
    return (
      <div className="App">
        <Outlet />
        <Directory categories={categories} />
        <div className="main-footer">
          <h1>Footer</h1>
        </div>
      </div>
    );
  }

  export default Home;