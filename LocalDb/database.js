import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'AppDatabase.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.error('Database open error:', error)
);

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS talukas (
        taluka_id INTEGER PRIMARY KEY,
        taluka_name TEXT
      );`,
      [],
      () => console.log('Talukas table created'),
      error => console.error('Error creating talukas table:', error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS villages (
        id INTEGER PRIMARY KEY,
        city_id INTEGER,
        village_name TEXT,
        lgd_code TEXT,
        FOREIGN KEY (city_id) REFERENCES talukas(taluka_id)
      );`,
      [],
      () => console.log('Villages table created'),
      error => console.error('Error creating villages table:', error)
    );
  });
};

export default db;
