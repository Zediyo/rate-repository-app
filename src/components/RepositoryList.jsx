import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper"
import { useDebounce } from "use-debounce";

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

export const RepositoryListContainer = ({ repositories, onEndReach }) => 
{
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
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
		/>
	);
};

const OrderByMenu = ({ orderBy, setOrderBy, search, searchChange }) =>
{
	return (
		<View>
			<Picker
				selectedValue={orderBy}
				onValueChange={(itemValue, itemIndex) =>
					setOrderBy(itemValue)
				}>
				<Picker.Item label="Latest repositories" value="NONE" />
				<Picker.Item label="Highest rated repositories" value="RATING_DESC" />
				<Picker.Item label="Lowest rated repositories" value="RATING_ASC" />
			</Picker>
			<Searchbar
				placeholder="Search"
				onChangeText={searchChange}
				value={search}
			/>
		</View>

	)
}

const RepositoryList = () => 
{
	const [orderBy, setOrderBy] = useState(null)
	const [search, setSearch] = useState(null)
	const [value] = useDebounce(search, 1000);
	const { repositories, searchFiltered, doFetchMore } = useRepositories({ o: orderBy, first: 20 });

	const changeOrder = (value) =>
	{
		setOrderBy(value)
	}

	const changeSearch = (input) =>
	{
		setSearch(input)
	}

	useEffect( () =>
	{
		searchFiltered(value)
	}, [value])

	const onEndReached = () =>
	{
		//console.log("FETCH MORE")
		doFetchMore()
	}

	
	return (
		<View>
			<OrderByMenu
				orderBy={orderBy}
				setOrderBy={changeOrder}
				search={search}
				searchChange={changeSearch}
			/>
			<RepositoryListContainer 
				repositories={repositories}
				onEndReach={onEndReached}
			/>
		</View>
		
	);
};

export default RepositoryList;