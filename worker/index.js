const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

const fib = index => {
  if (index < 2) return 1;

  return fib(index - 1) + fib(index - 2);
};

// message = index
sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message))); // add to values (hash set): index and calculated fib at that index
});
sub.subscribe("insert"); // on insert event, do the above
