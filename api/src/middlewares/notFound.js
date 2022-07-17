module.exports = {
  notFound(req, res, next) {
    res.status(404).send({ message: `Invalid Endpoint` });
  },
};
