'use strict';

let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();
let request = require('request');

const handleRead = (event, context, callback) => {
  console.log("handleRead start");
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify({msg: "handleRead start"}),
  };
  callback(null, response);
};

const handleCreate = (event, context, callback) => {
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "RNAUTH_Users",
      // Item: fullUser,
    };
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        console.log("User added successfully");
        resolve(fullUser);
      }
    });
  })
  
  console.log("handleCreate start");
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify({msg: "handleCreate start"}),
  };
  callback(null, response);
};
const handleDelete = (event, context, callback) => {
  console.log("handleDelete start");
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify({msg: "handleDelete start"}),
  };
  callback(null, response);
};
const handleUpdate = (event, context, callback) => {
  console.log("handleUpdate start");
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify({msg: "handleUpdate start"}),
  };
  callback(null, response);
};

const main = (event, context, callback) => {
  // console.log("event", JSON.stringify(event));
  // console.log("context", JSON.stringify(context));
  // console.log("event.path visited:", event.path);
  
  switch (event.httpMethod) {
    case "GET":
      handleRead(event, context, callback);
      break;
    case "POST":
      handleCreate(event, context, callback);
      break;
    case "DELETE":
      handleDelete(event, context, callback);
      break;
    case "PUT":
      handleUpdate(event, context, callback);
      break;
  }
};

module.exports  = main;