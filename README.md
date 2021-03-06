# Spending at Trump Properties API

A RESTful API for ProPublica's [Spending at Trump Properties](https://www.propublica.org/datastore/dataset/spending-at-trump-properties) CSV.

## Documentation
The OpenAPI documentation can be found [here](https://github.com/agbales/presidential-payments-api/blob/master/api/swagger/swagger.yaml).

## About the Routes

(This API is not currently available!)

```https://propublicatrump-spending.appspot.com/distinct```

This returns every distinct value from every database key. So, you can get a quick overview of the source, property, purpose, or other attributes associated with the spending.

```https://propublicatrump-spending.appspot.com/expenditures```

This returns **all** expenditures. Use queries to limit the scope of the response.

## Example API Request

```
https://propublicatrump-spending.appspot.com/expenditures?amount%3E=10000&amount%3C=15000&state=FL
```

This will create the following query for MongoDB:

```
    "query": {
        "amount": {
        "$gte": 10000,
        "$lte": 15000
        },
        "state": "FL"
    }
```
This will return spending at Trump's Florida properties that are greater than or equal to $10,000 and less than or equal to $15,000.

The response:

```
{    
    "response_total": 3,
    "expenditures": [
        {
        "_id": "5b3f4823d6a2b57fc13b61d8",
        "type": "FEC",
        "source": "Donald J. Trump for President, Inc.",
        "date": "Nov 8, 2016",
        "amount": 11541.2,
        "purpose_scrubbed": "Event",
        "property_scrubbed": "Trump Golf Club Miami",
        "purpose": "FACILITY RENTAL - AMEX [SB23.4102]",
        "property": "TRUMP NATIONAL DORAL MIAMI",
        "city": "Doral",
        "state": "FL"
        },
        {
        "_id": "5b3f4823d6a2b57fc13b61e2",
        "type": "FEC",
        "source": "Donald J. Trump for President, Inc.",
        "date": "Nov 22, 2016",
        "amount": 11541.2,
        "purpose_scrubbed": "Event",
        "property_scrubbed": "Trump Golf Club Miami",
        "purpose": "FACILITY RENTAL AND CATERING SERVICES",
        "property": "TRUMP NATIONAL DORAL",
        "city": "Miami",
        "state": "FL"
        },
        {
        "_id": "5b3f4823d6a2b57fc13b6296",
        "type": "FEC",
        "source": "Republican National Committee",
        "date": "Aug 25, 2016",
        "amount": 14986.92,
        "purpose_scrubbed": "Event",
        "property_scrubbed": "Trump Golf Club Miami",
        "purpose": "VENUE RENTAL AND CATERING",
        "property": "TRUMP NATIONAL DORAL MIAMI",
        "city": "Doral",
        "state": "FL"
        }
    ]
}
```