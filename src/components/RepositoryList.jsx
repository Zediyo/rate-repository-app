import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

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

const RepositoryList = () => 
{
	const { repositories } = useRepositories();

	const renderItem = ({ item }) => (
		<RepositoryItem style={styles.container} item={item} />
	);

	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];


	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem}
			keyExtractor={item => item.id}
		/>
	);
};

export default RepositoryList;