//import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_REPOSITORIES } from "../graphql/queries";
import { GET_REPOSITORIES_ORDER } from "../graphql/queries";
import { GET_REPOSITORIES_FILTERED } from "../graphql/queries";
import { GET_REPOSITORIES_ORDER_LIMIT } from "../graphql/queries";

const getOrder = (order) =>
{
	if ( order === "" )
	{
		return { ob: "CREATED_AT", od: "DESC" }
	}

	return { ob : "RATING_AVERAGE", od: order }
}

const useRepositories = ({o, first}) => 
{
	const [order, setOrder] = useState("")
	const [filter, setFilter] = useState("")

	const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES_ORDER_LIMIT, {
		fetchPolicy: "cache-and-network",
		variables: { first, ...getOrder(order) },
	});

	const filtered = useQuery(GET_REPOSITORIES_FILTERED, {
		fetchPolicy: "cache-and-network",
		variables: { search: filter },
		skip: !filter,
	})

	useEffect( () =>
	{
		switch(o)
		{
		case "RATING_DESC":
			setOrder("DESC")
			break;
		case "RATING_ASC":
			setOrder("ASC")
			break
		case "NONE":
			setOrder("")
			break
		default:
			setOrder("")
		}
		
	}, [o])

	const searchFiltered = (f) =>
	{
		setFilter(f)
	}

	const doFetchMore = () => 
	{
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) 
		{
			return;
		}

		fetchMore({
			variables:
			{
				first,
				after: data.repositories.pageInfo.endCursor,
				...getOrder(order),
			},
		});
	};

	// useEffect( () =>
	// {
	// 	console.log(filter)
	// }, [filter])

	let retData = data;

	if ( filtered.data && filtered.data.repositories )
		retData = filtered.data

	let ret = { edges: [] }

	if ( retData && retData.repositories )
		ret = retData.repositories
		
	return { repositories: ret, searchFiltered, doFetchMore };
};

export default useRepositories;