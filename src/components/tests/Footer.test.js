import { render, screen } from "@testing-library/react";
import * as reduxHooks from '../../redux/hooks'
import Footer from "../Footer/Footer";

jest.mock('react-redux')
describe('Footer', () => {
    it('should render Footer', () => {
        const component = render(<Footer />)
        expect(component).toMatchSnapshot()
    })

    it('heading should have a white color', () => {
        const component = render(<Footer />)

        const headingList = screen.getAllByRole('heading')
        expect(component).toMatchSnapshot()
        headingList.forEach(heading => {
            expect(heading).toHaveClass('title')
        })
    })
})