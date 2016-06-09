// var user = {
//   "id": 64209690,
//   "email": "jane.smith@gmail.com",
//   "zipCode": "60061-1224",
// };

var user = {
  "id": "us-east-1:85d22133-fd7a-4fce-a024-9f650232fc4d",
  "email": "chris.lam@blah.com",
  "allergens": ['seeds', 'milk']
};

var userSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://spokin.com/schemas/user.json#",
  "title": "User",
  "description": "User profile",
  "type": "object",
  "properties": {
    "id": {
      "type": ["string", "integer"],
      "pattern": "^[a-z\\-a-z\\-]+[0-9]\:[0-9a-z\\-]*$"
    },
    "name": {
      "type": "string",
      "maxLength": 128
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "zipCode": {
      "type": "string",
      "pattern": "^[0-9()\\-\\.\\s]+$"
    },
    "allergens": {
      "items": [{
        "type": "string",
        "enum": ["seeds", "peanuts", "milk"]
      }]
    }
  },
  "additionalProperties": false
};

var Ajv = require('ajv');
var ajv = Ajv({
  allErrors: true
});
var validate = ajv.compile(userSchema);
var valid = validate(user);
if (valid) {
  console.log('User data is valid');
} else {
  console.log('User data is INVALID!');
  console.log(validate.errors);
}