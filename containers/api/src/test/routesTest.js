const chai = require("chai");
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.should();
chai.use(chaiHttp);

const Server = process.env.SERVER;
const Port = process.env.PORT;
const testPath = Server + ":" + Port;

describe("GET /api/subscription", () => {
  it("It should GET all the subscriber have property subscription and the value be equal to an array of objects", (done) => {
    chai
      .request(testPath)
      .get("/api/subscription")
      .end((err, response) => {
        if (err) {
          done(err);
        }
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("subscription").that.be.a("array");
        response.body.should.have.property("subscription");
        done();
      });
  });
  it("It should GET all the subscriber have all key's from the array of objects", (done) => {
    chai
      .request(testPath)
      .get("/api/subscription")
      .end((err, response) => {
        if (err) {
          done(err);
        }
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("subscription").that.be.a("array");
        response.body.should.have.property("subscription");
        response.body.should.have
          .property("subscription")
          .that.includes.all.keys([
            "traces",
            "_id",
            "name",
            "email",
            "address",
            "gender",
            "invitation",
            "amount",
            "code",
            "created_at",
            "updated_at",
            "__v",
          ]);
        done();
      });
  });
});

describe("GET /api/subscription/:_id", () => {
  it("It should GET a Subscription object with the _id requested", (done) => {
    const _id = "6266c6e1fddc9c0d60cc3f61";
    chai
      .request(testPath)
      .get("/api/subscription/" + _id)
      .end((err, response) => {
        if (err) {
          done(err);
        }

        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have
          .property("subscription")
          .that.includes.all.keys([
            "traces",
            "_id",
            "name",
            "email",
            "address",
            "gender",
            "invitation",
            "amount",
            "code",
            "created_at",
            "updated_at",
            "__v",
          ]);
        done();
      });
  });

  it("It should GET a Subscription object with the _id requested that have all property key's expected", (done) => {
    const _id = "6266c6e1fddc9c0d60cc3f61";
    chai
      .request(testPath)
      .get("/api/subscription/" + _id)
      .end((err, response) => {
        if (err) {
          done(err);
        }

        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have
          .property("subscription")
          .that.includes.all.keys([
            "traces",
            "_id",
            "name",
            "email",
            "address",
            "gender",
            "invitation",
            "amount",
            "code",
            "created_at",
            "updated_at",
            "__v",
          ]);
        done();
      });
  });
});

describe("Test Subscriber Endpoints with POST method ", () => {
  //Test Post a new Subscriber
  describe("POST /api/subscription with empty email", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "",
        address: "Manuel Montt 835",
        gender: "Mujer",
        code: "74Fs34",
      };
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }

          response.should.have.status(400);

          done();
        });
    });
  });
  describe("POST /api/subscription with null gender", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "ulaula@gmail.com",
        address: "Manuel Montt 835",
        gender: null,
        code: "74Fs34",
      };
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }

          response.should.have.status(400);

          done();
        });
    });
  });

  describe("POST /api/subscription with undefined code", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "ulaula@gmail.com",
        address: "Manuel Montt 835",
        gender: "Mujer",
        code: undefined,
      };
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }

          response.should.have.status(400);

          done();
        });
    });
  });

  describe("POST /api/subscription register with invitation code", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {
        name: "Francisco Javier Roa Valenzuela",
        email: "franroav@gmail.com",
      };
      chai
        .request(testPath)
        .post("/api/subscription/register")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }
          // to.be.an('array')
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("subscription");
          response.body.should.have.property("subscription").to.be.a("string");

          done();
        });
    });
  });

  describe("POST /api/subscription with empty object ", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {};
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }

          response.should.have.status(400);
          response.body.should.have.property("error");

          done();
        });
    });
  });

  describe("POST /api/subscription", () => {
    it("It should POST a new subscriber", (done) => {
      const sub = {
        name: "Maria Aulalia",
        email: "ulaula@gmail.com",
        address: "Manuel Montt 835",
        gender: "Mujer",
        code: "74Fs34",
      };
      chai
        .request(testPath)
        .post("/api/subscription")
        .send(sub)
        .end((err, response) => {
          if (err) {
            done(err);
          }

          response.should.have.status(200);

          response.body.should.have
            .property("subscription")
            .that.includes.all.keys([
              "traces",
              "_id",
              "name",
              "email",
              "address",
              "gender",
              "invitation",
              "amount",
              "code",
              "created_at",
              "updated_at",
              "__v",
            ]);

          done();
        });
    });
  });
});

describe("PUT /api/subscription/:id", () => {
  it("It should UPDATE a Subscription", (done) => {
    const _id = "6266c6e1fddc9c0d60cc3f61";
    const sub = {
      name: "Francisco Roa V.",
      email: "franroav@gmail.com",
      address: "Manuel Montt 8316",
    };
    chai
      .request(testPath)
      .delete("/api/subscription/" + _id)
      .send(sub)
      .end((err, response) => {
        if (err) {
          done(err);
        }

        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        response.body.should.have.property("message").that.be.a("string");
        done();
      });
  });
});

describe("DELETE /api/subscription/:id", () => {
  it("It should DELETE a Subscription", (done) => {
    const _id = "6269d332eb1e35132019437e";
    chai
      .request(testPath)
      .delete("/api/shop/" + shop)
      .end((err, response) => {
        if (err) {
          done(err);
        }

        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        response.body.should.have.property("message").that.be.a("string");
        done();
      });
  });
});
