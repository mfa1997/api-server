var response = require('../../response');

module.exports = function userGet(socket, pg, redis, payload) {
  var id = payload.id;

  // Select user from database.
  pg.query(`SELECT id AS "id", username AS "username"
            FROM users
            WHERE id = $1::int`,
  [id], function(err, rows) {
    if (err) return socket.error('ServiceInternal', err);
    if (rows.length > 1) return socket.error('InvalidInput');
    socket.send(response('success', rows[0]));
  });
};
