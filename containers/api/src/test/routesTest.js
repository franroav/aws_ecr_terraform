const chai = require("chai");
const chaiHttp = require("chai-http");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const expect = chai.expect;
chai.use(chaiHttp);

const testPath = `${process.env.SERVER}:${process.env.PORT}`; // Assumes SERVER and PORT are defined in your .env file

describe("Subscription API Tests", () => {
  // Test GET /api/subscription
  describe("GET /api/subscription", () => {
    it("should GET all the subscribers and the subscription should be an array", (done) => {
      chai
        .request(testPath)
        .get("/api/subscription")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.subscription).to.be.an("array");
          done();
        });
    });

    it("should GET all subscribers with expected keys", (done) => {
      chai
        .request(testPath)
        .get("/api/subscription")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.subscription).to.be.an("array");

          // Check each subscription object in the array for the expected keys
          res.body.subscription.forEach((sub) => {
            expect(sub).to.include.all.keys([
              "traces", "_id", "name", "email", "address", "gender", "invitation",
              "amount", "code", "created_at", "updated_at"
            ]);
          });
          done();
        });
    });
  });

  // Test GET /api/subscription/:id
  describe("GET /api/subscription/:id", () => {
    it("should GET a Subscription object with the requested _id", (done) => {
      const _id = "6266c6e1fddc9c0d60cc3f61"; // Replace with a valid _id from your database
    
      chai
        .request(testPath)
        .get(`/api/subscription/${_id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(200); // Check for 200 OK status
            expect(res.body).to.be.an("object");
            expect(res.body.subscription).to.include.all.keys([
              "traces", "_id", "name", "email", "address", "gender", "invitation",
              "amount", "code", "created_at", "updated_at"
            ]);
            done();
          }
        });
    });

    it("should return 404 Not Found for a non-existing _id", (done) => {
      const _id = "invalid_id"; // Replace with a non-existing _id
    
      chai
        .request(testPath)
        .get(`/api/subscription/${_id}`)
        .end((err, res) => {
          expect(res).to.have.status(404); // Check for 404 Not Found status
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Subscription not found");
          done();
        });
    });
  });

  // Test POST /api/subscription
  describe("POST /api/subscription", () => {
    it("should POST a new subscriber with valid data", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "ulaula@gmail.com",
        address: "Manuel Montt 835",
        gender: "Mujer",
        code: "74Fs34"
      };
    
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(200); // Check for 200 OK status
            expect(res.body).to.be.an("object");
            expect(res.body.subscription).to.include.all.keys([
              "traces", "_id", "name", "email", "address", "gender", "invitation",
              "amount", "code", "created_at", "updated_at"
            ]);
            done();
          }
        });
    });

    it("should return 400 Bad Request for missing data", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "ulaula@gmail.com",
        // Missing address and gender intentionally
      };
    
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, res) => {
          expect(res).to.have.status(400); // Check for 400 Bad Request status
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Error, Bad request");
          done();
        });
    });
  });

  // Test DELETE /api/subscription/:id
  describe("DELETE /api/subscription/:id", () => {
    it("should DELETE a Subscription", (done) => {
      const _id = "6269d332eb1e35132019437e"; // Replace with a valid _id from your database
    
      chai
        .request(testPath)
        .delete(`/api/subscription/${_id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(200); // Check for 200 OK status
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("Subscription successfully deleted");
            done();
          }
        });
    });

    it("should return 404 Not Found for deleting a non-existing Subscription", (done) => {
      const _id = "invalid_id"; // Replace with a non-existing _id
    
      chai
        .request(testPath)
        .delete(`/api/subscription/${_id}`)
        .end((err, res) => {
          expect(res).to.have.status(404); // Check for 404 Not Found status
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Error, Not Found: Subscription not found with id invalid_id");
          done();
        });
    });
  });
});