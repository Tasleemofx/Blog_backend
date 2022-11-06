# Pizza App
This is an api for a a blogging website

---

## Requirements
1. Users must have a first_name, last_name, email, password when signing up
2. JWT token expires after 1 hour
3. A blog can only be in two states; draft and published
4. Logged in and not logged in users should be able to get a list of published blogs created
5. Logged in and not logged in users should be able to to get a published blog
6. Logged in users should be able to create a blog.
7. Blog is created qutomatically in draft state
8. The owner of the blog is able to update the state of the blog to published
9. The owner of a blog is able to edit the blog in draft or published state
10. The owner of the blog can delete the blog in draft or published state
11. The owner of the blog can get a list of their blogs. 
The endpoint is paginated
It should be filterable by state
Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
default it to 20 blogs per page. 
It should also be searchable by author, title and tags.
It should also be orderable by read_count, reading_time and timestamp
When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
Come up with any algorithm for calculating the reading_time of the blog.
Write tests for all endpoints

---
## Setup
- pull this repo
- npm install (installs all dependencies)
- update env21i
- run `npm run dev`

---
## Base URL
- heroku.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name |  string |  required |
|  last_name | string  |  required|
|  email  |  string |  required  |
|  password |   string | required |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description |  string |  required |
|  tags | array  |  optional|
|  author  |  string |  default: User.fullname |
|  timestamp     | date  |  optional |
|  state |   string |  enum: ["draft", "published"]  |
|  readCount |  number |  default:0 |
|  reading_time |  string |  required |
|  body |  string |  required |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create Order

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---
### Get Order

- Route: /orders/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

### Get Orders

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

...

## Contributor
- Oladepo Tesleem