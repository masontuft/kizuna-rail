import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    var routes = await getAllRoutes();
    var seasons = await getListOfSeasons();
    // Sort by season and region here
    const querySeason = req.query.season;
    const queryRegion = req.query.region;

    switch(querySeason)
    {
        case('autumn'):
        {
            routes = routes.filter(route => route.bestSeason === 'autumn');
            break;
        }
        case('summer'):
        {
            routes = routes.filter(route => route.bestSeason === 'summer');
            break;
        }
        case('spring'):
        {
            routes = routes.filter(route => route.bestSeason === 'spring');
            break;
        }
        case('winter'):
        {
            routes = routes.filter(route => route.bestSeason === 'winter');
            break;
        }
        default:
            // Move forward with default case
    }

    switch(queryRegion)
    {
        case('central'):
        {
            routes = routes.filter(route => route.region === 'central');
            break;
        }
        case('northern'):
        {
            routes = routes.filter(route => route.region === 'northern');
            break;
        }
        case('kansai'):
        {
            routes = routes.filter(route => route.region === 'kansai');
            break;
        }
        case('hokkaido'):
        {
            routes = routes.filter(route => route.region === 'hokkaido');
            break;
        }
        default:
            // Move forward with default case
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};