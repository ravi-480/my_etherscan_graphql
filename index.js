const { ApolloServer } = require("apollo-server");
// Import GraphQL schema from schema.graphql file
const { importSchema } = require("graphql-import");
// Import custom data source for Ethereum data  
const EtherDataSource = require("./datasource/ethDatasource"); 

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    // Resolver to get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>

      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get average block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({  
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiate EtherDataSource
    ethDataSource: new EtherDataSource(),

  }), 
});

// Disable response timeout
server.timeout = 0;  

// Start the server
server.listen("9000").then(({ url }) => {

  console.log(`🚀 Server ready at ${url}`);
});