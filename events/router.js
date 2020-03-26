const { Router } = require("express");
const { Op } = require("sequelize");
const Event = require("./model");
const Ticket = require("../tickets/model");
const auth = require("../authentication/middleware");
const router = new Router();
const moment = require("moment");

router.post("/events", async function(request, response, next) {
  try {
    const pageSize = 9;
    const page = request.body.page;
    const offset = page * pageSize;
    const limit = pageSize;
    const events = await Event.findAndCountAll({
      where: {
        endDate: {
          [Op.gte]: moment().format("YYYY-MM-DD")
        }
      },
      order: [["endDate", "DESC"]],
      include: [Ticket],
      limit,
      offset,
      distinct: true
    });
    // console.log("WHAT ARE THE EVENTS?", events);
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
    const pageSize = 9;
    const page = request.body.page;
    const offset = page * pageSize;
    const limit = pageSize;

    const { body } = request;
    const { name, description, eventPicture, startDate, endDate } = body;
    const entity = { name, description, eventPicture, startDate, endDate };

    // console.log("THIS IS THE ENTITY", entity);
    await Event.create(entity);
    // console.log("THIS IS THE NEW EVENT", newEvent);
    const events = await Event.findAndCountAll({
      where: {
        endDate: {
          [Op.gte]: moment().format("YYYY-MM-DD")
        }
      },
      order: [["endDate", "DESC"]],
      include: [Ticket],
      limit,
      offset,
      distinct: true
    });
    response.send(events);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

module.exports = router;
