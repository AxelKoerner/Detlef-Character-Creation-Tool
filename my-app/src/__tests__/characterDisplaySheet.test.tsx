import CharacterSheet from "../scenes/CharacterSheet/CharacterDisplaySheet";
import React from 'react';
import { render, screen } from '@testing-library/react';


describe('CharacterSheet', () => {
  test('renders character name', () => {
    render(<CharacterSheet />);
    const characterNameElement = screen.getByText(/testName/i);
    expect(characterNameElement).toBeInTheDocument();
  });

  test('fetches user name', async () => {
    render(<CharacterSheet />);
    const userNameElement = await screen.findByText(/testUserName/i);
    expect(userNameElement).toBeInTheDocument();
  });

  test('fetches class', async () => {
    render(<CharacterSheet />);
    const classNameElement = await screen.findByText(/testClassName/i);
    expect(classNameElement).toBeInTheDocument();
  });

  test('fetches character level', async () => {
    render(<CharacterSheet />);
    const characterLevelElement = await screen.findByText(/testCharacterLevel/i);
    expect(characterLevelElement).toBeInTheDocument();
  });

  test('fetches lineage', async () => {
    render(<CharacterSheet />);
    const lineageElement = await screen.findByText(/testLineage/i);
    expect(lineageElement).toBeInTheDocument();
  });

  test('fetches background', async () => {
    render(<CharacterSheet />);
    const backgroundElement = await screen.findByText(/testBackground/i);
    expect(backgroundElement).toBeInTheDocument();
  });

  

  
});
