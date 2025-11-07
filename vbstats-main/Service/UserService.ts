import { User } from "@/data/entities/user";
import { createUser } from "@/data/repositories/userRepo";
import { getDB } from '@/data/sqlite/db';
export class UserService{
    private db:any;
    constructor() {
        this.db=null;
    }
    async init() {
    this.db = await getDB()
  }
    async login(userName: string, userPhotoUri:string): Promise<User> {
        if(userName.length<1 ){
            throw new Error("name required")
        }
        try{
            const user:User={
                userId:0,
                name:userName,
                photoUri:userPhotoUri 
            }
            
           const userId=await createUser(this.db,user)
            user.userId=userId;
            return user;
 

        }catch(e){
            throw new Error("Error during LogIn: "+e)
        }
    }

}

