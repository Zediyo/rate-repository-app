import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({id, first}) => 
{
	const [repId, setRepId] = useState("")

	const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
		fetchPolicy: "cache-and-network",
		variables: { id: repId, first },
		skip: !repId,
	});

	useEffect( () => 
	{
		setRepId(id);
	}, [id])

	// useEffect( () => 
	// {
	// 	if ( !loading )
	// 		doFetchMore()
	// }, [loading])

	const doFetchMore = () => 
	{
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		//console.log("FETCHING MORE", canFetchMore, loading)

		if (!canFetchMore) 
		{
			return;
		}

		fetchMore({
			variables:
			{
				first,
				after: data.repository.reviews.pageInfo.endCursor,
				id: repId,
			},
		});
	};


	let ret = { }

	if ( data && data.repository)
		ret = data.repository

	return { repository: ret, doFetchMore };
};

export default useRepository;