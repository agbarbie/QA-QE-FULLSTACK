const user = {
    id: "USER-123456",
    name: {
      first: "Alice",
      last: "Liddell",
    },
    email: "alice@example.com",
    address: {
      shipping: {
        street: "123 Rabbit Hole",
        city: "Wonderland",
        state: "Fantasy",
        postalCode: "12345",
        country: "WL",
      },
      billing: {
        street: "456 Mad Hatter Lane",
        city: "Tea Party",
        state: "Fantasy",
        postalCode: "67890",
        country: "WL",
      },
    },
    payment: {
      total: "100.00",
      currency: "USD",
      details: {
        subtotal: "75.00",
        tax: "15.00",
        shipping: "10.00",
      },
      transactions: [
        {
          id: "TXN-123",
          amount: "50.00",
          description: "Magic Potion",
        },
        { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" },
      ],
    },
  };
  
  // Destructuring
  const {
    id,
    name: { first, last },
    email,
    address: {
      shipping: { street: shippingStreet, city: shippingCity,state:shippingstate, postalCode:shippingpostalCode, country:shippingCountry },
      billing: { street: billingStreet, city: billingCity ,state:billingstate, postalCode:billingpostalCode, country:billingCountry},
    },
    payment: {
      total,
      currency,
      details: { subtotal, tax, shipping },
      transactions: [firstTransaction, secondTransaction],
    },
  } = user;
  console.log(first);
  console.log(last);
  console.log(email);
  
  console.log(shippingStreet);
  console.log(shippingCity);
  console.log(shippingstate)
  console.log(shippingpostalCode);
  console.log(shippingCountry);
  
  console.log(billingStreet);
  console.log(billingCity);
  console.log(billingstate)
  console.log(billingpostalCode);
  console.log(billingCountry);
  
  console.log(total);
  console.log(currency);
  console.log(subtotal);
  console.log(tax);
  console.log(shipping);
  
  console.log(firstTransaction);
  console.log(secondTransaction);
  console.log(firstTransaction.description);
  console.log(secondTransaction.amount);
  
  // Inject into the UI
  document.getElementById("personal-info").innerHTML = `
      <h2>${first} ${last}</h2>
      <p><strong>Email: ${email}</strong></p>
  `;
  
  document.getElementById("shipping-address").innerHTML = `
      <h3>Shipping Address</h3>
      <p><strong>Street:</strong> ${shippingStreet}</p> 
      <p><strong>City:</strong> ${shippingCity}</p>
      <p><strong>State:</strong> ${shippingstate}</p>
      <p><strong>Postal Code:</strong> ${shippingpostalCode}</p>
      <p><strong>Country:</strong> ${shippingCountry}</p>
  `;
  
  document.getElementById("billing-address").innerHTML = `
      <h3>Billing Address</h3>
      <p><strong>Street:</strong> ${billingStreet}</p>
      <p><strong>City:</strong> ${billingCity}</p>
      <p><strong>State:</strong> ${billingstate}</p>
      <p><strong>Postal Code:</strong> ${billingpostalCode}</p>
      <p><strong>Country:</strong> ${billingCountry}</p>
  `;
  
  // Display Transactions Using map()
  const transactions = user.payment.transactions
  const usertransactions = transactions.map(
      (tx) => `
          <li>
              <p><strong>Id: ${tx.id}</p>
              <p><strong>Amount:</strong> ${tx.amount}</p>
              <p><strong>Description:</strong>${tx.description}</p> 
          </li>
      `
    ).join('');
  const transactionsDiv = document.getElementById("transactions")
  transactionsDiv.innerHTML = `<h3>Transactions</h3>
  ${usertransactions}
  `;
  