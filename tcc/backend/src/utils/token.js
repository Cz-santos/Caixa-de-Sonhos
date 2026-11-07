import "dotenv/config";
import jwt from "jsonwebtoken";

const KEY = process.env.CHAVE_ALE;

if (!KEY) {
    throw new Error("A chave secreta JWT não foi configurada no .env");
}


export function generateToken(userInfo) {

    if (!userInfo.role) {
        userInfo.role = "user";
    }

    return jwt.sign(
        {
            id: userInfo.id,
            nome: userInfo.nome,
            email: userInfo.email,
            role: userInfo.role
        },
        KEY,
        { expiresIn: "1d" }
    );

}


export function getTokenInfo(req) {

    try {

        let token = req.headers["x-access-token"];

        if (token === undefined) {
            token = req.query["x-access-token"];
        }

        if (!token) {
            return null;
        }

        let signed = jwt.verify(token, KEY);

        return signed;

    } catch {
        return null;
    }

}


export function getAuthentication(checkRole, throw401 = true) {

    return (req, resp, next) => {

        try {

            let signed = getTokenInfo(req);

            if (!signed) {
                throw new Error("Token inválido");
            }

            req.user = signed;

            if (checkRole && !checkRole(signed)) {
                return resp.status(403).end();
            }

            next();

        } catch {

            if (throw401) {
                return resp.status(401).send({
                    erro: "Autenticação necessária"
                });
            }

            next();

        }

    };

}