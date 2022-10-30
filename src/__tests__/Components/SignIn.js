import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { FormikSignInForm } from "../../components/SignIn"

describe("SignIn", () => 
{
	describe("SignInContainer", () => 
	{
		it("calls onSubmit function with correct arguments when a valid form is submitted", async () => 
		{
			const onSubmit = jest.fn();
			
			const { getByPlaceholderText, getByText } = render(<FormikSignInForm onSubmit={onSubmit} />);
			
			fireEvent.changeText(getByPlaceholderText("Username"), "potato");
			fireEvent.changeText(getByPlaceholderText("Password"), "otatop");
			fireEvent.press(getByText("Sign In"));

			await waitFor(() => 
			{
				expect(onSubmit).toHaveBeenCalledTimes(1);
		
				// onSubmit.mock.calls[0][0] contains the first argument of the first call
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: "potato",
					password: "otatop",
				});
			});
		});
	});
});