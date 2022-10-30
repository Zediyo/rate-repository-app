import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query Repositories
	{
		repositories
		{
			totalCount
			edges
			{
				cursor
				node
				{
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					openIssuesCount
					url
					ownerAvatarUrl
					description
					language
					userHasReviewed
				}
				cursor
			}
			pageInfo
			{
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const GET_REPOSITORIES_ORDER = gql`
	query Repositories_Order($ob: AllRepositoriesOrderBy, $od: OrderDirection)
	{
		repositories(orderBy: $ob, orderDirection: $od)
		{
			totalCount
			edges
			{
				cursor
				node
				{
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					openIssuesCount
					url
					ownerAvatarUrl
					description
					language
					userHasReviewed
				}
				cursor
			}
			pageInfo
			{
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const GET_REPOSITORIES_ORDER_LIMIT = gql`
	query Repositories_OrderLimit($ob: AllRepositoriesOrderBy, $od: OrderDirection, $first: Int, $after: String)
	{
		repositories(orderBy: $ob, orderDirection: $od, first: $first, after: $after)
		{
			totalCount
			edges
			{
				cursor
				node
				{
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					openIssuesCount
					url
					ownerAvatarUrl
					description
					language
					userHasReviewed
				}
				cursor
			}
			pageInfo
			{
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const GET_REPOSITORIES_FILTERED = gql`
	query Repositories_Filtered($search: String)
	{
		repositories(searchKeyword: $search)
		{
			totalCount
			edges
			{
				cursor
				node
				{
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					openIssuesCount
					url
					ownerAvatarUrl
					description
					language
					userHasReviewed
				}
				cursor
			}
			pageInfo
			{
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const GET_REPOSITORY = gql`
	query ($id: ID!, $first: Int, $after: String)
	{
		repository(id: $id)
		{
			id
			ownerName
			name
			createdAt
			fullName
			ratingAverage
			reviewCount
			stargazersCount
			watchersCount
			forksCount
			openIssuesCount
			url
			ownerAvatarUrl
			description
			language
			userHasReviewed
			reviews(first: $first, after: $after)
			{
				totalCount
				edges
				{
					node
					{
						id
						text
						rating
						createdAt
						user
						{
						id
						username
						}
					}
					cursor
				}
				pageInfo
				{
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
	}
`;

export const GET_ME = gql`
	query
	{
		me
		{
			id
			username
		}
	}
`;