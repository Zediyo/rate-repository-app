import { useMutation } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => 
{
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [signIn, result] = useMutation(AUTHENTICATE);

	const doSignIn = async ( { username, password } ) =>
	{
		const { data } = await signIn( { variables: { input: { username, password } } })
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
		console.log("AAA:", data.authenticate.accessToken)
		return data
	}

	return [doSignIn, result];
};

export default useSignIn;