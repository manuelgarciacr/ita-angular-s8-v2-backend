const { Router } = require("express");
const router = Router();
const features = require("../models/Feature");

router.get("/features", (req, res, next) => {
    const query = req.query;
    features
        .find(query)
        .then((data) => {
            // console.log(data);
            return data;
        })
        .then((data) =>
            res.send({
                status: 200,
                message: "Features retrieved",
                data,
            })
        )
        .catch((err) => next(err));
}); // one or more features

router.get("/features/:id", (req, res, next) => {
    const id = req.url.split("/").pop()
    // console.log("ID", id)
    features
        .findById(id)
        .then((data) => {
            // console.log(data);
            return [data];
        })
        .then((data) =>
            res.send({
                status: 200,
                message: "Features retrieved",
                data,
            })
        )
        .catch((err) => next(err));
}); // one feature

router.put("/features", (req, res, next) => {
    features
        .findByIdAndUpdate(req.body._id, req.body)
        .then((data) =>
            res.send({
                status: 200,
                message: "Feature updated",
                data: [data],
            })
        )
        .catch((err) => next(err));
}); // one feature

router.post("/features", (req, res, next) => {
    features
        .create(req.body)
        .then((data) =>
            res.send({
                status: 200,
                message: "Feature added",
                data: [data],
            })
        )
        .catch((err) => next(err));
}); // one feature

router.delete("/features/:id", (req, res, next) => {
    features
        .deleteOne({ _id: req.params.id })
        .then((data) =>
            res.send({
                status: 200,
                message: "Feature deleted",
                data: data,
            })
        )
        .catch((err) => next(err));
}); // one feature

module.exports = router;
