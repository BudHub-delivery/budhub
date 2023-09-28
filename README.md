  # BudHub

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  This application is intended to be used to Order Cannabis from Dispencaries.

  ## Table of Contents 
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  1. Install .NET 7 https://dotnet.microsoft.com/en-us/download/dotnet/7.0
  2. Clone the data from this git repository 
  3. Install EFCore Tool Globally on your system
    `dotnet tool install --global dotnet-ef`
  4. Install and Configure PostgreSQL https://www.postgresql.org/download/installer/
  5. Rename `appsettings.Secrets.json.EXAMPLE` to `appsettings.Secrets.json` and configure with your DB Credentials
  6. `cd budhub/`
  7. Install project dependencies with `dotnet restore`
  8. Run the dev build with `dotnet watch run`
  9. Drop the database in case it exists: `dotnet ef database drop`
  10. Build the Database with `dotnet ef database update`
  11. Use Postman POST Request to `http://localhost:5000/api/auth/register` with this test user:
    ```
    {
        "firstName":"Bugs",
        "lastName":"Bunny",
        "email":"bugs@acme.com",
        "password":"Password1!",
        "confirm":"Password1!"
    }
    ```
  
  ## Usage
  This application is intended to be used to Order Cannabis from Dispencaries.
            
  ## Credits
  No Credits Applicable

  ## License
  ### MIT License

  Copyright (c) 2021 Nathaniel Ehrlich, Joshua Wise

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  ## Tests
  For testing please follow the install instructions and test using all Licenses.

  ## Questions
  If you have any additional questions or would like to reach out for more information, please email me via [remindr.notification@gmail.com](mailto:nwehrlich@gmail.com?subject=[GitHub]).