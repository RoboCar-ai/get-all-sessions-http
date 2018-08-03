/**
 * Gets Sessions from an HTTP hook.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */
const bucket = require('@google-cloud/storage')().bucket('sacred-reality-201417-mlengine');

const auth = process.env.AUTH;

exports.handler = (req, res) => {
  if (req.headers.Authorization !== auth) return res.status(401).send();
  
  bucket.getFiles().then(list => res.json(list)).catch(err => res.status(500).json(err));

  res.status(200).send(message);
};
