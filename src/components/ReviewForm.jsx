import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

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


const CreateReviewForm = ({ onSubmit }) => 
{
	return (
		<View style={styles.container}>
			<FormikTextInput style={styles.field} name="ownerName" placeholder="Repository owner name" />
			<FormikTextInput style={styles.field} name="repositoryName" placeholder="Repository name" />
			<FormikTextInput style={styles.field} name="rating" placeholder="Rating between 0 and 100" />
			<FormikTextInput style={styles.field} multiline name="text" placeholder="Review" />
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={{ color: "white"}}>Create a review</Text>
			</Pressable>
		</View>
	);
};

const validationSchema = yup.object().shape({
	ownerName: yup
		.string()
		.required("Repository owner name is required"),
	repositoryName: yup
		.string()
		.required("Repository name is required"),
	rating: yup
		.number()
		.positive("Must be a number between 0 and 100")
		.lessThan(101, "Must be a number between 0 and 100")
		.required("Rating is required"),
});

const initialValues = {
	ownerName: "",
	repositoryName: "",
	rating: "",
	text: "",
};

export const FormikCreateReviewForm = ({onSubmit}) =>
{
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

const ReviewForm = () => 
{
	const navigate = useNavigate();
	const [doCreateReview] = useCreateReview();

	const onSubmit = async (values) =>
	{
		const { ownerName, repositoryName, rating, text } = values;
		console.log(values);
		try 
		{
			const data = await doCreateReview( { ownerName, repositoryName, rating, text } );
			const repId = data.createReview.repositoryId
			navigate("/repository/" + repId)
		}
		catch (e) 
		{
			console.log("BB: ", e);
		}
	};

	return (
		<FormikCreateReviewForm onSubmit={onSubmit}/>
	)
};

export default ReviewForm;