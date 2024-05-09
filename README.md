# express-service-handler

## About this package

This is a simple utility function for handling responses in a specific format from Express services.

## Usage

1. Install using "npm i express-service-handler".
2. Import the module into your code:

```javascript
import { handleServiceResponse } from "express-service-handler";
```

3. Use the function to handle your service response:

```javascript
import express from "express";
import { handleServiceResponse } from "express-service-handler";

const app = express();

app.get("/api/data", (req, res) => {
  // Assume getDataFromService is a function that fetches data from a service
  // and returns an object with the following structure:
  // { ok: boolean, status: number, reason: string, data: any }
  const result = getDataFromService();

  // Use handleServiceResponse to send the response
  handleServiceResponse({ res, result });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Parameters

The `handleServiceResponse` function takes an object with the following parameters:

- `res`: The response object from the Express.js route handler. This is used to send the response to the client.

- `result`: An object containing the result of the service operation. This object should have the following properties:

  - `ok`: A boolean indicating whether the operation was successful.
  - `status`: (Optional) A number representing the HTTP status code. If not provided, defaults to 200 for successful operations and 400 for unsuccessful ones.
  - `reason`: (Optional) A string providing more details in case of an unsuccessful operation.
  - `data`: (Optional) The data resulting from the operation, if any.

- `sendResponse`: (Optional) A boolean indicating whether to send the response immediately. If set to false, the function will return the result object without sending the response. Defaults to true.

## Version Notes

- Added handling of HTTP responses from remote services accessed via an Express API route

### Possible breaking changes in v2.0.0

- The function is now async; review how you're using it and adjust accordingly.

# License
Copyright Sean Patrick Wallace 2024

This package is free software. Please see LICENSE.md for further details.