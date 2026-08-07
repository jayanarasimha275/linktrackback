import {
  getPublishers,
  getPublisher,
  addPublisher,
  editPublisher,
  removePublisher,
} from "../services/publisherService.js";

export async function getAllPublishers(req, res, next) {
  try {
    const publishers = await getPublishers();

    res.json({
      success: true,
      count: publishers.length,
      data: publishers,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPublisherById(req, res, next) {
  try {
    const publisher = await getPublisher(req.params.id);

    res.json({
      success: true,
      data: publisher,
    });
  } catch (err) {
    next(err);
  }
}

export async function createPublisher(req, res, next) {
  try {
    const publisher = await addPublisher(req.body);

    res.status(201).json({
      success: true,
      message: "Publisher created successfully.",
      data: publisher,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePublisher(req, res, next) {
  try {
    const publisher = await editPublisher(req.params.id, req.body);

    res.json({
      success: true,
      message: "Publisher updated successfully.",
      data: publisher,
    });
  } catch (err) {
    next(err);
  }
}

export async function deletePublisher(req, res, next) {
  try {
    await removePublisher(req.params.id);

    res.json({
      success: true,
      message: "Publisher deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}
