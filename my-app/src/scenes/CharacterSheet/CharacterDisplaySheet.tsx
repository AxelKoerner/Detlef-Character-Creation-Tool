import firebaseConfig from '../../config/config';
import React, { useEffect, useState } from 'react';
import { ref, get, getDatabase, onValue, child } from 'firebase/database';
import database from '../../config/config';
import secureLocalStorage from 'react-secure-storage';
import artificerImage from '../../assets/ClassIcon_Artificer.jpg';
import barbarianImage from '../../assets/ClassIcon_Barbarian.jpg';
import bardImage from '../../assets/ClassIcon_Bard.jpg';
import clericImage from '../../assets/ClassIcon_Cleric.jpg';
import druidImage from '../../assets/ClassIcon_Druid.jpg';
import fighterImage from '../../assets/ClassIcon_Fighter.jpg';
import monkImage from '../../assets/ClassIcon_Monk.jpg';
import paladinImage from '../../assets/ClassIcon_Paladin.jpg';
import rangerImage from '../../assets/ClassIcon_Ranger.jpg';
import rogueImage from '../../assets/ClassIcon_Rogue.jpg';
import sorcererImage from '../../assets/ClassIcon_Sorcerer.jpg';
import warlockImage from '../../assets/ClassIcon_Warlock.jpg';
import wizardImage from '../../assets/ClassIcon_Wizard.jpg';


