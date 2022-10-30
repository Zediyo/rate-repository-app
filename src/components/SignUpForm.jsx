import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

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


const SignUpForm = ({ onSubmit }) => 
{
	return (
		<View style={styles.container}>
			<FormikTextInput style={styles.field} name="username" placeholder="Username" />
			<FormikTextInput style={styles.field} name="password" placeholder="Password" secureTextEntry />
			<FormikTextInput style={styles.field} name="password2" placeholder="Repeat password" secureTextEntry />
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={{ color: "white"}}>Sign Up</Text>
			</Pressable>
		</View>
	);
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(1, "Username must be atleast 1 character long")
		.max(30, "Username must be less than 30 characters long")
		.required("Username is required"),
	password: yup
		.string()
		.min(5, "Password must be atleast 5 characters long")
		.max(50, "Password must be less than 50 characters long")
		.required("Password is required"),
	password2: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must be equal")
		.required("Repeat password is required"),
});

const initialValues = {
	username: "",
	password: "",
	password2: "",
};

export const FormikSignUpForm = ({onSubmit}) =>
{
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

const SignUp = () => 
{
	const navigate = useNavigate();
	const [doSignUp] = useSignUp();
	const [doSignIn] = useSignIn();

	const onSubmit = async (values) =>
	{
		const { username, password } = values;
		console.log(values);
		try 
		{
			const result = await doSignUp( { username, password } );
			const data = await doSignIn( { username, password } );
			console.log("AA: ", data.authenticate.accessToken);
			navigate("/")
		}
		catch (e) 
		{
			console.log("BB: ", e);
		}
	};

	return (
		<FormikSignUpForm onSubmit={onSubmit}/>
	)
};

export default SignUp;