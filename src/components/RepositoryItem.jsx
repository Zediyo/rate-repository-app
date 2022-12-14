import { View, Image, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { Dimensions } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	blockContainer: {
		alignItems: "stretch",
		backgroundColor: "white",
	},
	subContainer: {
		paddingLeft: 20,
		display: "flex",
		backgroundColor: "gray",
	},
	bottomContainer: {
		display: "flex",
		backgroundColor: "red",
		flexDirection: "row",
		justifyContent: "space-around",
		width: Dimensions.get("window").width,
	},
	tinyLogo: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	logo: {
		width: 66,
		height: 58,
	},
	text: {
		flexGrow: 0,
	},
	textWBG: {
		flexGrow: 0,
		flexBasis: "auto",
		backgroundColor: theme.colors.primary,
		color: "white",
	},
	button:
	{
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		alignContent: "center",
		padding: 10,
		borderRadius: 5,
		margin: 10,
	}
});

const blockHStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexGrow: 1,
		margin: 10,
	},
	avatar: {
		width: 45,
		height: 45,
		borderRadius: 45 / 2,
	},
	avatarContainer: {
		flexGrow: 0,
		paddingRight: 15,
	},
	infoContainer: {
		flexGrow: 1,
	},
	potato:
	{
		flexDirection: "column",
		flexGrow: 0,
	},
	miniBlock:
	{
		color: "white",
		backgroundColor: theme.colors.primary
	},
	body: {
		paddingVertical: 15,
	}
});

const BlockHeader = ({item}) => 
{
	return (
		<View style={blockHStyles.container}>
			<View style={blockHStyles.avatarContainer}>
				<Image
					style={styles.tinyLogo}
					source={{uri: item.ownerAvatarUrl}}
				/>
			</View>
			<View style={blockHStyles.potato}>
				<View style={blockHStyles.infoContainer}>
					<Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>	
				</View>
				<View style={blockHStyles.potato}>
					<Text color="textSecondary">{item.description}</Text>
				</View>
				<View style={blockHStyles.potato}>
					<Text style={blockHStyles.miniBlock}>{item.language}</Text>
				</View>
			</View>

		</View>
	);
};

const blockInfoStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexGrow: 1,
		justifyContent: "space-around",
	},
	actionTouchable: {
		flexGrow: 0,
	},
	actionText: {
		textDecorationLine: "underline",
	},
});

const BlockInfo = ({item}) =>
{
	function kFormatter(num) 
	{
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + "k" : Math.sign(num)*Math.abs(num)
	}

	return (
		<View style={blockInfoStyles.container}>
			<View style={blockInfoStyles.actionTouchable}>
				<Text >{kFormatter(item.stargazersCount) + "\nStars"}</Text>
			</View>

			<View style={blockInfoStyles.actionTouchable}>
				<Text >{kFormatter(item.forksCount) + "\nForks"} </Text>
			</View>

			<View style={blockInfoStyles.actionTouchable}>
				<Text >{kFormatter(item.reviewCount) + "\nReviews"}</Text>
			</View>
		
			<View style={blockInfoStyles.actionTouchable}>
				<Text >{kFormatter(item.ratingAverage) + "\nRating"}</Text>
			</View>
		</View>
	)
}

const GoToPageButton = ({url}) =>
{
	const onPress = () =>
	{
		Linking.openURL(url)
	}

	return (
		<View>
			<Pressable onPress={onPress} style={styles.button}>
				<Text style={{ "color": "white" }}>Open in GitHub</Text>
			</Pressable>
		</View>
	)
}

const RepositoryItem = ({item, single}) => 
{
	const navigate = useNavigate()

	const goToPage = () =>
	{
		navigate("/repository/" + item.id)
	}

	return (
		
		<View testID="repositoryItem" style={styles.blockContainer}>
			<Pressable onPress={goToPage}>
				<BlockHeader item={item} />
				<BlockInfo item={item} />
			</Pressable>
			{single && <GoToPageButton url={item.url}/>}
		</View>

	);
};

{/* <Pressable onPress={goToPage}>
	<Text>TEXT</Text>
</Pressable> */}

export default RepositoryItem;