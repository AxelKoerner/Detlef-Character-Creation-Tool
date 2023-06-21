import React, { useState } from 'react';
import { ref, set, getDatabase } from 'firebase/database';

const LineageForm: React.FC = () => {
  const [lineageName, setLineageName] = useState('');
  const [abilities, setAbilities] = useState([{ id: 1, name: '', value: '' }]);
  const [size, setSize] = useState('');
  const [speed, setSpeed] = useState('');

  const handleSave = async () => {
    const db = getDatabase();
    const lineageRef = ref(db, `Lineage/${lineageName}/Abilities`);

    try {
      // Save abilities
      for (const field of abilities) {
        const abilityId = field.name;
        const abilityData = field.value ;
        const abilityFieldRef = ref(db, `Lineage/${lineageName}/Abilities/${abilityId}`);

        await set(abilityFieldRef, abilityData);
        console.log(`Ability ${abilityId} saved successfully!`);
        alert('success');
      }

      console.log('Abilities saved successfully!');

      // Save size and speed
      const sizeRef = ref(db, `Lineage/${lineageName}/Size`);
      await set(sizeRef, size);
      console.log('Size saved successfully!');

      const speedRef = ref(db, `Lineage/${lineageName}/Speed`);
      await set(speedRef, speed);
      console.log('Speed saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddAbilityField = () => {
    const newAbilityId = abilities.length + 1;
    const newAbilityField = { id: newAbilityId, name: '', value: '' };
    setAbilities([...abilities, newAbilityField]);
  };

  const handleRemoveAbilityField = (id: number) => {
    const updatedAbilities = abilities.filter((field) => field.id !== id);
    setAbilities(updatedAbilities);
  };

  const handleAbilityFieldChange = (id: number, name: string, value: string) => {
    const updatedAbilities = abilities.map((field) => {
      if (field.id === id) {
        return { ...field, name, value };
      }
      return field;
    });
    setAbilities(updatedAbilities);
  };

  return (
    <div>
        <h2>Lineage Form</h2>
        <table style={{borderCollapse: 'collapse',display: "flex", justifyContent: "center"}}>
            <tbody>
                <tr>
                    <td>
                        <label>
                            Lineage Name:
                            <input data-testid='lineage name' type="text" value={lineageName} onChange={(e) => setLineageName(e.target.value)} />
                        </label>
                        <br/>
                        <br/>
                        <br/>
                    </td>
                    <td></td>
                    <td>
                        <label>
                            Size:
                            <input data-testid='size' type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                        </label>
                        <br/>
                        <br/>
                        <br/>
                    </td>
                    <td></td>
                    <td>
                        <label>
                            Speed:
                            <input data-testid='speed' type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                        </label>
                        <br/>
                        <br/>
                        <br/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        {abilities.map((field) => (
                            <div key={field.id}>
                            <label>
                                Ability Name:
                                <input
                                    data-testid='ability name'
                                type="text"
                                value={field.name}
                                onChange={(e) => handleAbilityFieldChange(field.id, e.target.value, field.value)}
                                />
                            </label>
                            <label>
                                Ability Value:
                                <input
                                    data-testid='ability value'
                                type="text"
                                value={field.value}
                                onChange={(e) => handleAbilityFieldChange(field.id, field.name, e.target.value)}
                                />
                            </label>
                            <button data-testid='remove abilities' onClick={() => handleRemoveAbilityField(field.id)}>Remove</button>
                            
                            <br/>
                            <br/>
                            
                            </div>
                        ))}
                        <br/>
                    </td>
                    
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <button data-testid='add abilities' onClick={handleAddAbilityField}>Add Ability Field</button>
                        <br/>
                        <br/>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><button data-testid='handleSave' onClick={handleSave}>Save</button></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    /*
    <div>
      <h2>Lineage Form</h2>
      <label>
        Lineage Name:
        <input type="text" value={lineageName} onChange={(e) => setLineageName(e.target.value)} />
      </label>
      <br />
      <h3>Abilities:</h3>
      {abilities.map((field) => (
        <div key={field.id}>
          <label>
            Ability Name:
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleAbilityFieldChange(field.id, e.target.value, field.value)}
            />
          </label>
          <label>
            Ability Value:
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleAbilityFieldChange(field.id, field.name, e.target.value)}
            />
          </label>
          <button onClick={() => handleRemoveAbilityField(field.id)}>Remove</button>
          <br />
        </div>
      ))}
      <button onClick={handleAddAbilityField}>Add Ability Field</button>
      <br />
      <label>
        Size:
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <br />
      <label>
        Speed:
        <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
    */
  );
};

export default LineageForm;



