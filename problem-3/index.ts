type Transaction = {
  id: number
  amount: number
  timestamp: string
}

type TransactionQueue = {
  payment: Transaction
  attemptCount: number
}

const payments: Transaction[] = [];
const paymentQueue: TransactionQueue[] = [];
const maxRetry = 6;

const retryDelays = [2, 5, 10, 20, 30, 60];

let processingQueue = false;

function generateRandomTransaction(): Transaction {
  const id = Math.floor(Math.random() * 1000);
  const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return {
    id,
    amount,
    timestamp: new Date().toISOString()
  };
}

// Generate a new transaction every second
setInterval(() => {
  const trx = generateRandomTransaction();
  payments.push(trx);
  console.log("New transaction added:", trx);
  enquePayment(trx, 0)
}, 1000);

// Add the transaction to the payment queue with a track of total attempts
// Start processing the queue if not processing already
function enquePayment(payment: Transaction, attemptCount = 0) {
  paymentQueue.push({payment, attemptCount});
  if (!processingQueue)
    processQueue();
}

// Starts processing the queue until the queue is empty
async function processQueue() {
  processingQueue = true;
  while (paymentQueue.length > 0) {
    const {payment, attemptCount} = paymentQueue.shift()!;
    await processPayment(payment, attemptCount)
  }

  processingQueue = false;
}

// Processes the payment
async function processPayment(payment: Transaction, attemptCount: number) {
  if (attemptCount === 0) {
    console.log("Handling Transaction: ", payment);
  } else {
    console.log("Retrying (", attemptCount, ") Transaction: ", payment);
  }

  await delay(500);

  const randomCheck = Math.floor(Math.random() * 1000);
  
  if (payment.id === randomCheck) {
    console.log("Payment is successful! trxId: ", payment.id);
    console.log("\n");
    return;
  } 
  
  const nextAttempt = attemptCount + 1;
  if (nextAttempt > maxRetry) {
    console.log(
      "Retry limit reached for trxId=", payment.id, ". Aborting payment!"
    );
    console.log("\n");
    return;
  }

  
  console.log("Connection failed. trxId: ", payment.id, "Retrying in ", retryDelays[attemptCount], " minutes");
  setTimeout(() => {
    enquePayment(payment , nextAttempt);
  }, retryDelays[attemptCount] * 60 * 1000);

  console.log("\n");
}


function delay(ms: number = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}