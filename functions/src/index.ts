import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from 'body-parser';
export const app = express();
// Automatically allow cross-origin requests
//app.use(cors({ origin: true }));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "JSON" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
  // TODO: implement me
 //console.log(req.body);
 let  message = "Hi Neeraj";
if(req.body === undefined || Object.keys(req.body).length === 0){
    message = "Bad Request";
    res.status(400);
    res.send(message)
  }
else if(req.body !== undefined){
    if(req.body.passportNumber === undefined || req.body.dateOfBirth === undefined || req.body.referenceNumber === undefined){
      message = "Bad Request";
      res.status(400);
      res.send(message)
    } else if(req.body.referenceNumber.length === 0){
      const error_text = {errors : ['child "referenceNumber" fails because ["referenceNumber" is not allowed to be empty]']};
      message = "Bad Request";
      res.status(400);
      res.json(error_text)
    } else if(req.body.nationality.length === 0){
      const error_text = {errors : ['child "nationality" fails because ["nationality" is not allowed to be empty]']};
      message = "Bad Request";
      res.status(400);
      res.json(error_text)
    } else if(req.body.passportNumber.length === 0){
      const error_text = {errors : ['child "passportNumber" fails because ["passportNumber" is not allowed to be empty]']};
      message = "Bad Request";
      res.status(400);
      res.json(error_text)
    } else if(req.body.dateOfBirth.length === 0){
      const error_text = {errors : ['child "dateOfBirth" fails because ["dateOfBirth" is not allowed to be empty]']};
      message = "Bad Request";
      res.status(400);
      res.json(error_text)
    } else{
      const data = { referenceNumber: "80246096",
        expiryDate: "2020-08-03",
        numberOfEntries: "3 months",
        visaCondition: "NO_WORK"};
      res.json(data);
    }

  } else {
    res.send(message) 
  }

;
});

export const api = functions.https.onRequest(app);
