import { ReportHandler } from 'web-vitals';
import reportWebVitals from "../reportWebVitals";

describe('reportWebVitals', () => {
    it('calls the appropriate web-vitals functions when onPerfEntry is provided', () => {
        const mockGetCLS = jest.fn();
        const mockGetFID = jest.fn();
        const mockGetFCP = jest.fn();
        const mockGetLCP = jest.fn();
        const mockGetTTFB = jest.fn();

        jest.mock('web-vitals', () => ({
            getCLS: mockGetCLS,
            getFID: mockGetFID,
            getFCP: mockGetFCP,
            getLCP: mockGetLCP,
            getTTFB: mockGetTTFB,
        }));

        const mockOnPerfEntry: ReportHandler = jest.fn();

        reportWebVitals(mockOnPerfEntry);

        expect(mockGetCLS).toHaveBeenCalledWith(mockOnPerfEntry);
        expect(mockGetFID).toHaveBeenCalledWith(mockOnPerfEntry);
        expect(mockGetFCP).toHaveBeenCalledWith(mockOnPerfEntry);
        expect(mockGetLCP).toHaveBeenCalledWith(mockOnPerfEntry);
        expect(mockGetTTFB).toHaveBeenCalledWith(mockOnPerfEntry);
    });

    it('does not call any web-vitals functions when onPerfEntry is not provided', () => {
        const mockGetCLS = jest.fn();
        const mockGetFID = jest.fn();
        const mockGetFCP = jest.fn();
        const mockGetLCP = jest.fn();
        const mockGetTTFB = jest.fn();

        jest.mock('web-vitals', () => ({
            getCLS: mockGetCLS,
            getFID: mockGetFID,
            getFCP: mockGetFCP,
            getLCP: mockGetLCP,
            getTTFB: mockGetTTFB,
        }));

        reportWebVitals();

        expect(mockGetCLS).not.toHaveBeenCalled();
        expect(mockGetFID).not.toHaveBeenCalled();
        expect(mockGetFCP).not.toHaveBeenCalled();
        expect(mockGetLCP).not.toHaveBeenCalled();
        expect(mockGetTTFB).not.toHaveBeenCalled();
    });
});
