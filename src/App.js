import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Hotel from './pages/Hotel/Hotel';
import List from './pages/List/List';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/hotels' Component={List} />
      <Route path='/hotels/:id' Component={Hotel} />
      

     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
