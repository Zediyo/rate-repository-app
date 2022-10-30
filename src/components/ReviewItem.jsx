import { View, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { Dimensions } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
import { format, formatDistance, formatRelative, subDays } from "date-fns"


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
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "gray",
		borderWidth: 1,
	},
	avatarContainer: {
		flexGrow: 0,
		paddingRight: 15,
		borderStyle: "solid",
		borderColor: "blue",
		borderWidth: 3,
		borderRadius: 45,
		width: 50,
		height: 50,
		textAlign: "center",
	},
	infoContainer: {
		flexGrow: 1,
	},
	potato:
	{
		flexDirection: "column",
		flexGrow: 0,
	},
	potato2:
	{
		flexDirection: "column",
		flexGrow: 0,
		marginRight: 50,
		marginLeft: 5,
	},
	miniBlock:
	{
		color: "white",
		backgroundColor: theme.colors.primary
	},
	body: {
		paddingVertical: 15,
	},
	text: {
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		color: "blue",
		width: 40,
	}
});

const BlockHeader = ({item}) => 
{
	const formatTime = (date) =>
	{
		const ret = format(new Date(date), "dd.MM.yyyy")
		return ret
	}

	return (
		<View style={blockHStyles.container}>
			<View style={blockHStyles.avatarContainer}>
				<Text style={blockHStyles.text} fontSize="subheading" color="textSecondary">{item.rating}</Text>
			</View>
			<View style={blockHStyles.potato2}>
				<View style={blockHStyles.infoContainer}>
					<Text fontWeight="bold" fontSize="subheading">{item.user.username}</Text>	
				</View>
				<View style={blockHStyles.potato}>
					<Text color="textSecondary">{formatTime(item.createdAt)}</Text>
				</View>
				<View style={blockHStyles.potato}>
					<Text color="textSecondary">{item.text}</Text>
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

const ReviewItem = ({item, single}) => 
{
	const navigate = useNavigate()

	const goToPage = () =>
	{
		navigate("/repository/" + item.id)
	}

	return (
		
		<View testID="repositoryItem" style={styles.blockContainer}>
			{/* <Pressable onPress={goToPage}> */}
			<BlockHeader item={item} />
			{/* </Pressable> */}
			{/* {single && <GoToPageButton url={item.url}/>} */}
		</View>

	);
};

{/* <Pressable onPress={goToPage}>
	<Text>TEXT</Text>
</Pressable> */}

export default ReviewItem;