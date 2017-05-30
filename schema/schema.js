const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');
const {
  GraphQLObjectType, // tell graphql about the presents of a user
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const DATA = require('../data');
const quandleAPI = require('../utils/quandlAPI');

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: {
    Symbol: { type: GraphQLString },
    CompanyName: { type: GraphQLString },
    SecurityName: { type: GraphQLString },
    MarketCategory: { type: GraphQLString },
    TestIssue: { type: GraphQLString },
    FinancialStatus: { type: GraphQLString },
    RoundLotSize: { type: GraphQLString },
    Code: { type: GraphQLString },
    Price: { type: GraphQLFloat },
    Exchange: { type: GraphQLString },
    Diff: { type: GraphQLFloat }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    stock: {
      type: StockType,
      args: { Symbol: { type: GraphQLString } },
      resolve(parentValue, args) {
        return quandleAPI.fetchStockData({ code: args.Symbol })
          .then(function(result) {

            const stockInformation = _.find(DATA, { Symbol: _.toUpper(args.Symbol) });

            if (!stockInformation) return null;

            return Object.assign({},
              _.find(DATA, { Symbol: _.toUpper(args.Symbol) }), {
                Price: result.Price,
                Exchange: "NASDAQ",
                Diff: result.Diff,
                CompanyName: stockInformation["Company Name"],
                SecurityName: stockInformation["Security Name"],
                MarketCategory: stockInformation["Market Category"],
                TestIssue: stockInformation["Test Issue"],
                FinancialStatus: stockInformation["Financial Status"],
                RoundLotSize: stockInformation["Round Lot Size"],
              }
            )
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});