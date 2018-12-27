const fetch = require('node-fetch');

// create

// get

async function getCompanyEntities(req, res) {
  let companyID = req.params.id;
  const response = await fetch('http://company-service:3002/company/entities/' + companyID);
  const json = await response.json();
  return res.json(json);
}

// create new entities
async function createNewEntity(req, res) {
  let comapnyID = req.params.id;

  const response = await fetch('http://company-service:3002/company/entities/' + comapnyID, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();
  return res.json(json);
}
// edit

// delete

// exports api functions
module.exports = {
  getCompanyEntities,
  createNewEntity
};
