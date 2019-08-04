import * as chai from "chai";
/* tslint:disable no-import-side-effect */
import "mocha";
import * as request from "supertest";
import { initializeTest } from "./setup";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { app } from "../src/index";

const expect = chai.expect;

// Initialize the test with the firebase credentials
const test = initializeTest();

describe("check", async () => {
  before(() => {
    test.mockConfig({});
  });

  describe("GET /check", () => {
    it(`wrong method expect to return ${NOT_FOUND}`, async () => {
      await request(app)
        .get("/check")
        .expect(NOT_FOUND);
    });

    it(`no payload expect to return ${BAD_REQUEST}`, async () => {
      await request(app)
        .post("/check")
        .expect(BAD_REQUEST);
    });

    it(`referenceNumber empty expect to return ${BAD_REQUEST}`, async () => {
      const data = {
        nationality: "",
        passportNumber: "",
        dateOfBirth: "",
        referenceNumber: ""
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(BAD_REQUEST);

      expect(response.body).not.to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors[0]).to.be.eq(
      'child "referenceNumber" fails because ["referenceNumber" is not allowed to be empty]'
      );
    });

    it(`referenceNumber empty expect to return ${BAD_REQUEST}`, async () => {
      const data = {
        nationality: "CAN",
        passportNumber: "HN971476",
        referenceNumber: "",
        dateOfBirth: "1990-03-31"
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(BAD_REQUEST);

      expect(response.body).not.to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors[0]).to.be.eq(
      'child "referenceNumber" fails because ["referenceNumber" is not allowed to be empty]'
      );
    });

    it(`nationality empty expect to return ${BAD_REQUEST}`, async () => {
      const data = {
        nationality: "",
        passportNumber: "HN971476",
        referenceNumber: "80246096",
        dateOfBirth: "1990-03-31"
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(BAD_REQUEST);

      expect(response.body).not.to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors[0]).to.be.eq(
      'child "nationality" fails because ["nationality" is not allowed to be empty]'
      );
    });

    it(`passportNumber empty expect to return ${BAD_REQUEST}`, async () => {
      const data = {
        nationality: "CAN",
        passportNumber: "",
        referenceNumber: "80246096",
        dateOfBirth: "1990-03-31"
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(BAD_REQUEST);

      expect(response.body).not.to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors[0]).to.be.eq(
      'child "passportNumber" fails because ["passportNumber" is not allowed to be empty]'
      );
    });

    it(`dateOfBirth empty expect to return ${BAD_REQUEST}`, async () => {
      const data = {
        nationality: "CAN",
        passportNumber: "HN971476",
        referenceNumber: "80246096",
        dateOfBirth: ""
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(BAD_REQUEST);

      expect(response.body).not.to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors[0]).to.be.eq(
      'child "dateOfBirth" fails because ["dateOfBirth" is not allowed to be empty]'
      );
    });


    it(`successfull check with test payload ${OK}`, async () => {
      const data = {
        nationality: "CAN",
        passportNumber: "HN971476",
        referenceNumber: "80246096",
        dateOfBirth: "1990-03-31"
      }
      const response = await request(app)
        .post("/check")
        .send(data)
        .expect(OK);

      expect(response.body).not.to.be.null;
      expect(Object.keys(response.body)).to.have.length.greaterThan(0);
      expect(response.body.referenceNumber).not.to.be.null;
      expect(response.body.expiryDate).not.to.be.null;
      expect(response.body.numberOfEntries).not.to.be.null;
      expect(response.body.visaCondition).not.to.be.null;
      expect(response.body.referenceNumber).to.be.eq("80246096");
      expect(response.body.expiryDate).to.be.eq("2020-08-03");
      expect(response.body.numberOfEntries).to.be.eq("3 months");
      expect(response.body.visaCondition).to.be.eq("NO_WORK");
    });
  });
});
