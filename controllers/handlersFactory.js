const asyncHandler = require("express-async-handler");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.updateOne = (Model, name = "document") =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });

    if (!document) {
      res.status(404).json({ message: `No ${name} for this id ${id}` });
    }

    document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model, name = "document") =>
  asyncHandler(async (req, res) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      res
        .status(404)
        .json({ message: `No ${name} for this id ${req.params.id}` });
    }

    document.remove();
    res.status(204).send();
  });
