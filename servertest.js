

add to all the request headers -
fieldname: Origin - https://localhost:3443 


(1) /users
(a) get (admin only)

req - null
res - (examples)
[
    {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    {
        "firstname": "",
        "lastname": "",
        "admin": false,
        "teacher": false,
        "aaa": false,
        "dateofbirth": null,
        "bio": "",
        "image": "",
        "email": "",
        "_id": null,
        "__v": 0,
        "createdAt": "2020-05-01T21:51:43.005Z",
        "updatedAt": "2020-05-01T21:52:34.007Z"
    },
    {
        "firstname": "haye",
        "lastname": "lalla",
        "admin": false,
        "teacher": false,
        "aaa": false,
        "dateofbirth": null,
        "bio": "",
        "image": "",
        "email": "",
        "_id": "5eadb482b574eb4b28cdbb34",
        "username": "ishan",
        "createdAt": "2020-05-02T17:57:22.517Z",
        "updatedAt": "2020-05-02T17:57:22.522Z",
        "__v": 0
    }
]


(2) /users/signup 
(a) post (anyone)

req - {"username": "manisha", "password": "1999", "firstname": "manisha"} (these three are compulsory to fill else error will be returned)
res -  {"success":true,"status":"Registration Successful!"}


(3)  /users/login 
(a) post (verified users only/signed) 

req - {"username": "manisha", "password": "1999"}
res-  {"success":true,"status":"Login Successful!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFlMTE2Y2IyMDAzZDQ1YmM4NDlkZTQiLCJpYXQiOjE1ODg0NjYxNDUsImV4cCI6MTU4ODU1MjU0NX0.bMoJVdEgvCrvAZ-KkTQ6ZU5dxLvcOe-PKzkwJCmlU1E"}


(4) /index.html
(a) get (FB login page)(anyone)

here you have to find FB token from console and use it to generate jwt token,
by performing another request as follows:


(5) /users/facebook/token 
(a) get (anyone who used index.html/has facebook token)

req -  (Authorization header- Bearer <facebook token>)
res - {"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFlMTUzZmIyMDAzZDQ1YmM4NDlkZTUiLCJpYXQiOjE1ODg0NjcwMDcsImV4cCI6MTU4ODU1MzQwN30.GJ2O6mhX93qww-Xahk5YGri1sDzTd1CUigUzTf07aDo","status":"You are successfully logged in!"}

(6) /users/checkJWTToken 
(a) get (verified users)

req- header(Authorization (fieldname) - bearer <jwt token>)
res- 
if valid
{
    "status": "JWT valid!",
    "success": true,
    "user": {
        "firstname": "Ishan",
        "lastname": "Agrawal",
        "admin": false,
        "teacher": false,
        "aaa": false,
        "dateofbirth": null,
        "bio": "",
        "image": "",
        "email": "",
        "_id": "5eae153fb2003d45bc849de5",
        "username": "Ishan Agrawal",
        "facebookId": "2593677810844392",
        "createdAt": "2020-05-03T00:50:07.241Z",
        "updatedAt": "2020-05-03T00:50:07.241Z",
        "__v": 0
    }
}

if not -
{
    "status": "JWT invalid!",
    "success": false,
    "err": {
        "name": "JsonWebTokenError",
        "message": "jwt malformed"
    }
}


(7) /users/updateProfile 
(a) put (verified user only)

req - 
header(Authorization (fieldname) - bearer <jwt token>)
body({"firstname":"jaya", "lastname": "kumari"})(anything except username and password)

res- 
{
    "firstname": "jaya",
    "lastname": "kumari",
    "admin": false,
    "teacher": false,
    "aaa": false,
    "dateofbirth": null,
    "bio": "",
    "image": "",
    "email": "",
    "_id": "5eae116cb2003d45bc849de4",
    "username": "manisha",
    "createdAt": "2020-05-03T00:33:48.233Z",
    "updatedAt": "2020-05-03T01:05:08.330Z",
    "__v": 0
}


(8) /users/uploadProfile

(a) post (verified user only)

req - 
header(Authorization (fieldname) - bearer <jwt token>)
body(multi form-data, fieldname - imageFile , (attach photo))

res - 
{
    "fieldname": "imageFile",
    "originalname": "alberto.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "public/images",
    "filename": "Ishan Agrawal_1588468388522_alberto.png",
    "path": "public\\images\\Ishan Agrawal_1588468388522_alberto.png",
    "size": 25079
}
(also the path to its directory is saved in Users info as "image")


(9) /noticeBoard 

(a) get (verified users)

res - header(Authorization (fieldname) - bearer <jwt token>)
req - 
[
    {
        "_id": "5eadb399b574eb4b28cdbb33",
        "filePath": "",
        "fileType": "",
        "message": "aefgrgagradfargagsthtshfgsrvsvsrrgrgrgr",
        "title": "aaaabbbbaaa",
        "author": {
            "firstname": "nauki",
            "lastname": "1999",
            "admin": true,
            "teacher": true,
            "aaa": false,
            "dateofbirth": "1999-10-10T18:30:00.000Z",
            "bio": "hello guys",
            "image": "public/images/nauki_1588381075148_logo.png",
            "email": "",
            "_id": "5eac94db0120923b882c2277",
            "username": "nauki",
            "createdAt": "2020-05-01T21:30:03.961Z",
            "updatedAt": "2020-05-02T00:57:55.156Z",
            "__v": 0
        },
        "createdAt": "2020-05-02T17:53:29.498Z",
        "updatedAt": "2020-05-02T17:54:34.470Z",
        "__v": 0
    }
]

(b) post (verified admin||aaa||teacher)

req - header(Authorization (fieldname) - bearer <jwt token>)
body {"title": "Wow","message":"hello"} (only title is compulsory)
res - 
{
    "_id": "5eae1ceab2003d45bc849de6",
    "title": "Wow",
    "message": "hello",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:22:50.598Z",
    "updatedAt": "2020-05-03T01:22:50.598Z",
    "__v": 0
}

(c) delete (verified admin only as it deletes all the notices)

req - header(Authorization (fieldname) - bearer <jwt token>)
res - 
{
    "n": 2,
    "ok": 1,
    "deletedCount": 2
}


(10) /noticeBoard/noticeFiles/:noticeId (use to upload files of notice) 

(a) post (verified admin||aaa||teaacher)

req - header(Authorization (fieldname) - bearer <jwt token>)
body - format type - multi form-data 
fieldname : myFiles - attach file(1)
again fieldname :myFiles -attach file(2)... and so on 1 file can only be attached per fieldname

res - 
[
    {
        "fieldname": "myFiles",
        "originalname": "alberto.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "public/noticeFiles",
        "filename": "nauki1588469706762alberto.png",
        "path": "public\\noticeFiles\\nauki1588469706762alberto.png",
        "size": 25079
    }
]
also filePath and fileType are saved in NoticeFile model along with notice id as different objects 
as -
{
    "_id" : ObjectId("5eadf544ce6a134d8479faee"),
    "filePath" : "public/noticeFiles/nauki1588458820927zucchipakoda.png",
    "fileType" : "png",
    "notice" : ObjectId("5eadb399b574eb4b28cdbb33"),
    "createdAt" : ISODate("2020-05-02T22:33:40.936Z"),
    "updatedAt" : ISODate("2020-05-02T22:33:40.936Z"),
    "__v" : 0
}
{
    "_id" : ObjectId("5eadf544ce6a134d8479faef"),
    "filePath" : "public/noticeFiles/nauki1588458820929elaicheesecake.png",
    "fileType" : "png",
    "notice" : ObjectId("5eadb399b574eb4b28cdbb33"),
    "createdAt" : ISODate("2020-05-02T22:33:40.936Z"),
    "updatedAt" : ISODate("2020-05-02T22:33:40.936Z"),
    "__v" : 0
}
{
    "_id" : ObjectId("5eadf60f7840f823f0649a00"),
    "filePath" : "public/noticeFiles/nauki1588459022958zucchipakoda.png",
    "fileType" : "png",
    "notice" : ObjectId("5eadb399b574eb4b28cdbb33"),
    "createdAt" : ISODate("2020-05-02T22:37:03.017Z"),
    "updatedAt" : ISODate("2020-05-02T22:37:03.017Z"),
    "__v" : 0
}
{
    "_id" : ObjectId("5eadf6ff0c05fa28d09ccf40"),
    "filePath" : "public/noticeFiles/nauki1588459263324zucchipakoda.png",
    "fileType" : "png",
    "notice" : ObjectId("5eadb399b574eb4b28cdbb33"),
    "createdAt" : ISODate("2020-05-02T22:41:03.333Z"),
    "updatedAt" : ISODate("2020-05-02T22:41:03.333Z"),
    "__v" : 0
}
{
    "_id" : ObjectId("5eadf6ff0c05fa28d09ccf41"),
    "filePath" : "public/noticeFiles/nauki1588459263326elaicheesecake.png",
    "fileType" : "png",
    "notice" : ObjectId("5eadb399b574eb4b28cdbb33"),
    "createdAt" : ISODate("2020-05-02T22:41:03.334Z"),
    "updatedAt" : ISODate("2020-05-02T22:41:03.334Z"),
    "__v" : 0
}
{
    "_id" : ObjectId("5eae1fcab2003d45bc849de8"),
    "filePath" : "public/noticeFiles/nauki1588469706762alberto.png",
    "fileType" : "png",
    "notice" : ObjectId("5eae1f7db2003d45bc849de7"),
    "createdAt" : ISODate("2020-05-03T01:35:06.765Z"),
    "updatedAt" : ISODate("2020-05-03T01:35:06.765Z"),
    "__v" : 0
}


(11) /noticeBoard/:noticeId

(a) get (verified user only )

req - header(Authorization (fieldname) - bearer <jwt token>)
res - 
{
    "_id": "5eae1ceab2003d45bc849de6",
    "title": "Wow",
    "message": "hello",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:22:50.598Z",
    "updatedAt": "2020-05-03T01:22:50.598Z",
    "__v": 0
}

(b) put (verified admin||teacher||aaa) (also the person whose notice is that can only update it neither admin)

req - header(Authorization (fieldname) - bearer <jwt token>)
body - {"title": "Wow","message":"hello"}

res- 
{
    "_id": "5eae1ceab2003d45bc849de6",
    "title": "Wow",
    "message": "hello",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:22:50.598Z",
    "updatedAt": "2020-05-03T01:22:50.598Z",
    "__v": 0
}

(c) delete  (only varified admin||aaa||teacher) 

req - header(Authorization (fieldname) - bearer <jwt token>)

res - 
{
    "_id": "5eae1f7db2003d45bc849de7",
    "title": "hello",
    "message": "Wow",
    "author": "5eac94db0120923b882c2277",
    "createdAt": "2020-05-03T01:33:49.587Z",
    "updatedAt": "2020-05-03T01:33:49.587Z",
    "__v": 0
}

(12) /comments 

(a) get (verified users)

req - header(Authorization (fieldname) - bearer <jwt token>)

res - 
[
    {
        "_id": "5eadfbd62e775d5324adf06f",
        "comment": "fawefffarfrefrggrrearrgrerg",
        "author": {
            "firstname": "nauki",
            "lastname": "1999",
            "admin": true,
            "teacher": true,
            "aaa": false,
            "dateofbirth": "1999-10-10T18:30:00.000Z",
            "bio": "hello guys",
            "image": "public/images/nauki_1588381075148_logo.png",
            "email": "",
            "_id": "5eac94db0120923b882c2277",
            "username": "nauki",
            "createdAt": "2020-05-01T21:30:03.961Z",
            "updatedAt": "2020-05-02T00:57:55.156Z",
            "__v": 0
        },
        "createdAt": "2020-05-02T23:01:42.750Z",
        "updatedAt": "2020-05-02T23:01:42.750Z",
        "__v": 0
    },
    {
        "_id": "5eae055d2e775d5324adf070",
        "comment": "fawefffarfrefrggrrearrgrerg",
        "notice": "5eadb399b574eb4b28cdbb33",
        "author": {
            "firstname": "nauki",
            "lastname": "1999",
            "admin": true,
            "teacher": true,
            "aaa": false,
            "dateofbirth": "1999-10-10T18:30:00.000Z",
            "bio": "hello guys",
            "image": "public/images/nauki_1588381075148_logo.png",
            "email": "",
            "_id": "5eac94db0120923b882c2277",
            "username": "nauki",
            "createdAt": "2020-05-01T21:30:03.961Z",
            "updatedAt": "2020-05-02T00:57:55.156Z",
            "__v": 0
        },
        "createdAt": "2020-05-02T23:42:21.868Z",
        "updatedAt": "2020-05-02T23:42:21.868Z",
        "__v": 0
    }
]

(b) post (verified users)

req - header(Authorization (fieldname) - bearer <jwt token>)
body - {"comment": "balle balle", "notice": "gvgevvvdtt6tr63rt3f5667"}

res - 
{
    "_id": "5eae2482b2003d45bc849deb",
    "comment": "hello",
    "notice": "5eae2459b2003d45bc849de9",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:55:14.822Z",
    "updatedAt": "2020-05-03T01:55:14.822Z",
    "__v": 0
}

(c) delete  (verified admin only can delete all comment so be carefull)

req - header(Authorization (fieldname) - bearer <jwt token>)
res - 
{
    "n": 3,
    "ok": 1,
    "deletedCount": 3
}


(13) /comments/:commentId
(a) get (verified users)

req- header(Authorization (fieldname) - bearer <jwt token>)

res- 
{
    "_id": "5eae253ab2003d45bc849dec",
    "comment": "hello",
    "notice": "5eae2459b2003d45bc849de9",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:58:18.806Z",
    "updatedAt": "2020-05-03T01:58:18.806Z",
    "__v": 0
}

(b) put (verified users)

req -
header(Authorization (fieldname) - bearer <jwt token>)
body- {"comment": "balle balle", "notice": "gvgevvvdtt6tr63rt3f5667"}

res- 
{
    "_id": "5eae253ab2003d45bc849dec",
    "comment": "bye byeo",
    "notice": "5eae2459b2003d45bc849de9",
    "author": {
        "firstname": "nauki",
        "lastname": "1999",
        "admin": true,
        "teacher": true,
        "aaa": false,
        "dateofbirth": "1999-10-10T18:30:00.000Z",
        "bio": "hello guys",
        "image": "public/images/nauki_1588381075148_logo.png",
        "email": "",
        "_id": "5eac94db0120923b882c2277",
        "username": "nauki",
        "createdAt": "2020-05-01T21:30:03.961Z",
        "updatedAt": "2020-05-02T00:57:55.156Z",
        "__v": 0
    },
    "createdAt": "2020-05-03T01:58:18.806Z",
    "updatedAt": "2020-05-03T02:01:30.311Z",
    "__v": 0
}

(c) delete (verified users)

req - header(Authorization (fieldname) - bearer <jwt token>)

res - 
{
    "_id": "5eae253ab2003d45bc849dec",
    "comment": "bye byeo",
    "notice": "5eae2459b2003d45bc849de9",
    "author": "5eac94db0120923b882c2277",
    "createdAt": "2020-05-03T01:58:18.806Z",
    "updatedAt": "2020-05-03T02:01:30.311Z",
    "__v": 0
}







