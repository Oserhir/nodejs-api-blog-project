exports.globalErrHandler = (err, req, res, next) => {
  res
    .status(err.statuscode ? err.statuscode : 500)
    .json({ status: err.status, message: err.message /*stack: err.stack */ });
};
