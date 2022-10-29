import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";

const useMe = () => 
{

	const { data, error, loading } = useQuery(GET_ME, {
		fetchPolicy: "cache-and-network",
		// Other options
	});

	let ret = null

	if ( data && data.me )
		ret = data.me

	return { data: ret, loading };
};

export default useMe;