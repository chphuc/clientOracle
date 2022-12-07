import { useState, useEffect } from 'react'
import Login from './components/Login'
import Trainee from './components/Trainees'

function App() {
	const [isLogin, setIsLogin] = useState(false)
	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('user'))) {
			setIsLogin(false)
		}
		else {
			setIsLogin(true)
		}
	}, [JSON.parse(localStorage.getItem('user'))])
	return (
		<div>
			{isLogin
				?
				<Trainee />
				:
				<Login />
			}
		</div>
	);
}

export default App;
