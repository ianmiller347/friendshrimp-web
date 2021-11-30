import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

// AWS setup
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const documentClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'friendshrimp_active-shrimps';

const getActiveUserData = (user) => {
  // query for user.active and return null if not found
  // if getUserById(user.id).active, return user
  return null;
};

// add user to the table
export const addUser = (user) => {
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

  documentClient.put(params, (err, data) => {
    if (err) {
      console.log('Error', err);
      return null;
    } else {
      console.log('Success', data);
      return data;
    }
  });
};

// update user
export const updateUser = (user) => {
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

  documentClient.update(params, (err, data) => {
    if (err) {
      console.log('Error', err);
      return null;
    } else {
      console.log('Success', data);
      return data;
    }
  });
};

// list active users
export const listActiveUsers = async () => {
  const params = {
    ProjectionExpression: 'id, displayName, statusDisplay',
    TableName: tableName,
  };

  try {
    const activeUsers = await documentClient.scan(params).promise();
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
export const deleteUser = (user) => {
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

  documentClient.delete(params, (err, data) => {
    if (err) {
      console.log('Error', err);
      return null;
    } else {
      console.log('Successfully deleted user', data);
      return data;
    }
  });
};
