import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Active Link component', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <ActiveLink activeClassName="active" href="/" >
                <a href="#">home</a>
            </ActiveLink>
        )

        expect(getByText('home')).toBeInTheDocument()
    })

    it('adds active class if the link is currently active', () => {
        const { getByText } = render(
            <ActiveLink activeClassName="active" href="/" >
                <a href="#">home</a>
            </ActiveLink>
        )

        expect(getByText('home')).toHaveClass('active')
    })
})
