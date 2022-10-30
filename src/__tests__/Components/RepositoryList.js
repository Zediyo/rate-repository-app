import { render, screen, within } from "@testing-library/react-native"
import { RepositoryListContainer } from "../../components/RepositoryList"

describe("RepositoryList", () => 
{
	describe("RepositoryListContainer", () => 
	{
		it("renders repository information correctly", () => 
		{
			const repositories =
			{
				totalCount: 8,
				pageInfo: {
					hasNextPage: true,
					endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
					startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
				},
				edges: [
					{
						node: {
							id: "jaredpalmer.formik",
							fullName: "jaredpalmer/formik",
							description: "Build forms in React, without the tears",
							language: "TypeScript",
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
						},
						cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
					},
					{
						node: {
							id: "async-library.react-async",
							fullName: "async-library/react-async",
							description: "Flexible promise-based React data loader",
							language: "JavaScript",
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
						},
						cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
					},
				],
			};

			const list = render(<RepositoryListContainer repositories={repositories} />);

			const repositoryItems = screen.getAllByTestId("repositoryItem");
			const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
	
			//console.log(firstRepositoryItem)

			function k(num) 
			{
				return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + "k" : Math.sign(num)*Math.abs(num)
			}
			
			expect(within(firstRepositoryItem).getByText(repositories.edges[0].node.fullName)).toHaveTextContent(repositories.edges[0].node.fullName)
			expect(within(firstRepositoryItem).getByText(repositories.edges[0].node.description)).toHaveTextContent(repositories.edges[0].node.description)
			expect(within(firstRepositoryItem).getByText(repositories.edges[0].node.language)).toHaveTextContent(repositories.edges[0].node.language)
			expect(within(firstRepositoryItem).getByText(k(repositories.edges[0].node.forksCount) + "\nForks")).toHaveTextContent(k(repositories.edges[0].node.forksCount) + " Forks")
			expect(within(firstRepositoryItem).getByText(k(repositories.edges[0].node.stargazersCount) + "\nStars")).toHaveTextContent(k(repositories.edges[0].node.stargazersCount) + " Stars")
			expect(within(firstRepositoryItem).getByText(k(repositories.edges[0].node.ratingAverage) + "\nRating")).toHaveTextContent(k(repositories.edges[0].node.ratingAverage) + " Rating")
			expect(within(firstRepositoryItem).getByText(k(repositories.edges[0].node.reviewCount) + "\nReviews")).toHaveTextContent(k(repositories.edges[0].node.reviewCount) + " Reviews")

			expect(within(secondRepositoryItem).getByText(repositories.edges[1].node.fullName)).toHaveTextContent(repositories.edges[1].node.fullName)
			expect(within(secondRepositoryItem).getByText(repositories.edges[1].node.description)).toHaveTextContent(repositories.edges[1].node.description)
			expect(within(secondRepositoryItem).getByText(repositories.edges[1].node.language)).toHaveTextContent(repositories.edges[1].node.language)
			expect(within(secondRepositoryItem).getByText(k(repositories.edges[1].node.forksCount) + "\nForks")).toHaveTextContent(k(repositories.edges[1].node.forksCount) + " Forks")
			expect(within(secondRepositoryItem).getByText(k(repositories.edges[1].node.stargazersCount) + "\nStars")).toHaveTextContent(k(repositories.edges[1].node.stargazersCount) + " Stars")
			expect(within(secondRepositoryItem).getByText(k(repositories.edges[1].node.ratingAverage) + "\nRating")).toHaveTextContent(k(repositories.edges[1].node.ratingAverage) + " Rating")
			expect(within(secondRepositoryItem).getByText(k(repositories.edges[1].node.reviewCount) + "\nReviews")).toHaveTextContent(k(repositories.edges[1].node.reviewCount) + " Reviews")

			expect(1).toBe(1)
		});
	});
});