import { yenToUsd } from '../includes/helpers.js';
import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../models/model.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);

    var ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    //  Convert yen to USD for each ticket option
    ticketOptions = ticketOptions.map(option => {
        const usdPrice = yenToUsd(option.price).toFixed(2);
        return {
            ...option,
            price: usdPrice
        };
    });

    res.render('routes/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};

const processBookingRequest = async (req, res) => {
    const data = req.body;

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };