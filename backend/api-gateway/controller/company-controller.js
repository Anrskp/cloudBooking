const fetch = require('node-fetch');

async function getCompanyEntities(req, res) {
  let companyID = req.params.id;
  const response = await fetch('http://company-service:3002/company/entities/' + companyID);
  const json = await response.json();
  return res.json(json);
}

// exports api functions
module.exports = {
  getCompanyEntities,
};
