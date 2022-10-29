import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
	item: {
		flexGrow: 1,
		color: "white",
	}
});

const AppBarTab = ({text, onPress, to}) =>
{
	return (
		<View>
			<Pressable style={styles.item} onPress={onPress}>
				<Link to={to}>
					<Text style={styles.item}>{text}</Text>
				</Link>
			</Pressable>
		</View>
	)
}

export default AppBarTab