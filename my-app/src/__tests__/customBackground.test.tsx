
import BackgroundForm from "../scenes/Custom/CustomBackground";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';



describe('BackgroundForm', () => {
  beforeEach(() => {
    render(<BackgroundForm />);
  });

  it('should render the background name input field', () => {
    const backgroundNameInput = screen.getByLabelText(/Background Name/i) as HTMLInputElement;
    expect(backgroundNameInput).toBeInTheDocument();
  });

  it('should update the background name state on input change', () => {
    const backgroundNameInput = screen.getByLabelText(/Background Name/i) as HTMLInputElement;
    fireEvent.change(backgroundNameInput, { target: { value: 'Test Background' } });
    expect(backgroundNameInput.value).toBe('Test Background');
  });

  it('should render the ability name input field', () => {
    const abilityNameInput = screen.getByLabelText(/Ability Name/i) as HTMLInputElement;
    expect(abilityNameInput).toBeInTheDocument();
  });

  it('should update the ability name state on input change', () => {
    const abilityNameInput = screen.getByLabelText(/Ability Name/i) as HTMLInputElement;
    fireEvent.change(abilityNameInput, { target: { value: 'Test Ability' } });
    expect(abilityNameInput.value).toBe('Test Ability');
  });

  it('should render the ability value input field', () => {
    const abilityValueInput = screen.getByLabelText(/Ability Value/i) as HTMLInputElement;
    expect(abilityValueInput).toBeInTheDocument();
  });

  it('should update the ability value state on input change', () => {
    const abilityValueInput = screen.getByLabelText(/Ability Value/i) as HTMLInputElement;
    fireEvent.change(abilityValueInput, { target: { value: '10' } });
    expect(abilityValueInput.value).toBe('10');
  });

  it('should render the equipment field inputs', () => {
    const equipmentFieldInputs = screen.getAllByLabelText(/Equipment ID/i) as HTMLInputElement[];
    expect(equipmentFieldInputs.length).toBeGreaterThan(0);
  });

  it('should add a new equipment field on "Add Equipment Field" button click', () => {
    const addEquipmentFieldButton = screen.getByText(/Add Equipment Field/i);
    fireEvent.click(addEquipmentFieldButton);
    const equipmentFieldInputs = screen.getAllByLabelText(/Equipment ID/i) as HTMLInputElement[];
    expect(equipmentFieldInputs.length).toBe(2);
  });

  it('should remove an equipment field on "Remove" button click', () => {
    const removeEquipmentButton = screen.getByText(/Remove/i);
    fireEvent.click(removeEquipmentButton);
    const equipmentFieldInputs = screen.getAllByLabelText(/Equipment ID/i) as HTMLInputElement[];
    expect(equipmentFieldInputs.length).toBe(0);
  });
  

  

});
