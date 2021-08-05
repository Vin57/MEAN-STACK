This project is based on Dyma authentication with JWT ==> https://dyma.fr/developer/chapters/advanced/5a80bb86783bbc37832b0f1d


MEAN stands for :

Mongo
Express
Angular
Node JS


# To make it work you have to

## 1. Create db user for express server in mongo container
```
> mongo
> use admin
> db.auth("root", "example")
> use MEAN
> db.createUser({user:"client", pwd: "client", roles:[{role: "readWrite", db: "MEAN"}]})
```

## 2. Generate rsa key for password encryption
``cd server/rsa && ssh-keygen -t rsa -P "" -b 4096 -m PEM -f key && ssh-keygen -e -m PEM -f key > key.pub``
