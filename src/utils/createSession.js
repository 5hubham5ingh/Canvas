//Helper function to create session
const createSession = (account, keepLoggedIn = false) => {
  //Create session
  // Get the current time
  const currentTime = new Date();

  // Calculate the expiration time by adding one hour or one day to the current time
  const expirationTime = keepLoggedIn
    ? new Date(currentTime.getTime() + 24 * 60 * 60 * 1000) // Adding 1 day in milliseconds.
    : new Date(currentTime.getTime() + 30 * 60 * 1000); // Adding 30 minutes in milliseconds

  // Convert the expiration time to the appropriate format (GMT string)
  const expirationString = expirationTime.toUTCString();

  // Set the cookie with the expires attribute
  document.cookie = `accountName=${account.accountName}; expires=${expirationString}; path=/`;

  // Store the session token in session storage
  sessionStorage.setItem(account.accountName, JSON.stringify(account));
};

export default createSession;
