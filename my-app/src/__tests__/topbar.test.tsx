import {fireEvent, getByTestId, render} from '@testing-library/react'
import Topbar from "../scenes/global/Topbar";
import React from "react";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('Topbar', () => {
    it('should set anchor element when clicked', () => {
       render(<Topbar />);
        const button = getByTestId(document.body, 'handleClickButton');

        fireEvent.click(button);

        // Assert that the anchor element is set
        expect(button).toHaveAttribute('aria-describedby', 'simple-popover');
    });

    it('should handle logout', () => {
        render(<Topbar />);
        const button = getByTestId(document.body, 'handleClickButton');
        fireEvent.click(button);
        const button1 = getByTestId(document.body, 'handleCloseButton');

        fireEvent.click(button1);
        expect(button1).toBeVisible();
    })

    it('handle Close', () => {
        render(<Topbar />);
        const button = getByTestId(document.body, 'handleClickButton');
        fireEvent.click(button);
        const button1 = getByTestId(document.body, 'popover');
        fireEvent.click(button);
        expect(button1).not.toBe('visible')
    })

    it('should navigate', () => {
        render(<Topbar/>);
        const button = getByTestId(document.body, 'handleClickButton');
        fireEvent.click(button);
        const button1 = getByTestId(document.body, 'navigateProfile');
        fireEvent.click(button1);

    });
})