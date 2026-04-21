import server from "./server";
import redis from "./db/client";

const PORT = process.env.PORT || 4000;

redis
  .connect()
  .then((r) => {
    // Test the Redis connection by sending a ping command
    r.ping()
      .then((pong) => {
        console.log("Redis ping response:", pong);
      })
      .catch((error) => {
        console.error("Failed to ping Redis:", error);
      });

    console.log("Connected to Redis");

    // Start the server after successful Redis connection
    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} 🚀 || http://localhost:${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to Redis:", error);
  });
