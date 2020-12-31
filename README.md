# Data-Store
File based key-value data store that supports CRUD operation
- [Project Description](#project-description)
 - [Goals](#goals)
 - [Tools and Libraries](#tools/libraries)


### Project Description
The goal of this project is to build a fie-based key-value data store that supports the bsic CRD operations.This data is meant to be used as local storage for one single process on one laptop.The data store is exposed as a library to clients that can instantiate a class and work with data store [.](url-link)


### Goals
  - [x] Instantiate a class based object of data store at a reasonable location in file system
  - [x] The key will be string and the value will always be a JSON object
  - [x] Values can be retrieved using key
  - [x] entries is deleted by passing key 
  - [x] A time to live property is implemented ,which periodicaly expires the entries of data store which results in, keys no longer available for deletion and read operation
  - [x] More than one client process is restricted to access the data at a given time using file locking .
  

### Tools/Libraries
1. [Node.js](#nodejs)
2. [Javascript](#Javascript)
3. [locks npm package](#locks)
4. [GIT](#git)


### About Me

- **Name**: Ayush Raj
- **Email**: ayushraj.bit17@gmail.com

