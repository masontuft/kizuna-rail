import { getRouteById, getSchedulesByRoute } from '../../models/model.js';

export default async (req, res) => {
    const { routeId } = req.params;
    var details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);

    const route = await getRouteById(routeId);
    const monthFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        timeZone: 'UTC'
    });

    var details = {
        ...route,
        operatingMonths: route.operatingMonths.map(month =>
            monthFormatter.format(new Date(Date.UTC(2024, month - 1, 1)))
        ),
        schedules: await getSchedulesByRoute(routeId)
    };    

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};