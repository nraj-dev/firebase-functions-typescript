> This readme reflects the final Readme of the implemented, working service. Something you would expect to see from an existing service in production.
> 
> If you find it necessary, feel free to make edits.

## Specification Australia eTA Checker 🦘
A serverside RESTful API to check the validity of an Australian eVisa

Url of the Checker for local testing:
```
http://localhost:5000/[your-project]/us-central1/check
```

### Request an eTA check
```
POST http://localhost:5000/[your-project]/us-central1/api/check
```
### Payload
```javascript/json
{
  "nationality": "CAN",
  "passportNumber": "HN971476",
  "referenceNumber": "80246096",
  "dateOfBirth": "1990-03-31"
}
```

### Response 200 OK
```javascript/json
{
  "referenceNumber": "80246096",
  "expiryDate": "2020-08-03",
  "numberOfEntries": "3 months",
  "visaCondition": "NO_WORK"
}
```