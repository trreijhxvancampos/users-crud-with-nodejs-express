const {query} = require("../mysql");

module.exports = (router) => {
    router.get('/users', async (req, res) => {
        const sql = `
            SELECT
                user.id,
                user.first_name,
                user.last_name,
                user.birthday,
                user.age,
                organization.name AS organization_name 
            FROM user
            LEFT JOIN organization
            ON user.organization_id = organization.id`

        const allUsers = await query(sql)
        res.json(allUsers)
    })

    router.get('/user/:userId', async (req, res) => {
        const userId = req.params.userId
        const sql = `
            SELECT user.id, CONCAT(first_name, ' ', last_name) AS full_name, age, birthday 
            FROM user 
            WHERE id = ${userId}`
        const selectedUser = (await query(sql))[0]
        res.json(selectedUser)
    })

    router.post('/addUser', async (req, res) => {
        const newUser = req.body
        const columns = Object.keys(newUser).join(', ')
        const values = Object.values(newUser)
        const sql = `
            INSERT INTO user (${columns}) 
            VALUES (${values.map(() => '?').join(', ')})`
        await query(sql, values)

        const sqlGetUser = `
            SELECT id, CONCAT(first_name, ' ', last_name) AS full_name, age, birthday
            FROM user
            ORDER BY id DESC
            LIMIT 1`;
        const addedUser = (await query(sqlGetUser))[0]
        res.json(addedUser)

    })
    router.put('/updateUser/:userId', async (req, res) => {
        const newUserDetails = req.body
        const userId = req.params.userId
        const columns = Object.keys(newUserDetails)
        const setColumns = columns.map(col => `${col} = ?`).join(', ')
        const values = Object.values(newUserDetails)
        const sql = `
            UPDATE user
            SET ${setColumns}
            WHERE id = ${userId}`
        await query(sql, values)

        const sqlGetUser = `
            SELECT id, CONCAT(first_name, ' ', last_name) AS full_name, age, birthday 
            FROM user 
            WHERE id = ${userId}`
        const selectedUser = await query(sqlGetUser)
        res.json(selectedUser[0])
    })
}

