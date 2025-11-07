import { User } from "../data/entities/user";


    const tableTeams =[
    { teamId:1, name:"team1", season:"1", ownerId:1},
    { teamId:2, name:"team2", season:"1", ownerId:1 },
    { teamId:3, name:"team3", season:"1", ownerId:null }
]
const tablePlayers=[
    {playerId:1, name:"Mike", number:3, position: "avant"},
    {playerId:2, name:"Jonnathan", number:5, position: "avant"},
    {playerId:3, name:"Yvan", number:1, position: "avant"},
    {playerId:4, name:"rachid", number:2, position: "avant"}
]
const tableUsers= [{userId: 1, name:"Benjamin", photoUri:"/image/profil2.jpg"}];

const tablePlayerHistory=[
    {playerId:3, teamId:1, fromDate:"2023-01-01", toDate:null, number:1, position:"avant"},
    {playerId:4, teamId:1, fromDate:"2023-01-01", toDate:null, number:2, position:"avant"}
]

jest.mock("../data/repositories/userRepo",()=>({
        createUser: jest.fn((db,user)=>{
                return Promise.resolve(5);
            })
    }));
jest.mock("../data/repositories/teamRepo", ()=>({
        createTeam: jest.fn((db,team)=>{
            return Promise.resolve(1);
        }),
        getAllTeams: jest.fn((db)=>{
            return Promise.resolve(tableTeams);
        }),
        getPlayersTeam: jest.fn((db,teamId)=>{
            const players= tablePlayers.filter(p=>tablePlayerHistory.some(ph=>ph.teamId===teamId && ph.playerId===p.playerId));
            return Promise.resolve(players);
        })
}));
jest.mock("../data/repositories/playerRepo",()=>({
    createPlayer: jest.fn((db,player)=>{
        return Promise.resolve(1);
    }),
    getAllPlayers: jest.fn(()=>{
        return Promise.resolve(tablePlayers);
    })
}));
jest.mock("../data/repositories/playerHistoryRepo",()=>({
  createPlayerHistory: jest.fn((db,history)=>{
      return Promise.resolve(new Date().toLocaleDateString('en-CA'));
  }),
  getHistoryByTeam: jest.fn((db,teamId)=>{
      const histories= tablePlayerHistory.filter(h=>h.teamId===teamId);
      return Promise.resolve(histories);
  } )
}));

import { UserService } from "../service/UserService";
import { TeamService } from "../service/teamService";
    let userService:UserService;
    let teamService:TeamService;

beforeAll(()=>{
     userService= new UserService();
    teamService= new TeamService();
})
describe("Login",()=>{
    test("login retourne un utilisateur",async()=>{
        const user: User= await userService.login("Yvan","/image/profil3.jpg")
        expect(user).toEqual({userId:5, name:"Yvan", photoUri:"/image/profil3.jpg"})})

    test("Login will throw error if name is empty", async()=>{
      await expect(userService.login("","/image/profil3.jpg")).rejects.toThrow("name required")
    });
    }   
)
 describe("createTeam",()=>{
    test("createTeam will create a team and return it",async()=>{
        const team= await teamService.createTeam("Team A","2023",1)
        expect(team).toEqual({teamId:1,name:"Team A",season:"2023",ownerId:1})
    });
    test("createTeam will throw error if name or season is empty", async()=>{
      await expect(teamService.createTeam("","2023",1)).rejects.toThrow("team name and saison required")
    await expect(teamService.createTeam("Team A","",1)).rejects.toThrow("team name and saison required")
    });
})
describe("addPlayerToTeam",()=>{
    test("addPlayerToTeam will add a player to a team and return it",async()=>{
        const {player,tranferDate}= await teamService.addPlayerToTeam("Yvan",1,"avant",1) 
        expect(player).toEqual({playerId:1, name:"Yvan", number:1, position:"avant"})
        expect(tranferDate).toEqual(new Date().toLocaleDateString('en-CA'));
    });
    test("addPlayerToTeam will throw error if player name is empty", async()=>{
      await expect(teamService.addPlayerToTeam("",1,"avant",1)).rejects.toThrow("player name required")
})
})

describe("getTeamPlayers",()=>{
    test("getTeamPlayers will return all players of a team",async()=>{
        const players= await teamService.getTeamPlayers(1)
        expect(players).toEqual([    
            {playerId:3, name:"Yvan", number:1, position: "avant"},
            {playerId:4, name:"rachid", number:2, position: "avant"}])
        })
    test("getTeamPlayers will return empty array if team has no players",async()=>{
        const players= await teamService.getTeamPlayers(2)
        expect(players).toEqual([])})
})


