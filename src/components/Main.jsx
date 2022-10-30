import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import RepositoryPage from "./RepositoryPage";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUpForm";

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.background,
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => 
{
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/repository/:id/" element={<RepositoryPage />} exact />
				<Route path="/signin/" element={<SignIn />} exact />
				<Route path="/signout/" element={<SignOut />} exact />
				<Route path="/signup/" element={<SignUp />} exact />
				<Route path="/createreview/" element={<ReviewForm />} exact />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

export default Main;