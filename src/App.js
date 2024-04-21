import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/login/Login';
import Todo from './components/dashboard/Todo'
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/todo" element={<Protected><Todo/></Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
