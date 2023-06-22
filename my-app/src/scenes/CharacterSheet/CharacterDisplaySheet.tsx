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
import { forEach } from 'lodash';



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
            let strValue: number;
            let dexValue: number;
            let conValue: number;
            let intValue: number;
            let wisValue: number;
            let chaValue: number;
          
            const strScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/0/value`));
            if (strScoreSnapshot.exists()) {
              strValue = parseInt(strScoreSnapshot.val(), 10);
            }
            const dexScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/1/value`));
            if (dexScoreSnapshot.exists()) {
              dexValue = parseInt(dexScoreSnapshot.val(), 10);
            }
            const conScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/2/value`));
            if (conScoreSnapshot.exists()) {
              conValue = parseInt(conScoreSnapshot.val(), 10);
            }
            const intScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/3/value`));
            if (intScoreSnapshot.exists()) {
              intValue = parseInt(intScoreSnapshot.val(), 10);
            }
            const wisScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/4/value`));
            if (wisScoreSnapshot.exists()) {
              wisValue = parseInt(wisScoreSnapshot.val(), 10);
            }
            const chaScoreSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/values/5/value`));
            if (chaScoreSnapshot.exists()) {
              chaValue = parseInt(chaScoreSnapshot.val(), 10);
            }
          
            const updatedAbilityScores = AbilityScores.map((score) => {
              if (score.name === "Strength") {
                return { ...score, value: strValue, modifier: Math.floor(((strValue-10)/2)) };
              }
              if (score.name === "Dexterity") {
                return { ...score, value: dexValue, modifier: Math.floor(((dexValue-10)/2)) };
              }
              if (score.name === "Constitution") {
                return { ...score, value: conValue, modifier: Math.floor(((conValue-10)/2)) };
              }
              if (score.name === "Intelligence") {
                return { ...score, value: intValue, modifier: Math.floor(((intValue-10)/2)) };
              }
              if (score.name === "Wisdom") {
                return { ...score, value: wisValue, modifier: Math.floor(((wisValue-10)/2)) };
              }
              if (score.name === "Charisma") {
                return { ...score, value: chaValue, modifier: Math.floor(((chaValue-10)/2)) };
              }
              return score;
            });
          
            setAbilityScores(updatedAbilityScores);
    }
    fetchAbilityScores();

    const fetchSkills =async () => {
        const dbRef = ref(getDatabase());
        let skill_0 :string;
        let skill_1 :string;
        let skill_2 :string;
        let skill_3 :string;
        let skill_4 :string;
        let proficiencyBonus:number;

        switch(parseInt(characterLevel.slice(4),10)){
            case 1:
            case 2:
            case 3:
            case 4: proficiencyBonus=2; break

            case 5:
            case 6:
            case 7:
            case 8: proficiencyBonus=3; break
            
            case 9:
            case 10:
            case 11:
            case 12: proficiencyBonus=4; break

            case 13:
            case 14:
            case 15:
            case 16: proficiencyBonus=5; break

            case 17:
            case 18:
            case 19:
            case 20: proficiencyBonus=6; break
        }


        for(let i=0; i<4; i++){
            const skillSnapshot = await get(child(dbRef, `users/${userName}/Character/${characterName}/checkedItems/${i}`));
            if(skillSnapshot.exists()){
               switch(i){
                case(0): skill_0=skillSnapshot.val(); break
                case(1): skill_1=skillSnapshot.val(); break
                case(2): skill_2=skillSnapshot.val(); break
                case(3): skill_3=skillSnapshot.val(); break
                case(4): skill_4=skillSnapshot.val(); break
               }
            }
        }

        const updatedSkills = skills.map((score) => {
            if (score.name === "Athletics") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Athletics"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Strength")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Strength")?.modifier)||0) };
              }
            }  
            if (score.name === "Acrobatics") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Acrobatics"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0) };
              }
            }
            if (score.name === "Sleight of Hand") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Sleight of Hand"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0) };
              }
            }
            if (score.name === "Stealth") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Stealth"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0) };
              }
            }
            if (score.name === "Arcana") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Arcana"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0) };
              }
            }
            if (score.name === "History") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="History"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0) };
              }
            }
            if (score.name === "Investigation") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Investigation"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0) };
              }
            }
            if (score.name === "Nature") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Nature"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0) };
              }
            }
            if (score.name === "Religion") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Religion"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Intelligence")?.modifier)||0) };
              }
            }
            if (score.name === "Animal Handling") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Animal Handling"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0) };
              }
            }
            if (score.name === "Insight") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Insight"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0) };
              }
            }
            if (score.name === "Medicine") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Medicine"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0) };
              }
            }
            if (score.name === "Perception") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Perception"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0) };
              }
            }
            if (score.name === "Survival") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Survival"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0) };
              }
            }
            if (score.name === "Deception") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Deception"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0) };
              }
            }
            if (score.name === "Intimidation") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Intimidation"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0) };
              }
            }
            if (score.name === "Performance") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Performance"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0) };
              }
            }
            if (score.name === "Persuasion") {
                if((skill_0||skill_1||skill_2||skill_3||skill_4)==="Persuasion"){
                    return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0)+proficiencyBonus };
                }
              else{
                return { ...score,  modifier: ((AbilityScores.find(score => score.name === "Charisma")?.modifier)||0) };
              }
            }
            
            
            return score;
          });
        
          setSkills(updatedSkills);
        
        
    }
    

    const calcHpAndAC = async()=>{
        let lvlNumber = parseInt(characterLevel.slice(4),10);
        let constModifier = (AbilityScores.find(score => score.name === "Constitution")?.modifier)||0;
        let dexModifier = (AbilityScores.find(score => score.name === "Dexterity")?.modifier)||0;
        let wisModifier = (AbilityScores.find(score => score.name === "Wisdom")?.modifier)||0;
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
    fetchSkills();
        
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
