'use strict';

let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();
let request = require('request');
const api = require('../api');

const tableName = "RNAUTH_Users";

const filterInvalidAttr = (data) => { //filter empty string, object, undefined, null, etc
  let result = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "boolean" || typeof data[key] === "number" ||
        (typeof data[key] === "string" && data[key].length > 0 )) {
      result[key] = data[key];
    }
  });
  return result;
};

const handleRead = (event, context, callback) => {
  console.log("handleRead start");
  const queryStringParameters = event.queryStringParameters;
  let params = {
    TableName: tableName,
    Key: {
      id: queryStringParameters.id
    },
  };
  
  docClient.get(params, (err, data) => {
    if (err) {
      console.error("Unable to get item. Error JSON:", JSON.stringify(err), err.stack);
      callback(err);
    }
    let user = data.Item;
    console.log("Read user success", user);
    if (!user) callback(new Error("user not found"));
    
    let response = {
      statusCode: 200,
      headers: {"Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(user),
    };
    callback(null, response);
    // console.log("GetItem succeeded:", JSON.stringify(item));
    // callback(null, user);
  });
};

const handleCreate = (event, context, callback) => {
  console.log("handleCreate start");
  // console.log("event.body", event.body);
  const userRaw = JSON.parse(event.body);
  const user = api.filterInvalidAttr(userRaw);
  console.log("user", user);
  
  const params = {
    TableName: tableName,
    Item: user,
  };
  
  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err), err.stack);
      callback(err);
    } else {
      console.log("User added successfully");
      let response = {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(user),
      };
      callback(null, response);
    }
  });
};

const handleDelete = (event, context, callback) => {
  console.log("handleDelete start");
  const userId = JSON.parse(event.body).id;
  
  const params = {
    TableName: tableName,
    Key: {
      id: userId,
    },
    ReturnValues: "ALL_OLD",
  };
  
  docClient.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("data", data);
      console.log("Object.keys(data)", Object.keys(data));
      if (Object.keys(data).length === 0) {
        callback(new Error("The item doesn't exist"));
        return;
      }
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      let response = {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({msg: `handleDelete finished for userId ${userId}`}),
      };
      callback(null, response);
    }
  });
};

const handleUpdate = (event, context, callback) => {
  console.log("handleUpdate start");
  
  const userRaw = JSON.parse(event.body);
  const user = api.filterInvalidAttr(userRaw);
  console.log("user", user);
  
  const params = {
    TableName: tableName,
    Item: user,
  };
  
  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err), err.stack);
      callback(err);
    } else {
      console.log("User updated successfully");
      let response = {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(user),
      };
      callback(null, response);
    }
  });
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

module.exports = main;