import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

const region = 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const client = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const TableName = 'friendshrimp_ShrimpDonors';

export const getShrimpDonors = async () => {
  // call ddb get the shrimps man
  const params = {
    TableName,
  };

  try {
    const result = await ddbDocClient.send(new ScanCommand(params));
    if (result.Items) {
      return result.Items;
    }
  } catch (error) {
    console.error('cant list items from DDB');
    throw new Error('Unable to list items from DynamoDB.');
  }
  return [];
};

export const addShrimpDonor = async (requestBody) => {
  const createdAt = Date.now();
  const lookupKey = `${createdAt}_${requestBody.amountDonated}_${requestBody.displayName}`;
  const Item = {
    ...requestBody,
    id: requestBody.transactionDetails.id,
    lookupKey,
    createdAt,
  };

  // add the shrimp to the ddb
  const params = {
    TableName,
    Item,
  };

  const command = new PutCommand(params);

  try {
    await ddbDocClient.send(command);
  } catch (error) {
    const errorMessage = 'Unable to create item in DynamoDB.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return {};
};
