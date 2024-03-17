
#  The documentation of the API

  

## How to use the authentication API

  

* the provided functionalties are:

-signin

-signup

-google

-signout

  

* Exploiting the API:

	- First, send a fetch request to:

		`/api/auth/{the functionality you want}`

	- If you wish to use the "signin", "signup" or "google", you need to send a POST request, if you want to use the "signout", send a GET request.

	- The request body for the sign up and google functions should be in this format:

		```
		{
		username,
		email,
		password,
		photo
		} 
		```
	- The "signin" functionality has the format:
		 ```
		{
		email,
		password,
		} 
		```