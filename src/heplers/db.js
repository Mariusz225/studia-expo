import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('place12.db');

export const init = () => {
    const createPromise = new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS `place` (' +
                    '`id`	INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    '`title`	TEXT NOT NULL,' +
                    '`short_description`	TEXT NOT NULL,' +
                    '`description`	TEXT,' +
                    '`image_uri`	TEXT,' +
                    '`latitude`	REAL,' +
                    '`longitude`	REAL' +
                    ');',
                    [],
                    (_, result) => { resolve(result); },
                    (_, error) => { reject(error); }
                );
            }
        )
    });
    return createPromise;
}

export const insert = (title, short_description, description, imageUri, latitude, longitude) => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'INSERT INTO `place`(`title`,`short_description`,`description`,`image_uri`,`latitude`,`longitude`) VALUES (?, ?, ?, ?, ?, ?);',
                    [title, short_description, description, imageUri, latitude, longitude],
                    (_, result) => { resolve(result); },
                    (_, error) => { reject(error); }
                );
            }
        )
    });
    return insertPromise;
}

export const select = () => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM place',
                    [],
                    (_, result) => { resolve(result); },
                    (_, error) => { reject(error); }
                );
            }
        )
    });
    return insertPromise;
}

export const query = (sql) => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    sql,
                    [],
                    (_, result) => { resolve(result); },
                    (_, error) => { reject(error); }
                );
            }
        )
    });
    return insertPromise;
}