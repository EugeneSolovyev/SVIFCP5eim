var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/notes', function (req, res) {

        const note = {
            text: req.body.text,
            title: req.body.title,
            date: req.body.date
        };

        db.collection('notes').insert(note, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred. Error: ' + err});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').findOne(details, function (err, item) {
            if (err) {
                res.send({'err': 'An error has occurred. Error: ' + err});
            } else {
                res.send(item);
            }
        });
    });

    app.get('/get_all_notes/', function (req, res) {
        db.collection('notes').find().toArray(function (err, all) {
            if (err) {
                res.send({'Error': 'An error has occurred. Error: ' + err});
            } else {
                res.send(all);
            }
        });
    });

    // app.get('/get_notes_today/:daterange', function (req, res) {
    //     const dateRange = {
    //         from: req.body.from,
    //         to: req.body.to
    //     };
    //     console.log(dateRange);
    //     db.collection('notes').find().toArray(function (err, all) {
    //         if (err) {
    //             res.send({'Error': 'An error has occurred. Error: ' + err});
    //         } else {
    //             res.send(all);
    //         }
    //     });
    // });

    app.put('/update_note/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {
            text: req.body.text,
            title: req.body.title,
            date: req.body.date
        };

        db.collection('notes').update(details, note, function (err) {
            if (err) {
                res.send({'error': 'An error has occurred. Error: ' + err});
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/delete_note/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').remove(details, function (err) {
            if (err) {
                res.send({'err': 'An error has occurred. Error: ' + err});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
};