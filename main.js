const indeed = require('./indeed-scraper');
const consola = require('consola');
const fs = require('fs');

const queryOptions = {
    host: 'fr.indeed.com',
    query: 'Scaleway',
    city: 'France',
    radius: '25',
    // level: 'entry_level',
    // jobType: 'fulltime',
    // maxAge: '7',
    // sort: 'date',
    // limit: 10
};

// "AWS", "GCP", "Azure", "Scaleway"
["GCP", "Azure"].forEach(csp => {
    consola.info("Running indeed-scraper for " + csp)
    queryOptions['query'] = csp
    indeed.query(queryOptions).then(async jobs => {
        consola.info("Collecting companies infos for " + csp)
        const companies = await indeed.getCompanies(jobs)
        // const companies = {}
        fs.writeFile(
            "outputs/" + csp + ".json",
            JSON.stringify({jobs, companies}),
            err => {if (err) {console.log(err);}}
        );
    });
})
