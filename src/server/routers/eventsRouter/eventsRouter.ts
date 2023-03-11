import { Router } from "express";
import { getEvents } from "../../controllers/eventsControllers/eventsControllers.js";

const getEventsRoute = "/events";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getEvents);

export default eventsRouter;
