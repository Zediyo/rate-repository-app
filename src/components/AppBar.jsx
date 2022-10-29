import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

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
	const onPressFunction = () =>
	{

	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.scroll} >
				<AppBarTab text="Repositories" onPress={onPressFunction} to="/"></AppBarTab>
				<AppBarTab text="Sign In" onPress={onPressFunction} to="/signin"></AppBarTab>
			</ScrollView>

		</View>
	)
};

export default AppBar;