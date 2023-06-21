import GridLayout from "react-grid-layout";
import React, {useEffect, useState} from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Box, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import secureLocalStorage from "react-secure-storage";
import StockImage from "../../assets/stock_profile_image.jpg";
import database from '../../config/config';
import { child, get, getDatabase, onValue, ref} from "firebase/database";
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

function Dashboards() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [characters, setCharacters] = useState<any[]>([]);
    const layout = [
        {i: "profile", x: 0, y: 0, w: 3, h: 12, minW: 3, minH: 12},
        {i: "b", x: 3, y: 0, w: 6, h: 8, minW: 6, minH: 8},
        {i: "c", x: 6, y: 0, w: 6, h: 8, minW: 6, minH: 8}
    ];
    let profilePicture = (secureLocalStorage.getItem('picture') !== null) ? secureLocalStorage.getItem('picture') : StockImage

    const [userName, setUserName] = React.useState("");
    const [userMail, setUserMail] = React.useState("");

    useEffect(() => {
        const mail = secureLocalStorage.getItem("email");
        const dbData = ref(database, 'users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === mail) {
                    setUserMail(entry.email);
                    setUserName(entry.name);
                    return;
                }
            }
        })

        const fetchCharacters = async () => {
            const dbRef = ref(getDatabase());
            const characterSnapshot = await get(child(dbRef, `users/${userName}/Character`));
            if (characterSnapshot.exists()) {
              
              
              setCharacters(Object.entries(characterSnapshot.val()));
            }
          };

        fetchCharacters();
    }, []   )

    return (
        <>
            <Typography variant={"h1"}>DASHBOARDS</Typography>
            <GridLayout className="layout" cols={12} rowHeight={30} width={1750} layout={layout}>
                <div key="profile">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}
                    >
                        <Box
                            mb="25px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Box
                                style={{
                                    flex: "1 1 100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                }}
                            >
                                <img
                                    alt="profile-user"
                                    src={profilePicture?.toString()}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>
                            <Box
                                textAlign="center"
                                sx={{ flex: "0 0 auto", width: "100%", px: 2, mt: 3 }}
                            >
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 0",
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {userName}
                                </Typography>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    sx={{
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word",
                                        mt: 1,
                                    }}
                                >
                                    {userMail}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </div>
                {characters.map(([key, value]) => (
                <div key={key}>
                    <Paper
                    elevation={4}
                    sx={{
                        padding: 5,
                        background: colors.primary[400],
                        width: 'inherit',
                        height: 'inherit',
                    }}
                    >
                    
                    <Box
                            mb="25px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Box
                                style={{
                                    flex: "1 1 100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                }}
                            >
                                {value.selectedClass === 'Artificer' && (
                                <img
                                    alt="classImage"
                                    src={artificerImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Barbarian' && (
                                <img
                                    alt="classImage"
                                    src={barbarianImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Bard' && (
                                <img
                                    alt="classImage"
                                    src={bardImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Cleric' && (
                                <img
                                    alt="classImage"
                                    src={clericImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Druid' && (
                                <img
                                    alt="classImage"
                                    src={druidImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Fighter' && (
                                <img
                                    alt="classImage"
                                    src={fighterImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Monk' && (
                                <img
                                    alt="classImage"
                                    src={monkImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Paladin' && (
                                <img
                                    alt="classImage"
                                    src={paladinImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Ranger' && (
                                <img
                                    alt="classImage"
                                    src={rangerImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Rogue' && (
                                <img
                                    alt="classImage"
                                    src={rogueImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Sorcerer' && (
                                <img
                                    alt="classImage"
                                    src={sorcererImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Warlock' && (
                                <img
                                    alt="classImage"
                                    src={warlockImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            {value.selectedClass === 'Wizard' && (
                                <img
                                    alt="classImage"
                                    src={wizardImage }
                                
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            
                            </Box>
                            <Box
                                textAlign="center"
                                sx={{ flex: "0 0 auto", width: "100%", px: 2, mt: 3 }}
                            >
                                
                                <Typography
                                    color={colors.greenAccent[500]}
                                    sx={{
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word",
                                        mt: 1,
                                    }}
                                >
                                    {key}
                                </Typography>
                            </Box>
                        </Box>
                    
                    </Paper>
                </div>
                ))}
                {/** 
                <div key="b">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}>
                    </Paper>
                </div>
                <div key="c">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}>
                    </Paper>
                </div>
                */}
            </GridLayout></>
)

}

export default Dashboards;