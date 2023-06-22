import React, { useEffect, useState } from 'react';
import {getDatabase, ref, child, get, set, onValue} from 'firebase/database';
import { initializeApp } from "firebase/app";
import secureLocalStorage from 'react-secure-storage';
import d20_Image from '../../assets/D20Icon.jpg'


const firebaseConfig = {
    apiKey: "AIzaSyDjAlBgT7ybr2GZrNgq3zFZoKu1jn7stHg",
    authDomain: "cctool-c001b.firebaseapp.com",
    databaseURL: "https://cctool-c001b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cctool-c001b",
    storageBucket: "cctool-c001b.appspot.com",
    messagingSenderId: "736945444931",
    appId: "1:736945444931:web:07a06f34302f63b8929cf6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const DndCharacterSheet: React.FC = () => {
    const [lineages, setLineages] = useState<string[]>([]);
    const [selectedLineage, setSelectedLineage] = useState('');
    const [classes, setClasses] = useState<string[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [backgrounds, setBackgrounds] = useState<string[]>([]);
    const [selectedBackground, setSelectedBackground] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('Level_01');
    const [abilities, setAbilities] = useState<{ [key: string]: any }>({});
    const [equipment, setEquipment] = useState<string[]>([]);
    const [proficiencies, setProficiencies] = useState<{ [key: string]: any }>({});
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const groupedData: { [ability: string]: any[] } = {};
    const userMail = (secureLocalStorage.getItem('email') !==  null) ? secureLocalStorage.getItem('email') : 'none';
    const [userName, setName] = useState<string[]>([]);

    const [values, setValues] = useState([
        { name: "Strenght", value: 8 , checked1: false , checked2: false, disabled1: false, disabled2:false},
        { name: "Dexterity", value: 8 , checked1: false, checked2: false, disabled1: false, disabled2:false},
        { name: "Constitution", value: 8 , checked1: false, checked2: false, disabled1: false, disabled2:false},
        { name: "Intelligence", value: 8 , checked1: false, checked2: false, disabled1: false, disabled2:false},
        { name: "Wisdom", value: 8 , checked1: false, checked2: false, disabled1: false, disabled2:false},
        { name: "Charisma", value: 8 , checked1: false, checked2: false, disabled1: false, disabled2:false},
    ]);
    const data = [
        { id: 1, name: 'Athletics' , ability: 'Strength' },
        { id: 2, name: 'Acrobatics' , ability: 'Dexterity' },
        { id: 3, name: 'Sleight of Hand' , ability: 'Dexterity' },
        { id: 4, name: 'Stealth' , ability: 'Dexterity' },
        { id: 5, name: 'Arcana' , ability: 'Intelligence' },
        { id: 6, name: 'History' , ability: 'Intelligence' },
        { id: 7, name: 'Investigation' , ability: 'Intelligence' },
        { id: 8, name: 'Nature' , ability: 'Intelligence' },
        { id: 9, name: 'Religion' , ability: 'Intelligence' },
        { id: 10, name: 'Animal Handling' , ability: 'Wisdom' },
        { id: 11, name: 'Insight' , ability: 'Wisdom' },
        { id: 12, name: 'Medicine' , ability: 'Wisdom' },
        { id: 13, name: 'Perception' , ability: 'Wisdom' },
        { id: 14, name: 'Survival' , ability: 'Wisdom' },
        { id: 15, name: 'Deception', ability: 'Charisma' },
        { id: 16, name: 'Intimidation' , ability: 'Charisma' },
        { id: 17, name: 'Performance' , ability: 'Charisma' },
        { id: 18, name: 'Persuasion' , ability: 'Charisma' },
      ];
  
    useEffect(() => {

        const fetchUserName = async () => {
        const dbData = ref(database, 'users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === userMail) {
                    setName(entry.name);
                }
            }});
        }
      const fetchLineages = async () => {
        const dbRef = ref(getDatabase());
        const lineagesSnapshot = await get(child(dbRef, 'Lineage'));
        if (lineagesSnapshot.exists()) {
          const lineagesData = lineagesSnapshot.val();
          setLineages(Object.keys(lineagesData));
        }
      };
  
      const fetchClasses = async () => {
        const dbRef = ref(getDatabase());
        const classesSnapshot = await get(child(dbRef, 'Class'));
        if (classesSnapshot.exists()) {
          const classesData = classesSnapshot.val();
          setClasses(Object.keys(classesData));
        }
      };
  
      const fetchBackgrounds = async () => {
        const dbRef = ref(getDatabase());
        const backgroundsSnapshot = await get(child(dbRef, 'Background'));
        if (backgroundsSnapshot.exists()) {
          const backgroundsData = backgroundsSnapshot.val();
          setBackgrounds(Object.keys(backgroundsData));
        }
      };
      
      fetchUserName();
      fetchLineages();
      fetchClasses();
      fetchBackgrounds();
    }, []);
  
    const handleLineageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLineage = event.target.value;
        setSelectedLineage(selectedLineage);

     
        
        const dbRef = ref(getDatabase());
        const abilitiesSnapshot = await get(child(dbRef, `Lineage/${selectedLineage}/Abilities`));
        if (abilitiesSnapshot.exists()) {
            const abilitiesData = abilitiesSnapshot.val();
            setAbilities((prevAbilities) => ({
              ...prevAbilities,
              ...abilitiesData,
            }));
        }
        
      };
  
    const handleClassChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClass = event.target.value;
        setSelectedClass(event.target.value);

        const dbRef = ref(getDatabase());
    
        
        const proficiencySnapshot = await get(child(dbRef, `Class/${selectedClass}/Base/Proficiencies`));
        if (proficiencySnapshot.exists()) {
        const proficiencyData = proficiencySnapshot.val();
        setProficiencies((prevProficiencies) => {
            const updatedProficiencies = { ...prevProficiencies };
            Object.entries(proficiencyData).forEach(([ability, description]) => {
            if (Array.isArray(description)) {
                updatedProficiencies[ability] = description.map((item) => String(item));
            } else {
                updatedProficiencies[ability] = String(description);
            }
            });
            return updatedProficiencies;
        });
        }
        
        
        const abilitiesSnapshot = await get(child(dbRef, `Class/${selectedClass}/Lvl_01`));
        if (abilitiesSnapshot.exists()) {
            const abilitiesData = abilitiesSnapshot.val();
            setAbilities((prevAbilities) => ({
              ...prevAbilities,
              ...abilitiesData,
            }));
        }
    };
  
    const handleBackgroundChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBackground=event.target.value;
        setSelectedBackground(event.target.value);

        
        const dbRef = ref(getDatabase());
        const abilitiesSnapshot = await get(child(dbRef, `Background/${selectedBackground}/Abilities`));
        if (abilitiesSnapshot.exists()) {
            const abilitiesData = abilitiesSnapshot.val();
            setAbilities((prevAbilities) => ({
              ...prevAbilities,
              ...abilitiesData,
            }));
        }

        const equipmentSnapshot = await get(child(dbRef, `Background/${selectedBackground}/Equipment`));
        if (equipmentSnapshot.exists()) {
            const equipmentData = equipmentSnapshot.val();
            setEquipment((prevEquipment) => ({
              ...prevEquipment,
              ...equipmentData,
            }));
        }

        

    };

    

    const handleLevelChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLevel=event.target.value;
        setSelectedLevel(event.target.value);

        

        const lvlNumber = parseInt(selectedLevel.substring(4), 10);
        const dbRef = ref(getDatabase());
       

          for (let level = 1; level <= lvlNumber; level++) {
            let lvlTxt = level < 10 ? `Lvl_0${level}` : `Lvl_${level}`;
          
            const abilitiesSnapshot = await get(child(dbRef, `Class/${selectedClass}/${lvlTxt}`));
            if (abilitiesSnapshot.exists()) {
              const abilitiesData = abilitiesSnapshot.val();
              setAbilities((prevAbilities) => {
                const updatedAbilities: { [key: string]: any } = { ...prevAbilities };
                if (level > lvlNumber) {
                  Object.keys(abilitiesData).forEach((key) => delete updatedAbilities[key]);
                } else {
                  Object.assign(updatedAbilities, abilitiesData);
                }
                return updatedAbilities;
              });
            }
        }
      };

      const increaseValue = (index: number) => {
        const updatedValues = [...values];
        if (updatedValues[index].value < 15) {
          updatedValues[index].value += 1;
          setValues(updatedValues);
        }
      };
    
      const decreaseValue = (index: number) => {
        const updatedValues = [...values];
        if (updatedValues[index].value > 8) {
          updatedValues[index].value -= 1;
          setValues(updatedValues);
        }
      };

      const handleCheckboxChange = (rowIndex: number, columnIndex: number, checkboxType: string) => {
        const updatedValues = [...values];
        let checkedCount1 = 0;
        let checkedCount2 = 0;
      
        updatedValues.forEach((value, index) => {
          if (index === columnIndex) {
            if (checkboxType === "checkbox1") {
              if (value.checked1) {
                value.value -= 1;
                value.checked1 = false;
                
              } else {
                value.value += 1;
                value.checked1 = true;
                value.checked2 = false;
                
              }
            } else if (checkboxType === "checkbox2") {
              if (value.checked2) {
                value.value -= 2;
                value.checked2 = false;
              } else {
                value.value += 2;
                value.checked1 = false;
                value.checked2 = true;
              }
            }
          } else {
            if (value.checked1) {
              checkedCount1++;
            }
            if (value.checked2) {
              checkedCount2++;
            }
          }
        });
      
        if (checkboxType === "checkbox1") {
          if (checkedCount1 >= 1) {
            updatedValues.forEach((value) => {
              if (!value.checked1) {
                value.disabled1 = true;
              }
            });
          } else {
            updatedValues.forEach((value) => {
              value.disabled1 = false;
            });
          }
        }
      
        if (checkboxType === "checkbox2") {
          if (checkedCount2 >= 1) {
            updatedValues.forEach((value) => {
              if (!value.checked2) {
                value.disabled2 = true;
              }
            });
          } else {
            updatedValues.forEach((value) => {
              value.disabled2 = false;
            });
          }
        }
      
        setValues(updatedValues);
      };
      
      

      const handleSkillCheckboxChange = (itemId: number) => {
        if (checkedItems.includes(itemId)) {
          setCheckedItems(checkedItems.filter((id) => id !== itemId));
        } else if (checkedItems.length < 5) {
          setCheckedItems([...checkedItems, itemId]);
        }
      };

      
      data.forEach((item) => {
        if (groupedData[item.ability]) {
          groupedData[item.ability].push(item);
        } else {
          groupedData[item.ability] = [item];
        }
      });


      const handleSave = () => {
        
        const characterIdInput = document.getElementById("characterID") as HTMLInputElement;
        const characterId = characterIdInput.value;
      

            const userId = userName;
        

        if (!characterId) {
            alert("Please enter a character Name.");
            return;
          }
      
        const data = {
          lineages,
          selectedLineage,
          classes,
          selectedClass,
          backgrounds,
          selectedBackground,
          selectedLevel,
          abilities,
          equipment,
          proficiencies,
          checkedItems,
          values,
        };
      
        const db = getDatabase();
        const characterRef = ref(db, `users/${userId}/Character/${characterId}`);
        set(characterRef, data)
          .then(() => {
            console.log('Data saved successfully!');
            alert("Character saved successfully")
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      };
  
    return (
        <div>
        <h1>New Character</h1>
        <table style={{ borderCollapse: 'collapse', display: "flex", justifyContent: "center"}}>
        <tbody>
          <tr>
            <td colSpan={4} style={{ border: '1px solid white' }}>
             
                <button data-testid='handleSave' onClick={handleSave}>Save</button>
      
            </td>
          </tr>
          <tr>
            <th style={{ border: '1px solid white' }}>
            <img
                            id={"class_image"}
                            width="200px"
                            height="200px"
                            src={ d20_Image}
                            style={{ cursor: "pointer", borderRadius: "0%" }}
                        />
            </th>
            <td colSpan={3} style={{ border: '1px solid white' }}>
                <div>
                    <h2>Ability Scores</h2>
                    <table style={{ display: "flex", justifyContent: "center" }}>
                        <tbody>
                        <tr>
                            {values.map((value, index) => (
                            <td key={index}>
                                <button data-testid={value.name} onClick={() => increaseValue(index)}>+</button>
                                <br />
                                {value.name}
                            </td>
                            ))}
                        </tr>
                        <tr>
                            {values.map((value, index) => (
                            <td key={index}>{value.value}</td>
                            ))}
                        </tr>
                        <tr>
                            {values.map((value, index) => (
                            <td key={index}>
                                <button onClick={() => decreaseValue(index)}>-</button>
                            </td>
                            ))}
                        </tr>
                        <tr>
                            {values.map((value, columnIndex) => (
                            <td key={columnIndex}>
                                <label>
                                <input
                                    data-testid={value.name + 'checked1'}
                                    type="checkbox"
                                    checked={value.checked1}
                                    onChange={() =>
                                    handleCheckboxChange(0, columnIndex, "checkbox1")
                                    }
                                    disabled={value.checked2}
                                />
                                +1
                                </label>
                            </td>
                            ))}
                        </tr>
                        <tr>
                            {values.map((value, columnIndex) => (
                            <td key={columnIndex}>
                                <label>
                                <input
                                    data-testid={value.name + 'checked2'}
                                    type="checkbox"
                                    checked={value.checked2}
                                    onChange={() =>
                                    handleCheckboxChange(1, columnIndex, "checkbox2")
                                    }
                                    disabled={value.checked1}
                                />
                                +2
                                </label>
                            </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
          </tr>
          <tr>
            <th style={{ border: '1px solid white' }}>
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <label>
                                <input  data-testid='name' type="text" id="characterID" />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>Class:</td>
                        <td>
                            <label>
                    
                                <select  data-testid="class" value={selectedClass} onChange={handleClassChange}>
                                    <option value="">Select Class</option>
                                        {classes.map((classKey) => (
                                    <option key={classKey} value={classKey}>
                                    {classKey}
                                    </option>
                                         ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td> Level:</td>
                        <td>
                            <label>
                                <select data-testid="level" value={selectedLevel} onChange={handleLevelChange}>
                                    <option value="Lvl_01">Lvl_01</option>
                                    <option value="Lvl_02">Lvl_02</option>
                                    <option value="Lvl_03">Lvl_03</option>
                                    <option value="Lvl_04">Lvl_04</option>
                                    <option value="Lvl_05">Lvl_05</option>
                                    <option value="Lvl_06">Lvl_06</option>
                                    <option value="Lvl_07">Lvl_07</option>
                                    <option value="Lvl_08">Lvl_08</option>
                                    <option value="Lvl_09">Lvl_09</option>
                                    <option value="Lvl_10">Lvl_10</option>
                                    <option value="Lvl_11">Lvl_11</option>
                                    <option value="Lvl_12">Lvl_12</option>
                                    <option value="Lvl_13">Lvl_13</option>
                                    <option value="Lvl_14">Lvl_14</option>
                                    <option value="Lvl_15">Lvl_15</option>
                                    <option value="Lvl_16">Lvl_16</option>
                                    <option value="Lvl_17">Lvl_17</option>
                                    <option value="Lvl_18">Lvl_18</option>
                                    <option value="Lvl_19">Lvl_19</option>
                                    <option value="Lvl_20">Lvl_20</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td> Lineage:</td>
                        <td>
                            <label>
                                <select data-testid="lineage" value={selectedLineage} onChange={handleLineageChange}>
                                <option value="">Select Lineage</option>
                                {lineages.map((lineageKey) => (
                                    <option key={lineageKey} value={lineageKey}>
                                    {lineageKey}
                                    </option>
                                ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>Background:</td>
                        <td>
                            <label>
                                <select data-testid="background" value={selectedBackground} onChange={handleBackgroundChange}>
                                <option value="">Select Background</option>
                                {backgrounds.map((backgroundKey) => (
                                    <option key={backgroundKey} value={backgroundKey}>
                                    {backgroundKey}
                                    </option>
                                ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                </table>
                
              


            </th>
            <th colSpan={3} style={{ border: '1px solid white' }}>
                <div>
                    <h2>Skills</h2>
                    <div style={{ display: 'flex' ,justifyContent: "center"}}>
                        {Object.entries(groupedData).map(([ability, items]) => (
                        <table key={ability} style={{ marginRight: '20px' }}>
                            <caption>{ability}</caption>
                            <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <input
                                        data-testid={'skills' + item.name}
                                    type="checkbox"
                                    id={`checkbox-${item.name}`}
                                    checked={checkedItems.includes(item.name)}
                                    onChange={() => handleSkillCheckboxChange(item.name)}
                                    disabled={checkedItems.length >= 5 && !checkedItems.includes(item.name)}
                                    />
                                    <label htmlFor={`checkbox-${item.name}`}></label>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        ))}
                    </div>
                </div>
            <br/>
            </th>
          </tr>
          <tr>
            <td style={{ border: '1px solid white', verticalAlign: 'top' }}>
            
                <h2>Proficiencies</h2>
                <table style={{display: "flex", justifyContent: "center"}}>
                    <tbody>
                    {Object.entries(proficiencies).map(([proficiency, description]) => (
                        <tr key={proficiency}>
                        <td>
                            <strong>{proficiency}: </strong>
                        </td>
                        <td>
                            {Array.isArray(description) ? (
                            <ul>
                                {description.map((item, index) => (
                                <li key={index}>{item}</li>
                                ))}
                            </ul>
                            ) : (
                            <span>{description}</span>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            
            </td>
            <td colSpan={2} style={{ border: '1px solid white' , maxWidth: '600px'}}>
             
                <h2>Abilities</h2>
                <div style={{ height: '600px', overflow: 'auto' }}>
                    <table>    
                        <tbody>
                            {Object.entries(abilities).map(([ability, description]) => (
                            <tr key={ability}>
                                <td>{ability}</td>
                                <td>{description}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
          
                </div>
            </td>
            <td style={{ border: '1px solid white' , verticalAlign: 'top'}}>
                <div >
                    <h2>Equipment</h2>
                    <table style={{display: "flex", justifyContent: "center"}}>    
                        <tbody>
                            {Object.entries(equipment).map(([equipment, description]) => (
                                <tr key={equipment}>
                                    <td>{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>  
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  };

export default DndCharacterSheet;
