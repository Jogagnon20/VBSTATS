import * as SQLite from "expo-sqlite";
import { closeDB } from "./db";

export async function visualizeDB(db: SQLite.SQLiteDatabase): Promise<Record<string, any[]>> {
  const tableNames = [
    "User",
    "Team",
    "Player",
    "PlayerHistory",
    "Match",
    "GameSet",
    "Rotation",
    "Rally",
    "Event",
    "Note",
    "Substitution",
    "ActionType",
    "ResultType",
    "PlayerMatchStats",
    "TeamMatchStats"
  ];

  const tables: Record<string, any[]> = {};

  for (const tableName of tableNames) {
    try {
      const rows = await db.getAllAsync<any>(`SELECT * FROM ${tableName}`);
      tables[tableName] = rows;
    } catch (err) {
      console.log(`Erreur lecture table ${tableName}:`, err);
    }
  }
  await closeDB();
  return tables;
}