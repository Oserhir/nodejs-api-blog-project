const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.updateOne = (Model, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });

    if (!document) {
      return next(new apiError(`No ${name} for this id ${id}`, 404));
    }

    document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new apiError(`No ${name} for this id ${req.params.id}`, 404));
    }

    document.remove();
    res.status(204).send();
  });

exports.getOne = (Model, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new apiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.find();

    res.status(200).json({ size: document.length, data: document });
  });
