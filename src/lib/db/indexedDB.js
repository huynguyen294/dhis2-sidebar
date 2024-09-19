import Dexie from "dexie";

const DB_NAME = "dhis2-side";

const LocalDB = new Dexie(DB_NAME);
LocalDB.version(1).stores({ scripts: "++id, name, script" });

export default LocalDB;
