# **koibanx-backend-challenge**

---

_Microservice whose purpose is to serve a challenge for a Backend Developer role at Koibanx._

## 🏁 Getting Started

### **🧾 Prerequisites**

- **[Node.js](https://nodejs.org/en/download/)** => v14 (v14.18.1 recommended)
- **[NPM](https://www.npmjs.com/get-npm)** => v6
- **[Docker](https://docs.docker.com/engine/install/)**
- **[Postman](https://www.postman.com/)**
- A `.env` =>

```
cp .env.example .env
```

### **🛠 Installing**

#### _**Authentication**_

To test the API you must use Basic Authentication in Postman or your HTTP client of choice.

```
username: test@koibanx.com
password: test123
```

If you have previously run this project it is likely that you had to delete your database before running it again, as the password for Basic Authentication changed since the initial commit of the project.

#### _**Dependencies**_

This project requires some dependencies therefore.

```
npm install
```

#### _**Database**_

You can prepare the docker container using the following command after downloading and installing the client:

```
docker run --name mongo -p 27017:27017 -d mongo
```

You can use the seed command to add testing data to the database

```
node ace db:seed
```

Running project

```
npm run start
```

Running project while listening for changes

```
npm run dev
```

### **🧑‍🔬 Running the tests**

To execute all tests, run:

```
npm run test
```

To test the API you can import the following cURLs into your HTTP client of choice:

##### Get Stores

```
curl --location --request GET 'localhost:3000/api/stores/?page=1&limit=10' \
--header 'Authorization: Basic dGVzdEBrb2liYW54LmNvbTp0ZXN0MTIz'
```

##### Create a New Store

```
curl --location --request POST 'localhost:3000/api/stores/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic dGVzdEBrb2liYW54LmNvbTp0ZXN0MTIz' \
--data-raw '{
    "name": "Test Store Three",
    "cuit": "TestCUIT",
    "concepts": [
        {
            "id": 1,
            "name": "Concept One"
        },
        {
            "id": 4,
            "name": "Concept Four"
        },
        {
            "id": 5,
            "name": "Concept Five"
        },
        {
            "id": 2,
            "name": "Concept Two"
        },
        {
            "id": 3,
            "name": "Concept Three"
        }
    ],
    "currentBalance": 100000,
    "active": true,
    "lastSale": "2022-09-03"
}'
```

---

## ⚙️ Built With

- **[Express.js](https://expressjs.com/)** _Backend framework_
- **[Mongoose](https://mongoosejs.com/)** _Non-relational database_
- **[Babel](https://babeljs.io/)** _JavaScript compiler_
- **[Mocha](https://mochajs.org/)** _JavaScript teste framework_
- **[Chai](https://www.chaijs.com/)** _BDD/TDD assertion library for node_

##### Considerations

We use Babel.js to be able to use Modern JavaScript functionalities such as Decorators.

---

## 🧬 Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [commits on this repository](https://github.com/stephencatano) and filter tags with "all branches" option.

---

## 💬 Contact

- **Stephen Cataño**
  - _Backend Developer_
  - **[LinkedIn Profile](https://www.linkedin.com/in/stephen-catano/)**