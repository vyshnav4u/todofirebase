import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { IoIosLogOut } from 'react-icons/io';

const Logout = () => {
	const { logOut, user } = UserAuth();
	const { displayName } = user;

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="logout-wrap">
			<span className="username">{displayName}</span>
			<IoIosLogOut fontSize={20} onClick={handleSignOut} />
		</div>
	);
};

export default Logout;
