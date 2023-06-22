import {fireEvent, getByTestId, render} from '@testing-library/react'
import CharacterSheet from "../scenes/CharacterSheet/CharacterSheet";
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

describe('Character Sheet', () => {

    beforeEach(() => {
        initializeApp(firebaseConfig)
    })

    test('test Ability Scores', () => {
        const { container } = render( <tbody><CharacterSheet/></tbody>);
        const strength = getByTestId(container, 'Strenght');
        const dexterity = getByTestId(container, 'Dexterity');
        const constitution = getByTestId(container, 'Constitution');
        const intelligence = getByTestId(container, 'Intelligence');
        const wisdom = getByTestId(container, 'Wisdom');
        const charisma = getByTestId(container, 'Charisma');

        const strenghtchecked1 = getByTestId(container, 'Strenghtchecked1');
        const dexteritychecked1 = getByTestId(container, 'Dexteritychecked1');
        const constitutionchecked1 = getByTestId(container, 'Constitutionchecked1');
        const intelligencechecked1 = getByTestId(container, 'Intelligencechecked1');
        const wisdomchecked1 = getByTestId(container, 'Wisdomchecked1');
        const charismachecked1 = getByTestId(container, 'Charismachecked1');

        const strenghtchecked2 = getByTestId(container, 'Strenghtchecked2');
        const dexteritychecked2 = getByTestId(container, 'Dexteritychecked2');
        const constitutionchecked2 = getByTestId(container, 'Constitutionchecked2');
        const intelligencechecked2 = getByTestId(container, 'Intelligencechecked2');
        const wisdomchecked2 = getByTestId(container, 'Wisdomchecked2');
        const charismachecked2 = getByTestId(container, 'Charismachecked2');

        fireEvent.click(strength);
        fireEvent.click(dexterity);
        fireEvent.click(constitution);
        fireEvent.click(intelligence);
        fireEvent.click(wisdom);
        fireEvent.click(charisma);

        fireEvent.click(strenghtchecked1);
        fireEvent.click(dexteritychecked1);
        fireEvent.click(constitutionchecked1);
        fireEvent.click(intelligencechecked1);
        fireEvent.click(wisdomchecked1);
        fireEvent.click(charismachecked1);

        expect(strenghtchecked2).toBeDisabled();
        expect(dexteritychecked2).toBeDisabled();
        expect(constitutionchecked2).toBeDisabled();
        expect(intelligencechecked2).toBeDisabled();
        expect(wisdomchecked2).toBeDisabled();
        expect(charismachecked2).toBeDisabled();

    })

    test('test the skills', () => {
        const { container } = render( <tbody><CharacterSheet/></tbody>);
        const name = getByTestId(container, 'name');
        const chosenClass = getByTestId(container, 'class');
        const level = getByTestId(container, 'level');
        const lineage = getByTestId(container, 'lineage');
        const background = getByTestId(container, 'background');
        const safe = getByTestId(container, 'handleSave')

        const athletics = getByTestId(container, 'skillsAthletics');
        const acrobatics = getByTestId(container, 'skillsAcrobatics');
        const arcana = getByTestId(container, 'skillsArcana');
        const animalHandling	 = getByTestId(container, 'skillsAnimal Handling');
        const deception	 = getByTestId(container, 'skillsDeception');


        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(chosenClass, { target: { value: 'Barbarian' } });
        fireEvent.change(level, { target: { value: '9' } });
        fireEvent.change(lineage, { target: { value: 'Drow' } });
        fireEvent.change(background, { target: { value: 'Acolyte' } });

        fireEvent.click(athletics);
        fireEvent.click(acrobatics);
        fireEvent.click(arcana);
        fireEvent.click(animalHandling);
        fireEvent.click(deception);

        fireEvent.click(safe);

    })

    test('test no inputs', () => {
        const alertMock = jest.spyOn(window, 'alert');
        alertMock.mockImplementation(() => {});
        const { container } = render( <tbody><CharacterSheet/></tbody>);
        const safe = getByTestId(container, 'handleSave');

        fireEvent.click(safe);
        expect(alertMock).toHaveBeenCalledTimes(1);
    })

    afterAll(async() => {
        const app = initializeApp(firebaseConfig);
        await deleteApp(app);
      });


})