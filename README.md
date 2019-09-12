server : http:localhost:3000

### register user
### POST /users/register
body        : email, password
code        : 201
response    :
{
    "user": {
        "favorites": [],
        "_id": "5d7a1d5eeec1ee20a256037a",
        "email": "tatag@mail.com",
        "password": "$2a$10$HAAKQi83yQN5LqzQRb/Bs.bfJsEU0s/ofbtVGx/2DV91hpmlAAm0S",
        "__v": 0
    }
}

### login user
### POST /users/login
body        : email, password
code        : 200
response    :
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdhMWJhMGY5OTIwNjIwMTQwZjRjNjIiLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1NjgyODM1NTV9.gKwaGf2E4zWCIgnqZTveGIpTZMFCOsP2bDlM_jBsKa0"
}

### get all images from db
### GET /images
body        : 
headers     : token
code        : 200
[
    {
        "_id": "5d7a1c8c34d2722084d4a54b",
        "title": "first upload",
        "url": "www google com",
        "userId": "5d7a1ba0f9920620140f4c62",
        "__v": 0
    },
    {
        "_id": "5d7a1d41eec1ee20a2560379",
        "title": "first upload",
        "url": "www google com",
        "userId": "5d7a1ba0f9920620140f4c62",
        "__v": 0
    }
]

### upload an images to db
### POST /images
body        : title, url
headers     : token
code        : 201
response    : 
{
    "_id": "5d7a1d41eec1ee20a2560379",
    "title": "first upload",
    "url": "www google com",
    "userId": "5d7a1ba0f9920620140f4c62",
    "__v": 0
}

### get single image from db
### GET /images/:id
body        : 
headers     : token
code        : 200
response    : 
{
    "_id": "5d7a1c8c34d2722084d4a54b",
    "title": "first upload",
    "url": "www google com",
    "userId": "5d7a1ba0f9920620140f4c62",
    "__v": 0
}

### delete single image from db
### DELETE /images/:id
body        : 
headers     : token
code        : 200
response    : 
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}

### favorite an image
### POST /favorites/:id
body        : 
headers     : token
code        : 201
response    : 
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}

### unfav an images
### DELETE /favorites/:id
body        : 
headers     : token
code        : 200
response    : 
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}