import { Response, Request, NextFunction, response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    /*
    console.log(decoded);
    {
      iss: 'https://dev-r684ixv0b3liwwg7.us.auth0.com/',        
      sub: 'google-oauth2|102772844939589801377',
      aud: [
        'food-ordering-app-api',
        'https://dev-r684ixv0b3liwwg7.us.auth0.com/userinfo'    
      ],
      iat: 1717524446,
      exp: 1717610846,
      scope: 'openid profile email',
      azp: 'e0vCYrhxqaVnE5sYhcRE1UN0iaNTwmQW'
    }
    */
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
