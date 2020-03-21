/*
  This module simply returns a status OK.
  Used for checking the connection.
*/
module.exports = (req, res) => {
  res.sendStatus(200);
};
