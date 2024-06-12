const mongoose = require("mongoose");
// "mongodb://localhost/cb_subscription"
const dbConnection = async () => {
  // console.log(`${process.env.MONGODB_CONNECTION.replace("+srv", "")}`);
  try {
    const conexion = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION.replace("+srv", "")}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log("Conexion a la base de datos!!");
  } catch (error) {
    console.log(error);
    throw new Error("error al conectar con la base de datos!");
  }
};

module.exports = {
  dbConnection,
};
