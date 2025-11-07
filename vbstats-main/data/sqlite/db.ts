import * as SQLite from 'expo-sqlite';

export type DB = SQLite.SQLiteDatabase;
let dbInstance: DB | null = null;

export async function createSchema(db: DB): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS User (
      UserId     INTEGER PRIMARY KEY AUTOINCREMENT,
      Name       TEXT NOT NULL,
      PhotoURI   TEXT
      );
      
    CREATE TABLE IF NOT EXISTS Team (
      TeamId     INTEGER PRIMARY KEY AUTOINCREMENT,
      Name       TEXT NOT NULL,
      Season     TEXT,
      OwnerId    INTEGER,
      FOREIGN KEY (OwnerId) REFERENCES User(UserId) ON DELETE SET NULL
      );
        
    CREATE TABLE IF NOT EXISTS Player (
      PlayerId   INTEGER PRIMARY KEY AUTOINCREMENT,
      Name       TEXT NOT NULL,
      Number     INTEGER,
      Position   TEXT
      );
          
    CREATE TABLE IF NOT EXISTS PlayerHistory (
      PlayerId   INTEGER NOT NULL,
      TeamId     INTEGER NOT NULL,
      FromDate   TEXT NOT NULL,
      ToDate     TEXT,
      Number     INTEGER,
      Position   TEXT,
      PRIMARY KEY (PlayerId, TeamId, FromDate),
      FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId) ON DELETE CASCADE,
      FOREIGN KEY (TeamId) REFERENCES Team(TeamId) ON DELETE CASCADE,
      CHECK (ToDate IS NULL OR ToDate > FromDate)
      );
     
    CREATE TABLE IF NOT EXISTS Match (
      MatchId    INTEGER PRIMARY KEY AUTOINCREMENT,
      MyTeamId INTEGER NOT NULL,
      OtherTeamId INTEGER NOT NULL,
      Date       TEXT NOT NULL,
      Location   TEXT,
      FOREIGN KEY (MyTeamId) REFERENCES Team(TeamId),
      FOREIGN KEY (OtherTeamId) REFERENCES Team(TeamId),
      CHECK (MyTeamId != OtherTeamId)
      );
     
    CREATE TABLE IF NOT EXISTS GameSet (
      SetId     INTEGER PRIMARY KEY AUTOINCREMENT,
      MatchId   INTEGER NOT NULL,
      SetIndex  INTEGER NOT NULL,
      ScoreHome INTEGER NOT NULL DEFAULT 0,
      ScoreAway INTEGER NOT NULL DEFAULT 0,
      IsClosed  INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (MatchId) REFERENCES Match(MatchId) ON DELETE CASCADE,
      UNIQUE (MatchId, SetIndex)
      );
      
    CREATE TABLE IF NOT EXISTS Rotation (
      RotationId INTEGER PRIMARY KEY AUTOINCREMENT,
      SetId      INTEGER NOT NULL,
      RotationNo INTEGER NOT NULL,
      P1         INTEGER NOT NULL,
      P2         INTEGER NOT NULL,
      P3         INTEGER NOT NULL,
      P4         INTEGER NOT NULL,
      P5         INTEGER NOT NULL,
      P6         INTEGER NOT NULL,
      FOREIGN KEY (SetId) REFERENCES GameSet(SetId) ON DELETE CASCADE,
      FOREIGN KEY (P1) REFERENCES Player(PlayerId),
      FOREIGN KEY (P2) REFERENCES Player(PlayerId),
      FOREIGN KEY (P3) REFERENCES Player(PlayerId),
      FOREIGN KEY (P4) REFERENCES Player(PlayerId),
      FOREIGN KEY (P5) REFERENCES Player(PlayerId),
      FOREIGN KEY (P6) REFERENCES Player(PlayerId),
      UNIQUE (SetId, RotationNo)
      );
     
    CREATE TABLE IF NOT EXISTS Rally (
      RallyId            INTEGER PRIMARY KEY AUTOINCREMENT,
      SetId              INTEGER NOT NULL,
      StartingRotationId INTEGER NOT NULL,
      ServingTeamId      INTEGER NOT NULL,
      WinnerTeamId       INTEGER,
      RallyNo            INTEGER NOT NULL,
      FOREIGN KEY (SetId) REFERENCES GameSet(SetId) ON DELETE CASCADE,
      FOREIGN KEY (StartingRotationId) REFERENCES Rotation(RotationId),
      FOREIGN KEY (ServingTeamId) REFERENCES Team(TeamId),
      FOREIGN KEY (WinnerTeamId) REFERENCES Team(TeamId),
      UNIQUE (SetId, RallyNo)
      );
     
    CREATE TABLE IF NOT EXISTS ActionType (
      ActionTypeId INTEGER PRIMARY KEY AUTOINCREMENT,
      Code         TEXT NOT NULL UNIQUE,
      Label        TEXT NOT NULL
      );
      
    CREATE TABLE IF NOT EXISTS ResultType (
      ResultTypeId INTEGER PRIMARY KEY AUTOINCREMENT,
      Code         TEXT NOT NULL UNIQUE,
      Label        TEXT NOT NULL,
      DeltaPoints  INTEGER NOT NULL CHECK (DeltaPoints IN (0, 1))
      );
    
    CREATE TABLE IF NOT EXISTS Event (
      EventId            INTEGER PRIMARY KEY AUTOINCREMENT,
      RallyId            INTEGER NOT NULL,
      ActionTypeId       INTEGER NOT NULL,
      ResultTypeId       INTEGER NOT NULL,
      PlayerId           INTEGER,
      EventNo            INTEGER NOT NULL,
      LocationFrom       INTEGER CHECK (LocationFrom BETWEEN 1 AND 6),
      LocationTo         INTEGER CHECK (LocationTo BETWEEN 1 AND 6),
      Quality            INTEGER CHECK (Quality BETWEEN 0 AND 3),
      Note               TEXT,
      TeamSide           TEXT    NOT NULL CHECK (TeamSide IN ('HOME', 'AWAY')) DEFAULT 'HOME',
      FOREIGN KEY (RallyId) REFERENCES Rally(RallyId) ON DELETE CASCADE,
      FOREIGN KEY (ActionTypeId) REFERENCES ActionType(ActionTypeId),
      FOREIGN KEY (ResultTypeId) REFERENCES ResultType(ResultTypeId),
      FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId),
      UNIQUE (RallyId, EventNo)
      );
      
    CREATE TABLE IF NOT EXISTS Note (
      NoteId   INTEGER PRIMARY KEY AUTOINCREMENT,
      SetId    INTEGER NOT NULL,
      PlayerId INTEGER,
      Content  TEXT NOT NULL,
      FOREIGN KEY (SetId) REFERENCES GameSet(SetId) ON DELETE CASCADE,
      FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId)
      );
     
    CREATE TABLE IF NOT EXISTS Substitution (
      SubstitutionId INTEGER PRIMARY KEY AUTOINCREMENT,
      SetId          INTEGER NOT NULL,
      PlayerInId     INTEGER NOT NULL,
      PlayerOutId    INTEGER NOT NULL,
      PositionSlot   INTEGER NOT NULL CHECK (PositionSlot BETWEEN 1 AND 6),
      FOREIGN KEY (SetId) REFERENCES GameSet(SetId) ON DELETE CASCADE,
      FOREIGN KEY (PlayerInId) REFERENCES Player(PlayerId),
      FOREIGN KEY (PlayerOutId) REFERENCES Player(PlayerId),
      CHECK (PlayerInId != PlayerOutId)
      );
    `
  );
      
  await db.execAsync(`
    INSERT OR IGNORE INTO ActionType (ActionTypeId, Code, Label) VALUES
    (1, 'SERVE', 'Service'),
    (2, 'ATTACK', 'Attaque'),
    (3, 'BLOCK', 'Bloc'),
    (4, 'RECEPTION', 'Réception'),
    (5, 'DEFENSE', 'Défense');
   `
  );
      
  await db.execAsync(`
    INSERT OR IGNORE INTO ResultType (ResultTypeId, Code, Label, DeltaPoints) VALUES
    (1, 'KILL', 'Point attaque', 1),
    (2, 'ERROR', 'Erreur', 0),
    (3, 'IN_PLAY', 'Ballon en jeu', 0);
    `
  );
        
  await db.execAsync(`
    CREATE VIEW IF NOT EXISTS PlayerMatchStats AS
    SELECT
    p.PlayerId,
    p.Name AS PlayerName,
    m.MatchId,
    m.Date AS MatchDate,
    COALESCE(SUM(rt.DeltaPoints), 0) AS TotalPoints,
    SUM(CASE WHEN at.Code = 'SERVE' THEN 1 ELSE 0 END) AS NbServe,
    SUM(CASE WHEN at.Code = 'SERVE' AND rt.ResultTypeId = 1 THEN 1 ELSE 0 END) AS NbAce,
    SUM(CASE WHEN at.Code = 'ATTACK' THEN 1 ELSE 0 END) AS NbAttack,
    SUM(CASE WHEN at.Code = 'ATTACK' AND rt.ResultTypeId = 1 THEN 1 ELSE 0 END) AS NbKill,
    SUM(CASE WHEN at.Code = 'BLOCK' THEN 1 ELSE 0 END) AS NbBlock,
    SUM(CASE WHEN at.Code = 'BLOCK' AND rt.ResultTypeId = 1 THEN 1 ELSE 0 END) AS NbBlockPoint,
    SUM(CASE WHEN at.Code = 'RECEPTION' THEN 1 ELSE 0 END) AS NbReception,
    SUM(CASE WHEN at.Code = 'DEFENSE' THEN 1 ELSE 0 END) AS NbDefense,
    SUM(CASE WHEN rt.ResultTypeId = 2 THEN 1 ELSE 0 END) AS NbErrors
    FROM Event e
    JOIN Rally r ON e.RallyId = r.RallyId
    JOIN GameSet gs ON r.SetId = gs.SetId
    JOIN Match m ON gs.MatchId = m.MatchId
    JOIN ActionType at ON e.ActionTypeId = at.ActionTypeId
    JOIN ResultType rt ON e.ResultTypeId = rt.ResultTypeId
    LEFT JOIN Player p ON e.PlayerId = p.PlayerId
    WHERE e.PlayerId IS NOT NULL
    GROUP BY p.PlayerId, m.MatchId;
    `
  );

  await db.execAsync(`
    CREATE VIEW IF NOT EXISTS TeamMatchStats AS
    SELECT
    t.TeamId,
    t.Name AS TeamName,
    m.MatchId,
    m.Date AS MatchDate,
    SUM(pms.TotalPoints) AS TotalPoints,
    SUM(pms.NbServe) AS NbServe,
    SUM(pms.NbAce) AS NbAce,
    SUM(pms.NbAttack) AS NbAttack,
    SUM(pms.NbKill) AS NbKill,
    SUM(pms.NbBlock) AS NbBlock,
    SUM(pms.NbBlockPoint) AS NbBlockPoint,
    SUM(pms.NbReception) AS NbReception,
    SUM(pms.NbDefense) AS NbDefense,
    SUM(pms.NbErrors) AS NbErrors
    FROM PlayerMatchStats pms
    JOIN PlayerHistory ph ON pms.PlayerId = ph.PlayerId
    JOIN Team t ON ph.TeamId = t.TeamId
    JOIN Match m ON pms.MatchId = m.MatchId
    WHERE (ph.ToDate IS NULL OR m.Date BETWEEN ph.FromDate AND ph.ToDate)
    GROUP BY t.TeamId, m.MatchId;
    `
  );
}

export async function initDB(): Promise<DB> {
  const db = await SQLite.openDatabaseAsync("vbstats.db");
  await db.execAsync(`PRAGMA foreign_keys = ON;`);
  await createSchema(db);
  return db;
}

export async function getDB(): Promise<DB> {
  if (!dbInstance) {
    dbInstance = await initDB();
  }
  return dbInstance;
}

export async function closeDB() {
  if (dbInstance) {
    await dbInstance.closeAsync();
    dbInstance = null;
  }
}

export async function dropDB(db: DB) {
  await db.execAsync(`
    PRAGMA foreign_keys = OFF;

    DROP VIEW IF EXISTS PlayerMatchStats;
    DROP VIEW IF EXISTS TeamMatchStats;
    DROP TABLE IF EXISTS Substitution;
    DROP TABLE IF EXISTS Note;
    DROP TABLE IF EXISTS Event;
    DROP TABLE IF EXISTS Rally;
    DROP TABLE IF EXISTS Rotation;
    DROP TABLE IF EXISTS GameSet;
    DROP TABLE IF EXISTS Match;
    DROP TABLE IF EXISTS PlayerHistory;
    DROP TABLE IF EXISTS Player;
    DROP TABLE IF EXISTS Team;
    DROP TABLE IF EXISTS User;
    DROP TABLE IF EXISTS ActionType;
    DROP TABLE IF EXISTS ResultType;

    PRAGMA foreign_keys = ON;
  `);
  await closeDB();
}