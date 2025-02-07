//1. Password Verification

import bcrypt from "bcrypt"
async function verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
  }
  
  //2.MFA Verification
  function verifyMFA(inputMfaCode, correctMfaCode) {
    return inputMfaCode === correctMfaCode;
  }
  
  //3. Balance Check
  function checkBalance(balance, withdrawalAmount) {
    return balance >= withdrawalAmount;
  }
  //4. Daily Limit Check
  function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
  }

  //5. Process Withdrawal
  async function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount) {
    // 5.1. Verify Password
    if (!await verifyPassword(inputPassword, user.hashedPassword)) {
      return "Transaction Failed: Incorrect password.";
    }
    // 5.2. Verify MFA
    if (!verifyMFA(inputMfaCode, user.correctMfaCode)) {
      return "Transaction Failed: MFA failed.";
    }
   //5.3 Check Balance
    if (!checkBalance(user.balance, withdrawalAmount)) {
      return "Transaction Failed: Insufficient balance.";
    }
   //5.4 Check Daily Limit
    if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) {
      return "Transaction Failed: Amount exceeds daily limit.";
    }

  // 5.5. Deduct Withdrawal Amount and Return Success Message
    user.balance -= withdrawalAmount;
    return "Transaction Successful! New Balance: " + user.balance;
  }
  
  async function testWithdrawal() {
    const user = {
      hashedPassword: await bcrypt.hash("correctPassword", 10),
      correctMfaCode: "123456",
      balance: 1000,
      dailyLimit: 500,
    };
  
    const inputPassword = "correctPassword";
    const inputMfaCode = "123456";
    const withdrawalAmount = 300;
  
    const result = await processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount);
    console.log(result);
  
  
  // Challenge Questions 
  
  /*
  1. Password Authentication:
     • Why is it important to store passwords in a hashed format? What security advantage does this provide over plain text passwords?
  
     Answer: Hashing passwords protects them from being easily recovered if the database is compromised.  Hashing is a one-way function; you can't get the original password back from the hash. If a hacker steals the database, they only get the hashes, not the actual passwords.  Salting (adding a random string to the password before hashing) further enhances security by making rainbow table attacks less effective.
  
  2. Multi-Factor Authentication (MFA):
     • How does implementing MFA enhance the security of the transaction process? What types of attacks does it help prevent?
  
     Answer: MFA adds an extra layer of security beyond just a password. Even if a hacker manages to steal a password, they would still need access to the user's second factor (e.g., their phone for an MFA code) to complete a transaction.  This helps prevent phishing attacks, credential stuffing, and other attacks where the attacker steals or guesses the user's password.
  
  3. Balance Verification:
     • Why is it necessary to check the account balance before allowing a withdrawal? What risks are involved if this step is skipped?
  
     Answer: Checking the balance prevents overdrafts and ensures that users only withdraw funds they actually have. If this step is skipped, users could potentially withdraw more money than they have in their account, leading to financial losses for the bank and the user.
  
  4. Daily Transaction Limit:
     • What purpose does the daily transaction limit serve? How does it help in preventing fraudulent or excessive withdrawals?
  
     Answer: Daily transaction limits help to limit the potential damage from a compromised account. If a hacker gains access to an account, they can't withdraw unlimited funds in a single day. It also helps to prevent accidental or impulsive excessive withdrawals by the account holder themselves.
  
  5. Improvement:
     • If you were to add extra features, such as fraud detection (e.g., detecting abnormal withdrawal patterns), how would you go about doing this? What additional data would you track to detect fraud?
  
     Answer: To add fraud detection, you would need to track withdrawal history for each user, including amounts, times, locations, and possibly even devices used.  You could then use machine learning algorithms or rule-based systems to identify abnormal patterns, such as unusually large withdrawals, withdrawals from unusual locations, or a sudden increase in withdrawal frequency.  Additional data to track might include IP addresses, geolocation data, device fingerprints, and user behavior patterns (e.g., typical withdrawal times and amounts).  If the system detects a suspicious withdrawal, it could trigger an alert or require additional verification from the user.
  */
  }
  
  testWithdrawal();