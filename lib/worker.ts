// worker.ts
import bankAccountQueue from "./bullqueue";

// Start the worker to listen for jobs
bankAccountQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully!`);
});

bankAccountQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
