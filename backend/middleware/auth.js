// Importation du package jsonwebtoken
const jsonwebtoken = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token
        const token = req.headers.authorization.split(' ')[1];
        const readToken = jsonwebtoken.verify(token, 'PEGASUS_TOKEN');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error ('Requête non authentifiée')
        });
    }
};