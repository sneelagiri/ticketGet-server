const { Router } = require("express");
const Ticket = require("./model");
const auth = require("../authentication/middleware");
const router = new Router();
const User = require("../users/model");
const moment = require("moment");

router.get("/ticket", async function(request, response, next) {
  try {
    const users = await User.findAll({
      include: [Ticket],
      order: [[Ticket, "risk", "ASC"]]
    });
    response.status(201).send(users);
  } catch (error) {
    next(error);
  }
});

// Risk calculation algorithm starts here:

numTicketsValidation = async (userId, risk) => {
  const user = await User.findByPk(userId);
  if (user.dataValues.numOfTickets && user.dataValues.numOfTickets <= 1) {
    risk = risk + 10;
    return risk;
  }
  return risk;
};

averageTicketPriceValidation = async (risk, eventId, price) => {
  const tickets = await Ticket.findAll({
    where: {
      eventId: eventId
    }
  });

  let totalPrice = 0;
  let ticketCount = 0;
  tickets.forEach(ticket => {
    totalPrice = totalPrice + ticket.price;
    ticketCount++;
  });

  const averagePrice = totalPrice / ticketCount || price;
  const priceDifference = price - averagePrice;
  if ((priceDifference > 0) & (priceDifference < 10)) {
    risk = risk - priceDifference;
  } else if (priceDifference >= 10) {
    risk = risk - 10;
  } else {
    risk = risk - priceDifference;
  }
  return risk;
};

businessHoursValidation = risk => {
  const timeNow = moment().format("HH");
  if (timeNow >= 9 && timeNow < 17) {
    risk = risk - 10;
  } else {
    risk = risk + 10;
  }
  return risk;
};

router.post("/ticket", auth, async function(request, response, next) {
  try {
    const user = request.user.dataValues;
    const { title, price, picture, description, eventId } = request.body;

    const newTicket = await Ticket.create({
      title: title,
      price: price,
      picture: picture,
      description: description,
      numOfComments: 0,
      risk: 0,
      userId: user.id,
      eventId: eventId
    });

    const match = await User.findByPk(user.id);
    const updatedMatch = await match.update({
      numOfTickets: match.numOfTickets + 1
    });
    const ticketsFunction = async eventId => {
      if (newTicket) {
        const tickets = await Ticket.findAll({
          where: {
            eventId: eventId
          }
        });
        return tickets;
      }
    };
    const tickets = await ticketsFunction(eventId);

    const riskFunction = async (tickets, updatedMatch) => {
      if (tickets && updatedMatch) {
        const mapped = await tickets.map(async ticketObject => {
          const ticket = ticketObject.dataValues;
          let risk = 0;
          risk = await numTicketsValidation(ticket.userId, risk);
          risk = await averageTicketPriceValidation(
            risk,
            ticket.eventId,
            ticket.price
          );
          risk = businessHoursValidation(risk);
          const matchingTicket = await Ticket.findByPk(ticket.id);
          const updatedTicket = await matchingTicket.update({ risk: risk });
          return updatedTicket;
        });
        const finished = await Promise.all(mapped);
        return finished;
      }
    };
    const updatedRisk = await riskFunction(tickets, updatedMatch);

    if (updatedRisk) {
      const users = await User.findAll({
        include: [Ticket],
        order: [[Ticket, "risk", "ASC"]]
      });
      response.status(201).send(users);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/ticket/:id", auth, async (request, response) => {
  // console.log("WHAT IS THE REQUEST BODY?", request.body);
  try {
    const match = await Ticket.findByPk(request.params.id);
    const finished = await match.update(request.body);
    const users = await User.findAll({
      include: [Ticket],
      order: [[Ticket, "risk", "ASC"]]
    });
    response.status(201).send(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
