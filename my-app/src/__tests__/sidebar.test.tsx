import {fireEvent, getByTestId, render} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import SideBar from "../scenes/global/SideBar";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));
describe('Sidebar', () => {
    it('test sidebar collapse', () => {
        render(<BrowserRouter><SideBar /></BrowserRouter>);
        const button = getByTestId(document.body, 'setCollapsed');
        fireEvent.click(button);

        expect(button).not.toBeVisible()
    })

    it('test sidebar logout', () => {

    });
})