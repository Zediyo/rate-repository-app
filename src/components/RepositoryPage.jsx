import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryPage = () => 
{
	const { id } = useParams();
	const { repository, doFetchMore } = useRepository({id, first: 20 })

	const reviewNodes = repository && repository.reviews && repository.reviews.edges
		? repository.reviews.edges.map(edge => edge.node)
		: [];

	const renderItem = ({ item }) => (
		<ReviewItem style={styles.container} item={item} />
	);

	const onEndReached = () =>
	{
		//console.log("AFETCH MORE")
		doFetchMore()
	}

	return (
		<>
			
			<FlatList
				data={reviewNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={() => <RepositoryItem item={repository} single />}
			/>
		</>
	)
};

export default RepositoryPage;