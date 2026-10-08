const { Router } = require("express");
const router = Router();
const events = require("../models/Event");

router.get("/events", (req, res, next) => {
    const query = req.query;
    events
        .find(query)
        .then((data) => {
            // console.log(data);
            return data;
        })
        .then((data) =>
            res.send({
                status: 200,
                message: "Events retrieved",
                data,
            })
        )
        .catch((err) => next(err));
}); // one or more events

router.put("/events", (req, res, next) => {
    events
        .findByIdAndUpdate(req.body._id, req.body)
        .then((data) =>
            res.send({
                status: 200,
                message: "Event updated",
                data: [data],
            })
        )
        .catch((err) => next(err));
}); // one event

router.post("/events", (req, res, next) => {
    events
        .create(req.body)
        .then((data) =>
            res.send({
                status: 200,
                message: "Event added",
                data: [data],
            })
        )
        .catch((err) => next(err));
}); // one event

router.delete("/events/:id", (req, res, next) => {
    events
        .deleteOne({ _id: req.params.id })
        .then((data) =>
            res.send({
                status: 200,
                message: "Event deleted",
                data: data,
            })
        )
        .catch((err) => next(err));
}); // one event

module.exports = router;
