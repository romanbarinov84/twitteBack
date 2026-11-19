import { NextFunction, Request, Response } from "express";


export const auth = (req:Request, res:Response, next:NextFunction) => {
  const authHeaders = req.headers.authorization;
  
  if (!authHeaders) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};