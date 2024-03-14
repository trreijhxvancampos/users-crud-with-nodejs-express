# Node JS - Express API Exercise

Perform **CREATE**, **READ**, **UPDATE** interactions on mysql database with user table and organization table.

## User Routes

|Request Method|Route|Description|Request Body|Response|
|----------------|-------------------------------|-----------------------------|-|-|
|GET|`'/users'`|return array of objects|none|`[{"id": 1,"first_name": "John","last_name": "Doe","birthday": "1994-12-31T16:00:00.000Z","age": 29,"organization_name": "organization 1"}, ...]`|
|GET|`'/user/:userId'`|return object RES { id, fullname, age, birthday } |none|`{"id": 1,"full_name": "John Doe","age": 29,"birthday": "2001-05-31T16:00:00.000Z"}`|
|POST|`'/addUser'`|create user; return object { id, fullname, age, birthday } |`{"first_name":"John","last_name":"Doe", "organization_id":1, "birthday": "1995-01-01"}`|`{"id":24,"full_name":"John Doe","age":29,"birthday":"1994-12-31T16:00:00.000Z"}`|
|PUT|`'/updateUser/:userId'`|update user by id; return object { id, fullname, age, birthday }|`{"first_name" : "John","last_name":"Doent want none unless you got buns hun"}`|`{"id": 15,"full_name": "John Doent want none unless you got buns hun","age": 29,"birthday": "1994-12-31T16:00:00.000Z"}`|

## Organization Routes

|Request Method|Route|Description|Request Body|Response|
|----------------|-------------------------------|-----------------------------|-|-|
|GET|`'/orgs'`|return array of objects|none|`[{"id":1,"name":"updated org"}, ...`|
|GET|`'/org/:orgId'`|return array of objects|none|`[{"id":1,"name":"organization 1"}]`|
|POST|`'/addOrg'`|create organization; return object |`{"name": "new organization"}`|`{"id":4,"name":"new organization"}`|
|PUT|`'/updateOrg/:orgrId'`|update org by id; return object|`{"name":"updated org"}`|`{"id":4,"name":"updated org"}`|