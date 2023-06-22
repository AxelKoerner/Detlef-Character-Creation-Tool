import {fireEvent, getByTestId, render} from '@testing-library/react'
import LineageForm from "../scenes/Custom/CustomLineage";
import {deleteApp, initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDjAlBgT7ybr2GZrNgq3zFZoKu1jn7stHg",
    authDomain: "cctool-c001b.firebaseapp.com",
    databaseURL: "https://cctool-c001b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cctool-c001b",
    storageBucket: "cctool-c001b.appspot.com",
    messagingSenderId: "736945444931",
    appId: "1:736945444931:web:07a06f34302f63b8929cf6"
};

describe('Custom Lineage', () => {
    test('test save', () => {
        initializeApp(firebaseConfig)
        render(<LineageForm/>);
        const handleSave = getByTestId(document.body, 'handleSave');
        const size = getByTestId(document.body, 'size');
        const speed = getByTestId(document.body, 'speed');
        const abilityName = getByTestId(document.body, 'ability name');
        const abilityValue = getByTestId(document.body, 'ability value');

        fireEvent.change(size, {target: {value: 1}});
        fireEvent.change(speed, {target: {value: 1}});
        fireEvent.change(abilityName, {target: {value: 'test'}});
        fireEvent.change(abilityValue, {target: {value: 'test'}});
        fireEvent.click(handleSave);

    })

    test('test different filed id', () => {
        initializeApp(firebaseConfig)
        const { container } = render(<LineageForm />);

        const abilityName = getByTestId(container, 'ability name');
        const addAbilityButton = getByTestId(container, 'add abilities');
        fireEvent.click(addAbilityButton);

        abilityName.id = '1';
        expect(abilityName.id).toBe('1');
    })

    test('adding ability field', () => {
        initializeApp(firebaseConfig)
        const { container } = render(<LineageForm />);

        const addAbilityButton = getByTestId(container, 'add abilities');
        fireEvent.click(addAbilityButton);

        expect(addAbilityButton).toBeVisible()
    });


    test('test inputs', () => {
        initializeApp(firebaseConfig)
        const { container } = render(<LineageForm />);

        const lineageNameInput = getByTestId(container, 'lineage name');
        const sizeInput = getByTestId(container, 'size');
        const speedInput = getByTestId(container, 'speed');
        const abilityNameInput = getByTestId(container, 'ability name');
        const abilityValueInput = getByTestId(container, 'ability value');

        fireEvent.change(lineageNameInput, { target: { value: 'Test Lineage' } });
        fireEvent.change(sizeInput, { target: { value: '1' } });
        fireEvent.change(speedInput, { target: { value: '2' } });
        fireEvent.change(abilityNameInput, { target: { value: 'test ability' } });
        fireEvent.change(abilityValueInput, { target: { value: '10' } });

        expect(lineageNameInput).toHaveValue('Test Lineage');
        expect(sizeInput).toHaveValue('1');
        expect(speedInput).toHaveValue('2');
        expect(abilityNameInput).toHaveValue('test ability');
        expect(abilityValueInput).toHaveValue('10');
    })

    test('test delete', () => {
        initializeApp(firebaseConfig);
        render(<LineageForm/>);
        const abilityName = getByTestId(document.body, 'ability name');
        const abilityValue = getByTestId(document.body, 'ability value');
        const removeAb = getByTestId(document.body, 'remove abilities');

        fireEvent.click(removeAb);

        expect(abilityName).not.toBeVisible();
        expect(abilityValue).not.toBeVisible()

    })

    afterAll(async() => {
        const app = initializeApp(firebaseConfig);
        await deleteApp(app);
      });

})