// Importation du package jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'PEGASUS_TOKEN');
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