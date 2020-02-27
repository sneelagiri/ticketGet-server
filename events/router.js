const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const auth = require("../authentication/middleware");
const router = new Router();

router.post("/events", async function(request, response, next) {
  try {
    const pageSize = 8;
    const page = request.body.page;
    const offset = page * pageSize;
    const limit = pageSize;

    const events = await Event.findAndCountAll({
      include: [Ticket],
      limit,
      offset
    });
    response.send(events);
  } catch (error) {
    next(error);
  }
});

router.post("/eventName", async function(request, response, next) {
  try {
    // console.log("WHAT IS THE REQUEST BODY?", request.body.eventId);
    const event = await Event.findByPk(request.body.eventId, {
      include: [Ticket]
    });
    response.send(event);
  } catch (error) {
    next(error);
  }
});

router.post("/event", auth, async function(request, response, next) {
  // console.log("HOW ABOUT THIS?");
  try {
    // console.log("IS IT GETTING THIS FAR?");
    const { body } = request;
    const { name, description, eventPicture, startDate, endDate } = body;
    const entity = { name, description, eventPicture, startDate, endDate };
    // console.log("THIS IS THE ENTITY", entity);
    const newEvent = await Event.create(entity);
    // console.log("THIS IS THE NEW EVENT", newEvent);
    response.send(newEvent);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

module.exports = router;
