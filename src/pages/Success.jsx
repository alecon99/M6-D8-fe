import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Success = () => {
	const { token } = useParams();
    const navigate = useNavigate();

	const saveUserToLocalStorage = (token) => {
		localStorage.setItem("userLoggedIn", JSON.stringify(token));
        navigate('/home');
	};

	useEffect(() => {
		if (token) {
			saveUserToLocalStorage(token);
		}
	}, [token]);

	return (
		<>
		</>
	);
};

export default Success;
