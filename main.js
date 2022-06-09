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
    sort: 'date',
    // limit: 100
};

// "AWS", "GCP", "Azure", "Scaleway"
["python", "java", "node.js"].forEach(csp => {
    consola.info("Running indeed-scraper for " + csp)
    queryOptions['query'] = csp === "java" ? "java -javascript" : csp
    indeed.query(queryOptions).then(async jobs => {
        consola.info("Collecting companies infos for " + csp)
        const {companiesUrls, companies} = await indeed.getCompanies(jobs)
        // const companies = {}
        const country = queryOptions.host.split('.')[0]
        fs.writeFile(
            "outputs/" + csp + (country === 'fr' ? '' : '-' + country) + ".json",
            JSON.stringify({csp, country, jobs, companiesUrls, companies}),
            err => {if (err) {console.log(err);}}
        );
    });
})
