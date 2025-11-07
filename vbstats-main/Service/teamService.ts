
import { Player } from "@/data/entities/player";
import { playerHistory } from "@/data/entities/playerHistory";
import { Team } from "@/data/entities/team";
import { createPlayerHistory } from "@/data/repositories/playerHistoryRepo";
import { createPlayer } from "@/data/repositories/playerRepo";
import { createTeam, getAllTeams, getPlayersTeam, getTeamsByUserId } from "@/data/repositories/teamRepo";
import { getDB } from '@/data/sqlite/db';
export class TeamService{
    private db:any;
    constructor() {
        this.db=null;
    }
    async init() {
    this.db = await getDB()
  }
    async createTeam(teamName: string, teamSeason: string, teamOwnerId: number|null): Promise<Team> {
        if(teamName.length<1 || teamSeason.length<1){
            throw new DOMException("team name and saison required")
        }
        try{
            const team:Team={
                teamId:0,
                name:teamName,
                season:teamSeason,
                ownerId:teamOwnerId
            }
           const teamId= await createTeam(this.db,team)
           team.teamId=teamId;
           return team;
        }catch(error){
            throw new DOMException("Error during team creation: "+error);
        }
     
    }
      async getAllTeams(): Promise<Team[]>{
        try{
            return await getAllTeams(this.db)
        }catch(e){
            throw new DOMException("Error during teams listing:" +e)
        }
        
    }
     
     async getUserTeams(userId: number): Promise<Team[]> {
        try{
            return await getTeamsByUserId(this.db,userId) ;  
        }catch(error){
            throw new DOMException("Error when listing user teams"+error)
        }   
    }

   async addPlayerToTeam(playerName: string, playerNumber:number| null, playerPosition: string| null, teamId: number): Promise<{player:Player, tranferDate:string}> {
        try {
            if (playerName.length < 1) {
                throw new DOMException("player name required");
            }
            const player: Player = {
                playerId: 0,
                name: playerName,
                number: playerNumber,
                position: playerPosition
            };
            const playerId= await createPlayer(this.db, player);
            player.playerId=playerId;
            const playerHistory: playerHistory = {
                playerId: player.playerId,
                teamId: teamId,
                fromDate: new Date().toLocaleDateString('en-CA'),
                toDate: null,
                number: player.number,
                position: player.position
            }
          const transferDate= await createPlayerHistory(this.db, playerHistory);
          if(!transferDate){
            throw new DOMException("Error during creating player history");
          }
            return {player:player, tranferDate:transferDate};
        } catch (error) {
            throw new DOMException("Error during adding player to team: " + error);
        }
    }
    async getTeamPlayers(teamId: number): Promise<Player[]> {
        try {
            return await getPlayersTeam(this.db,teamId);
        } catch (error) {
            throw new DOMException("Error during fetching team players: " + error);
        }
    }
    

}