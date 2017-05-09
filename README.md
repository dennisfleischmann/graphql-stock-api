# Introduction
This repository is for private purposes in order to get in touch with GraphQL from Facebook. Inc

## Sample Project

<code>https://graphql-stock-api.herokuapp.com/graphql</code>


## GraphlQL Query
```javascript
{
  {
    stock(Symbol: "msft") {
      Symbol
      CompanyName
      Price
      Diff
    }
  }
}
```


## Graphql Result
```json
{
  "data": {
    "stock": {
      "Symbol": "Fb",
      "CompanyName": "Facebook Inc. ",
      "Price": 68.94,
      "Diff": 0.06
    }
  }
}
```