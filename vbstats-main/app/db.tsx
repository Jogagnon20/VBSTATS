// Script généré avec l'assistance de ChatGPT pour tester les opérations CRUD sur la base de données SQLite
// Prompt utilisé :
// Aide-moi à implémenter une série de tests pour mes opérations CRUD

import { useEffect, useState } from 'react';
import { dropDB, getDB } from '../data/sqlite/db';
import { visualizeDB } from '../data/sqlite/visualizeDB';

// Imports CRUD (ajuste les chemins selon ta structure)
import { createPlayerHistory } from '@/data/repositories/playerHistoryRepo';
import { createEvent } from '../data/repositories/eventRepo';
import { createGameSet } from '../data/repositories/gameSetRepo';
import { createMatch } from '../data/repositories/matchRepo';
import { createNote } from '../data/repositories/noteRepo';
import { createPlayer } from '../data/repositories/playerRepo';
import { createRally } from '../data/repositories/rallyRepo';
import { createRotation } from '../data/repositories/rotationRepo';
import { createSubstitution } from '../data/repositories/substitutionRepo';
import { createTeam } from '../data/repositories/teamRepo';
import { createUser } from '../data/repositories/userRepo';

import TablesDb from '@/components/TablesDb';
import { View } from 'react-native';

export default function App() {

  const [tables, setTables] = useState<Record<string, any[]>>({})

  useEffect(() => {
    (async () => {

      const dbToDrop = await getDB()
      await dropDB(dbToDrop)
      console.log('Ancienne base SQLite supprimée')
      const db = await getDB()
      console.log('Base SQLite initialisée')

      try {
        // === 1. Création de base ===
        const userId = await createUser(db, { userId: 0, name: 'Rachid', photoUri: 'rachid.png' })
        const teamId = await createTeam(db, { teamId: 0, name: 'UdeS', season: '2025', ownerId: userId })
        const awayTeamId = await createTeam(db, { teamId: 0, name: 'Concordia', season: '2025', ownerId: null })
        const playerId = await createPlayer(db, { playerId: 0, name: 'Sarah Dupont', number: 7, position: 'Passeur' })
        const playerHistoryId = await createPlayerHistory(db, { playerId: playerId, teamId: teamId, fromDate: '2025-08-01', toDate: null, number: 7, position: 'Passeur' })
        const playerId2 = await createPlayer(db, { playerId: 0, name: 'Christian Auray', number: 12, position: 'Marqueur' })
        const playerHistoryId2 = await createPlayerHistory(db, { playerId: playerId2, teamId: teamId, fromDate: '2025-08-01', toDate: null, number: 12, position: 'Marqueur' })

        // === 2. Match et Set ===
        const matchId = await createMatch(db, {
          matchId: 0,
          myTeamId: teamId,
          otherTeamId: awayTeamId,
          date: '2025-10-09',
          location: 'CEPSUM'
        })

        const setId = await createGameSet(db, {
          setId: 0,
          matchId,
          index: 1,
          scoreHome: 25,
          scoreAway: 22,
          isClosed: true
        })

        // === 3. ActionType / ResultType de base ===
        const serveTypeId = 1
        const attackTypeId = 2
        const blockTypeId = 3
        const receptionTypeId = 4
        const defenseTypeId = 5

        const killResultId = 1
        const errorResultId = 2
        const inPlayResultId = 3

        // === 4. Rotation, Rallye et Événement ===
        const rotationId = await createRotation(db, {
          rotationId: 0,
          setId,
          rotationNo: 1,
          p1: playerId,
          p2: playerId,
          p3: playerId,
          p4: playerId,
          p5: playerId,
          p6: playerId
        })

        // === RALLY 1 – Service gagnant (point UdeS) ===
        const rally1 = await createRally(db, {
          rallyId: 0,
          setId,
          startingRotationId: rotationId,
          servingTeamId: teamId,
          winnerTeamId: teamId,
          rallyNo: 1
        })

        // === Evenement Sarah Dupont - fin du rallye ===
        const eventId = await createEvent(db, {
          eventId: 0,
          rallyId: rally1,
          actionTypeId: serveTypeId,
          resultTypeId: killResultId,
          playerId,
          index: 1,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Service direct gagnant',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId)

        // === RALLY 2 – Échange long (point Concordia) ===
        const rally2 = await createRally(db, {
          rallyId: 0,
          setId,
          startingRotationId: rotationId,
          servingTeamId: teamId,
          winnerTeamId: awayTeamId,
          rallyNo: 2
        })

        // === Evenement Sarah Dupont ===
        const eventId2 = await createEvent(db, {
          eventId: 0,
          rallyId: rally2,
          actionTypeId: serveTypeId,
          resultTypeId: inPlayResultId,
          playerId,
          index: 1,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'En jeu',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId2)

        // === Evenement Christian Auray ===
        const eventId3 = await createEvent(db, {
          eventId: 0,
          rallyId: rally2,
          actionTypeId: defenseTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId2,
          index: 2,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'En jeu',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId3)

        // === Evenement Sarah Dupont ===
        const eventId4 = await createEvent(db, {
          eventId: 0,
          rallyId: rally2,
          actionTypeId: defenseTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId,
          index: 3,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'En jeu',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId4)

        // === Evenement Sarah Dupont – fin du rallye ===
        const eventId5 = await createEvent(db, {
          eventId: 0,
          rallyId: rally2,
          actionTypeId: attackTypeId,
          resultTypeId: errorResultId,
          playerId,
          index: 4,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Erreur en attaque',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId5)

        // === RALLY 3 – Bloc gagnant (point UdeS) ===
        const rally3 = await createRally(db, {
          rallyId: 0,
          setId,
          startingRotationId: rotationId,
          servingTeamId: awayTeamId,
          winnerTeamId: teamId,
          rallyNo: 3
        })

        // === Evenement Sarah Dupont - fin du rallye ===
        const eventId6 = await createEvent(db, {
          eventId: 0,
          rallyId: rally3,
          actionTypeId: blockTypeId,
          resultTypeId: killResultId,
          playerId,
          index: 1,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Point sur bloc',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId6)

        // === RALLY 4 – Échange (point UdeS) ===
        const rally4 = await createRally(db, {
          rallyId: 0,
          setId,
          startingRotationId: rotationId,
          servingTeamId: teamId,
          winnerTeamId: teamId,
          rallyNo: 4
        })

        // === Evenement Sarah Dupont ===
        const eventId7 = await createEvent(db, {
          eventId: 0,
          rallyId: rally4,
          actionTypeId: serveTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId,
          index: 1,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Bon service',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId7)

        // === Evenement Christian Auray ===
        const eventId8 = await createEvent(db, {
          eventId: 0,
          rallyId: rally4,
          actionTypeId: receptionTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId2,
          index: 2,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Bonne réception',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId8)

        // === Evenement Sarah Dupont – fin du rallye ===
        const eventId9 = await createEvent(db, {
          eventId: 0,
          rallyId: rally4,
          actionTypeId: attackTypeId,
          resultTypeId: killResultId,
          playerId,
          index: 3,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Point sur attaque',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId9)


        // === Rally 5 – Échange long (point Concordia) ===
        const rally5 = await createRally(db, {
          rallyId: 0,
          setId,
          startingRotationId: rotationId,
          servingTeamId: teamId,
          winnerTeamId: awayTeamId,
          rallyNo: 5
        })

        // === Evenement Sarah Dupont ===
        const eventId10 = await createEvent(db, {
          eventId: 0,
          rallyId: rally5,
          actionTypeId: serveTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId,
          index: 1,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Bon service',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId10)

        // === Evenement Christian Auray ===
        const eventId11 = await createEvent(db, {
          eventId: 0,
          rallyId: rally5,
          actionTypeId: receptionTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId2,
          index: 2,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Bonne réception',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId11)

        const eventId12 = await createEvent(db, {
          eventId: 0,
          rallyId: rally5,
          actionTypeId: blockTypeId,
          resultTypeId: inPlayResultId,
          playerId: playerId2,
          index: 3,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Bon bloc',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId12)

        const eventId13 = await createEvent(db, {
          eventId: 0,
          rallyId: rally5,
          actionTypeId: attackTypeId,
          resultTypeId: errorResultId,
          playerId: playerId2,
          index: 4,
          locationFrom: 1,
          locationTo: 6,
          quality: 3,
          note: 'Attaque dans le filet',
          teamSide: 'HOME'
        })
        console.log('Événement créé', eventId13)

        // === 5. Substitution et Note ===
        await createSubstitution(db, {
          subId: 0,
          setId,
          playerInId: playerId,
          playerOutId: playerId2,
          positionSlot: 3
        })

        await createNote(db, {
          noteId: 0,
          setId,
          playerId,
          content: 'Bon set, équipe bien en place.'
        })

        // === 6. Visualisation globale ===
        const result = await visualizeDB(db)
        setTables(result)
        
      } catch (error) {
        console.error('Erreur dans les tests CRUD :', error)
      }
    })()
  }, [])


  return (
    <View>
      <TablesDb tables={tables} />
    </View>
  );
}
