import AsyncStorage from '@react-native-async-storage/async-storage';
import db, { createTables } from './database';

export const insertTalukasAndVillages = async (apiResponse) => {
    try {
        const alreadyInserted = await AsyncStorage.getItem('dataInserted');
        if (alreadyInserted) return;

        db.transaction(tx => {
            apiResponse.data.forEach(taluka => {
                tx.executeSql(
                    `INSERT INTO talukas (taluka_id, taluka_name) VALUES (?, ?);`,
                    [taluka.taluka_id, taluka.taluka_name],
                    () => {
                        // console.log(`Inserted taluka: ${taluka.taluka_name}`)
                    },
                    error => console.error('Insert taluka error:', error)
                );

                taluka.villages.forEach(village => {
                    tx.executeSql(
                        `INSERT INTO villages (id, city_id, village_name, lgd_code) VALUES (?, ?, ?, ?);`,
                        [village.id, village.city_id, village.village_name, village.lgd_code],
                        () => {
                            // console.log(`Inserted village: ${village.village_name}`)
                        },
                        error => console.error('Insert village error:', error)
                    );
                });
            });
        });

        await AsyncStorage.setItem('dataInserted', 'true');
        console.log('Data insertion completed');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};
