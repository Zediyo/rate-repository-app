import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
	error:
	{
		borderStyle: "solid",
		borderColor: theme.colors.error,
		borderWidth: 1,
	}
});

const TextInput = ({ style, error, ...props }) => 
{
	const textInputStyle = [style];
	if ( error )
		textInputStyle.push(styles.error)

	return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;