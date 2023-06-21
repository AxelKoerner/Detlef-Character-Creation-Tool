import firebaseConfig from '../../config/config';

import React, { useState } from 'react';
import { ref, set, getDatabase } from 'firebase/database';

const BackgroundForm: React.FC = () => {
  const [backgroundName, setBackgroundName] = useState('');
  const [abilityName, setAbilityName] = useState('');
  const [abilityValue, setAbilityValue] = useState('');
  const [equipmentFields, setEquipmentFields] = useState([{ id: 1, value: '' }]);

  const handleSave = async () => {
    const db = getDatabase();

    const backgroundRef = ref(db, `Background/${backgroundName}/Abilities/${abilityName}`);
    const data = abilityValue;

    try {
      await set(backgroundRef, data);
      console.log('Ability data saved successfully!');
    } catch (error) {
      console.error('Error saving ability data:', error);
    }

    for (const field of equipmentFields) {
      const equipmentId = `equipment${field.id}`;
      const equipmentValue = field.value;
      const equipmentFieldRef = ref(
        db,
        `Background/${backgroundName}/Equipment/${equipmentId}`
      );

      try {
        await set(equipmentFieldRef, equipmentValue);
        console.log(`Equipment ${equipmentId} saved successfully!`);
      } catch (error) {
        console.error(`Error saving equipment ${equipmentId}:`, error);
      }
    }
  };

  const handleAddEquipmentField = () => {
    const newEquipmentId = equipmentFields.length + 1;
    const newEquipmentField = { id: newEquipmentId, value: '' };
    setEquipmentFields([...equipmentFields, newEquipmentField]);
  };

  const handleRemoveEquipmentField = (id: number) => {
    const updatedEquipmentFields = equipmentFields.filter((field) => field.id !== id);
    setEquipmentFields(updatedEquipmentFields);
  };

  const handleEquipmentFieldChange = (id: number, value: string) => {
    const updatedEquipmentFields = equipmentFields.map((field) => {
      if (field.id === id) {
        return { ...field, value };
      }
      return field;
    });
    setEquipmentFields(updatedEquipmentFields);
  };

  return (
    <div>
      <h2>Background Form</h2>
      <label>
        Background Name:
        <input type="text" value={backgroundName} onChange={(e) => setBackgroundName(e.target.value)} />
      </label>
      <br />
      <label>
        Ability Name:
        <input type="text" value={abilityName} onChange={(e) => setAbilityName(e.target.value)} />
      </label>
      <br />
      <label>
        Ability Value:
        <input type="text" value={abilityValue} onChange={(e) => setAbilityValue(e.target.value)} />
      </label>
      <br />
      <h3>Equipment:</h3>
      {equipmentFields.map((field) => (
        <div key={field.id}>
          <label>
            Equipment ID {field.id}:
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleEquipmentFieldChange(field.id, e.target.value)}
            />
          </label>
          <button onClick={() => handleRemoveEquipmentField(field.id)}>Remove</button>
          <br />
        </div>
      ))}
      <button onClick={handleAddEquipmentField}>Add Equipment Field</button>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BackgroundForm;


