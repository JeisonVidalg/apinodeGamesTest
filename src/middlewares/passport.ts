import { request, Request,Response } from "express";
import pool from "../database";

//Comprueba los datos del token
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import secretJwt from '../keys'


//Permite vereficar el token del header de la aplicacion
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretJwt.jwtSecret
  };


  export default new Strategy(opts, async (payload, done) => {
      console.log('Me llaman');
      
    try {
        const user = await pool.query( `
        call userIdentify
        ('${payload.user}')
        `)
        console.log('***', user[0])
        if (user[0].length>0) {
            return done(null, user);
        }else{
            return done(null, false);
        }
        } catch (error) {
        console.log('Error de strategy',error);
        }
  });

