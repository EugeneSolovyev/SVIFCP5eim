const NoteRoutes = require('./note_routes');
module.exports = function (app, db) {
    NoteRoutes(app, db);
};