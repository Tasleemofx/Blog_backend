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

- Route: /user/signup
- Method: POST
- Body: 
```
{ first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  password: "***********"
}
```

- Responses

Success
```
{
    message: 'new user successfully created',
    user: { first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  password: "***********"
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
### Create Blog

- Route: /api/createblog
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
        title, description, tags,
        read_count, reading_time, body
    }
```

- Responses

Success
```
{
   message: Blog successfully created
}
```
---

### Update a Blog's state from draft to published

-Route: /api/blog/:id/updatestate
-Method: PUT
- Header
    - Authorization: Bearer {token}
```
---
```
### Delete a single blog

-Route: /api/blog/:blogId
-Method: DELETE
-Header
    - Authorization: Bearer {token}


### Get All Published blogs

- Route: /api/publishedblogs
- Method: GET

- Responses

Success

### Get a single Published blogs

- Route: /api/publishedblog/:id
- Method: GET

- Responses

Success

### Get a list of owner's blogs by state

- Route: /api/myblogs/:state
- Method: GET
-Header 
    -Authorization: Bearer {token}

- Responses

Success

### Edit a single Blog

-Route: /api/blog/:id/"
Method: patch
-Header 
    -Authorization: Bearer {token}
- Responses

Success
```
{
    message: 'Blog updated successfully',
}
```

---



## Contributor
- Oladepo Tesleem