const CharacterSheet: React.FC = () => {
    
  const [characterName, setCharacterName] = useState('testName');
  const [className, setClassName] = useState('');
  const [lineage, setLineage] = useState('');
  const [background, setBackground] = useState('');
  const userMail = (secureLocalStorage.getItem('email') !==  null) ? secureLocalStorage.getItem('email') : 'none';
  const [userName, setName] = useState<string[]>([]);
  const [classPicture, setClassPicture] =useState(''); 
  const [characterLevel, setCharacterLevel] = useState('');
  const groupedData: { [ability: string]: any[] } = {};
  const [hitPoints, setHitPoints] = useState<number>();
  const [armorClass, setArmorClass] = useState<number>();
  const [speed, setSpeed]=useState<number>();
  const [size, setSize]=useState();
  const [proficiencies, setProficiencies] = useState<{ [key: string]: any }>({});
  const [abilities, setAbilities] = useState<{ [key: string]: any }>({});
  const [equipment, setEquipment] = useState<string[]>([]);
  const [AbilityScores, setAbilityScores] = useState([
    { name: "Strength", value: 10, modifier:0},
    { name: "Dexterity", value: 10, modifier:0},
    { name: "Constitution", value: 10, modifier:0},
    { name: "Intelligence", value: 10, modifier:0},
    { name: "Wisdom", value: 10, modifier:0},
    { name: "Charisma", value: 10, modifier:0},
  ]);
  const [skills, setSkills] = useState([
    { id: 1, name: 'Athletics' , ability: 'Strength' , modifier:0},
    { id: 2, name: 'Acrobatics' , ability: 'Dexterity' , modifier:0},
    { id: 3, name: 'Sleight of Hand' , ability: 'Dexterity' , modifier:0},
    { id: 4, name: 'Stealth' , ability: 'Dexterity' , modifier:0},
    { id: 5, name: 'Arcana' , ability: 'Intelligence' , modifier:0},
    { id: 6, name: 'History' , ability: 'Intelligence' , modifier:0},
    { id: 7, name: 'Investigation' , ability: 'Intelligence' , modifier:0},
    { id: 8, name: 'Nature' , ability: 'Intelligence' , modifier:0},
    { id: 9, name: 'Religion' , ability: 'Intelligence' , modifier:0},
    { id: 10, name: 'Animal Handling' , ability: 'Wisdom' , modifier:0},
    { id: 11, name: 'Insight' , ability: 'Wisdom' , modifier:0},
    { id: 12, name: 'Medicine' , ability: 'Wisdom' , modifier:0},
    { id: 13, name: 'Perception' , ability: 'Wisdom' , modifier:0},
    { id: 14, name: 'Survival' , ability: 'Wisdom' , modifier:0},
    { id: 15, name: 'Deception', ability: 'Charisma' , modifier:0},
    { id: 16, name: 'Intimidation' , ability: 'Charisma' , modifier:0},
    { id: 17, name: 'Performance' , ability: 'Charisma' , modifier:0},
    { id: 18, name: 'Persuasion' , ability: 'Charisma' , modifier:0},
  ]);


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
            }
        });
    }
    fetchUserName();

    const fetchClass = async() =>{
        const dbRef = ref(getDatabase());
        const classesSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/selectedClass`));
        if (classesSnapshot.exists()) {
          const classesData = classesSnapshot.val();
          setClassName(classesData);
        }
    }
    fetchClass();

    const fetchLevel = async() => {
        const dbRef = ref(getDatabase());
        const lvlSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/selectedLevel`));
        if (lvlSnapshot.exists()) {
          const lvlData = lvlSnapshot.val();
          setCharacterLevel(lvlData);
        }
    }
    fetchLevel();

    const fetchLineage =async () => {
        const dbRef = ref(getDatabase());
        const lineageSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/selectedLineage`));
        if (lineageSnapshot.exists()) {
          const lineageData = lineageSnapshot.val();
          setLineage(lineageData);
        }
    }

    const fetchBackground =async () => {
        const dbRef = ref(getDatabase());
        const backgroundSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/selectedBackground`));
        if (backgroundSnapshot.exists()) {
          const backgroundData = backgroundSnapshot.val();
          setBackground(backgroundData);
        }
    }

    const fetchSpeedAndSize =async () => {
        const dbRef = ref(getDatabase());
        const speedSnapshot = await get(child(dbRef, `Lineage/${lineage}/Speed`));
        if (speedSnapshot.exists()) {
          const speedData = speedSnapshot.val();
          setSpeed(speedData);
        }
        const sizeSnapshot = await get(child(dbRef, `Lineage/${lineage}/Size`));
        if (sizeSnapshot.exists()) {
          const sizeData = sizeSnapshot.val();
          setSize(sizeData);
        }
    }

    const fetchProficiencies =async () => {
        const dbRef = ref(getDatabase());
    
        
        const proficiencySnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/proficiencies`));
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
    }

    const fetchAbilities =async () => {
        const dbRef = ref(getDatabase());
        const abilitiesSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/abilities`));
        if (abilitiesSnapshot.exists()) {
            const abilitiesData = abilitiesSnapshot.val();
            setAbilities((prevAbilities) => ({
              ...prevAbilities,
              ...abilitiesData,
            }));
        }
    }

    const fetchEquipment =async () => {
        const dbRef = ref(getDatabase());
        const equipmentSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/equipment`));
        if (equipmentSnapshot.exists()) {
            const equipmentData = equipmentSnapshot.val();
            setEquipment((prevEquipment) => ({
              ...prevEquipment,
              ...equipmentData,
            }));
        }
    }

    
    const fetchAbilityScores =async () => {
        const dbRef = ref(getDatabase());

        const strScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/0/value`));
        if (strScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Strength" ? { ...score, value: strScoreSnapshot.val(), modifier: ((strScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
        const dexScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/1/value`));
        if (dexScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Dexterity" ? { ...score, value: dexScoreSnapshot.val(), modifier: ((dexScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
        const conScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/2/value`));
        if (conScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Constitution" ? { ...score, value: conScoreSnapshot.val(), modifier: ((conScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
        const intScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/3/value`));
        if (intScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Intelligence" ? { ...score, value: intScoreSnapshot.val(), modifier: ((intScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
        const wisScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/4/value`));
        if (wisScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Wisdom" ? { ...score, value: wisScoreSnapshot.val(), modifier: ((wisScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
        const chaScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/5/value`));
        if (chaScoreSnapshot.exists()) {
            const updatedAbilityScores = AbilityScores.map((score) =>
            score.name === "Charisma" ? { ...score, value: chaScoreSnapshot.val(), modifier: ((chaScoreSnapshot.val()-10)/2) } : score );
            setAbilityScores(updatedAbilityScores);
        }
    }
    fetchAbilityScores();
    

    const calcHpAndAC = async()=>{
        let lvlNumber = parseInt(characterLevel.slice(4),10);
        let constModifier = (AbilityScores.find(score => score.name === "Constitution")?.modifier)||0;
        let dexModifier = (AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0;
        let wisModifier = (AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0;
        const dbRef = ref(getDatabase());
        const hitPointSnapshot = await get(child(dbRef, `Class/${className}/Base/Hit Points`));
        if (hitPointSnapshot.exists()) {
          const hitPointData = hitPointSnapshot.val();
          setHitPoints(lvlNumber*(parseInt(hitPointData,10)+constModifier));
        }
        switch(className){
            case('Barbarian'): setArmorClass(10+dexModifier+constModifier); break
            case('Monk'): setArmorClass(10+dexModifier+wisModifier); break
            default: setArmorClass(10+dexModifier); break
        }
        
    }

    const checkClassForPicture= () => {
        switch(className){
            case('Artificer'):{setClassPicture(artificerImage); break}
            case('Barbarian'):{ setClassPicture(barbarianImage); break}
            case('Bard'):{ setClassPicture(bardImage); break}
            case('Cleric'):{ setClassPicture(clericImage); break}
            case('Druid'):{ setClassPicture(druidImage); break}
            case('Fighter'):{ setClassPicture(fighterImage); break}
            case('Monk'):{ setClassPicture(monkImage); break}
            case('Paladin'):{ setClassPicture(paladinImage); break}
            case('Ranger'):{ setClassPicture(rangerImage); break}
            case('Rogue'):{ setClassPicture(rogueImage); break}
            case('Sorcerer'):{ setClassPicture(sorcererImage); break}
            case('Warlock'):{ setClassPicture(warlockImage); break}
            case('Wizard'):{ setClassPicture(wizardImage); break}
        }
    }
     
    checkClassForPicture();
    calcHpAndAC();
    fetchLineage();
    fetchBackground();
    fetchSpeedAndSize();
    fetchProficiencies();
    fetchAbilities();
    fetchEquipment();
   
        
  });

  

  skills.forEach((item) => {
    if (groupedData[item.ability]) {
      groupedData[item.ability].push(item);
    } else {
      groupedData[item.ability] = [item];
    }
  });

 
  return(
    <table style={{ borderCollapse: 'collapse', display: "flex", justifyContent: "center"}}>
    <tbody>
      <tr>
        <td style={{ border: '1px solid white' }}>
        <img
                            id={"class_image"}
                            width="200px"
                            height="200px"
                            src={ classPicture}
                            style={{ cursor: "pointer", borderRadius: "0%" }}
                        />
        </td>
        <td  style={{ border: '1px solid white' }}>
          {characterName}
        </td>
        <td  style={{ border: '1px solid white' }}>
         {className+'  '+characterLevel}
        </td>
        <td  style={{ border: '1px solid white' }}>
          {lineage}
          <br/>
          {background}
        </td>
      </tr>
      <tr>
        <th style={{ border: '1px solid white' }}>
            HP: {hitPoints}
            <br/>
            <br/>
            AC: {armorClass}
            </th>
        <td colSpan={3} style={{ border: '1px solid white' }}>
            <div>
                <h2>Ability Scores</h2>
                <table style={{ display: "flex", justifyContent: "center" }}>
                    <tbody>
                        <tr>
                            {AbilityScores.map((value, index) => (
                            
                            <td key={index}>
                                {value.name}
                                <br/>
                                {value.value}
                                <br/>
                                {value.modifier}
                            </td>
                            
                            ))}
                            </tr>
                    </tbody>
                </table>
            </div>
            <br/>
        </td>
      </tr>
      <tr>
        <th style={{ border: '1px solid white' }}>
            Speed: {speed}
            <br/>
            <br/>
            Size: {size}
            </th>
        <th colSpan={3} style={{ border: '1px solid white' }}>
        <div>
            <h2>Skills</h2>
            <div style={{ display: 'flex' ,justifyContent: "center"}}>
                {Object.entries(groupedData).map(([ability, items]) => (
                <table key={ability} style={{ marginRight: '20px' }}>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>

                            <td>
                                <table>
                                    <td>{item.name}</td>
                                    <td>{item.modifier}</td>
                                </table>
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
        <div>
          <h2>Abilities</h2>
           
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
        </td>
      </tr>
    </tbody>
  </table>
  )
};

export default CharacterSheet;
