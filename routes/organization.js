const {query} = require("../mysql");

module.exports = (router) => {
    router.get('/orgs', async (req, res) => {
        const sql = `
            SELECT *
            FROM organization`
        const allOrganizations = await query(sql)
        res.json(allOrganizations)
    })

    router.get('/org/:orgId', async (req, res) => {
        const orgId = req.params.orgId
        const sql = `
            SELECT * 
            FROM organization 
            WHERE id = ${orgId}`
        const selectedOrganization = await query(sql)
        res.json(selectedOrganization)
    })

    router.post('/addOrg', async (req, res) => {
        const newOrg = req.body
        const columns = Object.keys(newOrg).join(', ')
        const values = Object.values(newOrg)
        const sql = `
            INSERT INTO organization (${columns}) 
            VALUES (${values.map(() => '?').join(', ')})`
        await query(sql, values)

        const sqlGetOrg = `
            SELECT *
            FROM organization
            ORDER BY id DESC
            LIMIT 1`;
        const addedOrg = (await query(sqlGetOrg))[0]
        res.json(addedOrg)

    })
    router.put('/updateOrg/:orgId', async (req, res) => {
        const newOrgDetails = req.body
        const orgId = req.params.orgId
        const columns = Object.keys(newOrgDetails)
        const setColumns = columns.map(col => `${col} = ?`).join(', ')
        const values = Object.values(newOrgDetails)
        const sql = `
            UPDATE organization
            SET ${setColumns}
            WHERE id = ${orgId}`
        await query(sql, values)

        const sqlGetOrg = `
            SELECT * 
            FROM organization 
            WHERE id = ${orgId}`
        const selectedOrg = await query(sqlGetOrg)
        res.json(selectedOrg[0])
    })
}

