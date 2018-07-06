# Presidential Payments API

A RESTful API for ProPublica's Presedenital Payments Data.

Example query: 

```
http://localhost:3000/?amount%3E=10000&amount%3C=15000&state=FL
```

The response includes the parsed query, total number of records returned, & the matching expenditures.

Example resonse:

```
{    
    "query": {
        "amount": {
        "$gte": 10000,
        "$lte": 15000
        },
        "state": "FL"
    },
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