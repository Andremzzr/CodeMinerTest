## Project made with Nodejs(express), MongoDb(mongoose ORM):
* To run this project I recommend using nodemon
* ``` npm install ```
* ``` node src/app.js ```
<br>

## .env variables:
```
MONGO_URI
```

## Pilot routes [/pilot]: 
```
/profile/[pilotId]
/contract/[contractId]/[pilotId]
/travel/[pilotId]/[planet]
/fuel/[pilotId]
/creat
```

## Contract routes [/contract]: 
```
/
/create
/finish/[pilotId]/[contractId]
/deliver/[pilotId]/[contractId]
```


## Federation routes [/federation]
```
/transactions
```

## Ship routes [/ship]
```
/create/[pilotId]
```