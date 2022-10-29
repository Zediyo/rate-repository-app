import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "stretch",
		alignContent: "stretch",
		padding: 10,
	},
	field:
	{
		backgroundColor: "white",
		alignItems: "center",
		alignContent: "center",
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		borderStyle: "solid",
		borderColor: "gray",
		borderWidth: 1,
	},
	button:
	{
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		alignContent: "center",
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		borderStyle: "solid",
		borderColor: "gray",
		borderWidth: 1,
	}
});


const SignInForm = ({ onSubmit }) => 
{
	return (
		<View style={styles.container}>
			<FormikTextInput style={styles.field} name="username" placeholder="Username" />
			<FormikTextInput style={styles.field} secureTextEntry name="password" placeholder="Password" />
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={{ color: "white"}}>Sign In</Text>
			</Pressable>
		</View>
	);
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, "Username must be atleast 5 characters long")
		.required("Enter username"),
	password: yup
		.string()
		.min(3, "Password must be atleast 3 characters long")
		.required("Enter password"),
});

const initialValues = {
	username: "",
	password: "",
};

const SignIn = () => 
{
	const onSubmit = (values) =>
	{
		// const mass = parseFloat(values.mass);
		// const height = parseFloat(values.height);

		// if (!isNaN(mass) && !isNaN(height) && height !== 0) 
		// {
		// 	console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
		// }
		console.log(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	)
};

export default SignIn;