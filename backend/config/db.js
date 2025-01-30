import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não está definido no arquivo .env");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
