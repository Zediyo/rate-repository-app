import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
	mutation ($input: AuthenticateInput!)
	{
		authenticate(credentials: $input)
		{
			accessToken
		}
	}
`;