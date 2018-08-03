/**
 * Gets Sessions from an HTTP hook.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */
const bucket = require('@google-cloud/storage')().bucket('sacred-reality-201417-mlengine');
const path = require('path');

const auth = process.env.AUTH;

exports.handler = (req, res) => {
  if (req.method === `OPTIONS`) {
    return res.set('Access-Control-Allow-Origin', "*")
       .set('Access-Control-Allow-Methods', 'GET, POST')
       .status(200);
  }
  if (req.headers.authorization !== auth) return res.status(401).send();

  bucket.getFiles({
    autoPaginate: false,
    delimiter: "/",
    prefix: "data/"
  })
    .then(data => res.json(data[2].prefixes.map(pre => path.basename(pre))))
    .catch(err => {
      console.log('error listing files', err);
      res.status(500).json(err)
    });
};
