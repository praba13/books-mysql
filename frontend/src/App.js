import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Books />
    },
    {
      path: '/add',
      element: <Add />
    },
    {
      path: '/update/:id',
      element: <Update />
    }
  ]);

  return (
    <div className='App'>
      <h1>React with MySql</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
