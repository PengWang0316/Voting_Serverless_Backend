'use strict';
const mysql = require('mysql');

if (pool === undefined) {
  var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

module.exports.fetchCandidatesInfo = async (event, context, callback) => {
  // This will allow us to freeze open connections to a database
  context.callbackWaitsForEmptyEventLoop = false
  const SQL = 'SELECT * FROM candidates';
  pool.query(SQL, async (err, results, fields) => {
    if (err) throw new Error(SQL, err);
    callback(null, results);
    // Call the smart contractor to get vote amount.
    // const newCandidates = results.map(async candidate => {
    //   const votes = await BlockChainHelper.countVote(candidate.id.toString());
    //   return { ...candidate, votes: votes.toNumber() };
    // });
    // // Need to wait the map function resolve all promise.
    // const returnArr = await Promise.all(newCandidates);
    // resolve(returnArr);
  });
};
