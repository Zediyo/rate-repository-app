import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		display: "flex",
		backgroundColor: theme.colors.appBar,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-end",
		alignContent: "flex-start",
		height: 80,
	},
	scroll:
	{
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 20,
		justifyContent: "space-around",
		//paddingTop: StatusBar.currentHeight,
	}
});

const AppBar = () => 
{
	const { data } = useMe();

	const onPressFunction = () =>
	{

	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.scroll} >
				<AppBarTab text="Repositories" onPress={onPressFunction} to="/"></AppBarTab>
				{data ?
					(
						<>
							<AppBarTab text="Create a review" onPress={onPressFunction} to="/createreview"></AppBarTab>
							<AppBarTab text="Sign Out" onPress={onPressFunction} to="/signout"></AppBarTab>
						</>) :
					(
						<>
							<AppBarTab text="Sign In" onPress={onPressFunction} to="/signin"></AppBarTab>
							<AppBarTab text="Sign Up" onPress={onPressFunction} to="/signup"></AppBarTab>
						</>)
				}
	
			</ScrollView>

		</View>
	)
};

export default AppBar;