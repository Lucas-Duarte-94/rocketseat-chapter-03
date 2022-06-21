import { render } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/client";
import { SignInWithGithub } from ".";

jest.mock('next-auth/client')

describe('SignInWithGithub component', () => {
    it('renders correctly when user is NOT signedIn', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        const { getByText } = render(
            <SignInWithGithub />
        )

        expect(getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is signedIn', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            {
                user: {
                    name: 'John Doe',
                    email: 'johndoe@mail.com'
                },
                expires: 'fake-expires'
            },
            false
        ])

        const { getByText } = render(
            <SignInWithGithub />
        )

        expect(getByText('John Doe')).toBeInTheDocument()
    })
})