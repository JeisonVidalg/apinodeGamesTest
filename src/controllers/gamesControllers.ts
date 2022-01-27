import { Request,Response } from "express";
import pool from "../database";

class GamesController{

   
   //Inicio de list
    public async list(req :Request, res: Response):Promise<void>{
       
        try {

           const game= await pool.query ( `
            call ListGames()
            `)
            res.json(game[0])
        } catch (error) {
            console.log('Error Lista ///' +error);
        }
       
    } //Fin de metodo list

    
    //Inicio de metedo getOne
    public async getOne(req :Request, res: Response):Promise<any>{
    
        
          try {
            const {id}= req.params;
             
            const game: any=  await pool.query ( `
            call ListOneGame
            ('${id}')
            `)
            if (game[0].length > 0) {
            return res.json(game[0]);
            }
            res.status(404).json({ text: "The game doesn't exits" });

        } catch (error) {
            console.log('Error get One ++++++' +error);  
        }
         
    }//Fin getOne


    //Se manda a  llamar a la ruta gamerouter
    //Inicio create
    public async create ( req: Request, res : Response): Promise<void>{
     
        try {
            await pool.query ( `
            call insertGame
            ('${req.body.title}', '${req.body.description}', 
            '${req.body.image}')
            `)
            
        } catch (error) {
            console.log('Error ****' +error);
        }
        res.json({Text:'Creating Game'+ req.body.title});
      
    }//Fin de método para crear juego

    
    
    //Se manda a  llamar a la ruta gamrouter
    public async delete ( req: Request, res : Response): Promise<void>{
        try {
            const {id}= req.params;
                   
            const game=  await pool.query ( `
            call DeleteGame
            ('${id}')
            `)
          
            res.json({Text:'Deleting Game'});
            
        } catch (error) {
            console.log('Error Deleting ++++++' +error);  
        }
    }//Fin de método para eleminar juego

  
       //Se manda a  llamar a la ruta gamrouter
    public async update ( req: Request, res : Response): Promise<void>{
       
       
        try {
            const {id}= req.params;
                   
            const game=  await pool.query ( `
            call UpdateGame
            ('${id}','${req.body.title}','${req.body.description}',
            '${req.body.image}')
            `)
          
            res.json({Text:'Udating Game'});
            
        } catch (error) {
            console.log('Error Deleting ++++++' +error);  
        }
       
    }//Fin de método para eleminar juego
  


}//Fin  de clase GamesController

export const gamesController= new GamesController();
export default GamesController;
