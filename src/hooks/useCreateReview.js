import { useMutation } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => 
{
	// const authStorage = useAuthStorage();
	// const apolloClient = useApolloClient();
	const [createReview, result] = useMutation(CREATE_REVIEW);

	const doCreateReview = async ( review ) =>
	{
		review.rating = Number(review.rating)
		const { data } = await createReview( { variables: { review } })
		//await authStorage.setAccessToken(data.authenticate.accessToken);
		//apolloClient.resetStore();
		//console.log("AAA:", data.authenticate.accessToken)
		return data
	}

	return [doCreateReview, result];
};

export default useCreateReview;