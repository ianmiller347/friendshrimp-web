import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';
dotenv.config();

// AWS setup
const client = new DynamoDBClient({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = 'friendshrimp_active-shrimps';

const getActiveUserData = (user) => {
  // query for user.active and return null if not found
  // if getUserById(user.id).active, return user
  console.log('user', user);
  return null;
};

// add user to the table
export const addUser = async (user) => {
  // early return if user already exists
  const currentlyActiveUserData = getActiveUserData(user);
  if (currentlyActiveUserData) {
    return currentlyActiveUserData;
  }

  const params = {
    TableName: tableName,
    Item: {
      id: user.id,
      username_id: `_${user.id}`,
      displayName: user.displayName,
      statusDisplay: user.statusDisplay ?? 'just joined',
    },
  };

  const command = new PutCommand(params);

  try {
    await ddbDocClient.send(command);
  } catch (error) {
    const errorMessage = 'Unable to create item in DynamoDB.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// update user
export const updateUser = async (user) => {
  const usernameId = `_${user.id}`;
  const params = {
    TableName: tableName,
    Key: {
      username_id: usernameId,
    },
    ConditionExpression: 'username_id = :userIdVal',
    UpdateExpression: 'set statusDisplay = :val',
    ExpressionAttributeValues: {
      ':val': user.statusDisplay,
      ':userIdVal': usernameId,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  const input = new UpdateCommand(params);

  try {
    await ddbDocClient.send(input);
  } catch (error) {
    throw new Error('Unable to update user in DynamoDB.');
  }
};

// list active users
export const listActiveUsers = async () => {
  const params = {
    ProjectionExpression: 'id, displayName, statusDisplay',
    TableName: tableName,
  };

  try {
    const command = new ScanCommand(params);
    const activeUsers = await ddbDocClient.send(command);
    const items = activeUsers.Items.map((item) => ({
      id: item.id,
      displayName: item.displayName,
      statusDisplay: item.statusDisplay || '',
    }));
    return items;
  } catch (error) {
    return {
      error: `Error getting active users, ${error.stack}`,
    };
  }
};

// yes it actually delete the items from ddb
export const deleteUser = async (user) => {
  // Skip deletion if user ID is undefined or invalid
  if (!user.id) {
    console.log('Skipping deletion - user ID is undefined');
    return;
  }

  const usernameId = `_${user.id}`;
  const params = {
    TableName: tableName,
    Key: {
      username_id: usernameId,
    },
    ConditionExpression: 'username_id = :userIdVal',
    ExpressionAttributeValues: {
      ':userIdVal': usernameId,
    },
  };

  console.log('deleted users', user);

  const command = new DeleteCommand(params);

  try {
    await ddbDocClient.send(command);
    console.log('Successfully deleted user from DynamoDB');
  } catch (error) {
    console.error('DynamoDB delete error:', error);
    throw new Error('Unable to delete item in DynamoDB.');
  }
};
