import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import Login from './components/login/Login';
import Todo from './components/dashboard/Todo';
import Protected from './components/Protected';

function App() {
	const { user } = UserAuth();
	return <div className="App">{user ? <Todo /> : <Login />}</div>;
}

export default App;
