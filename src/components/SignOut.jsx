import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";

const SignOut = () =>
{
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const navigate = useNavigate();

	useEffect( () =>
	{
		const doLogOut = async() =>
		{
			await authStorage.removeAccessToken();
			apolloClient.resetStore();
			console.log("SIGNOUT")
			navigate("/")
		}

		doLogOut()
	}, [])

	return null;
}

export default SignOut;