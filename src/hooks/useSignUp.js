import { useMutation } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => 
{
	// const authStorage = useAuthStorage();
	// const apolloClient = useApolloClient();
	const [signUp, result] = useMutation(CREATE_USER);

	const doSignUp = async ( {username, password} ) =>
	{
		const { data } = await signUp( { variables: { user: { username, password } } })
		//await authStorage.setAccessToken(data.authenticate.accessToken);
		//apolloClient.resetStore();
		//console.log("AAA:", data.authenticate.accessToken)
		return data
	}

	return [doSignUp, result];
};

export default useSignUp;