\*\*

## Weather API with Redis Caching

\*\*

A simple **NestJS** API that fetches weather data from an external weather service and caches the response using **Redis** to improve performance and reduce repeated API calls.

The API allows users to request current weather data for any city and optionally retrieve the full weather response from the provider.

**_Features_**

**City Weather Lookup
Fetch current weather data for any city.**

**_Redis Caching_**

**Weather responses are cached for 12 hours to reduce external API calls.**

**_Compact or Full Response_**

**Users can choose between:
Simplified weather data
Full weather API response**

**_Cache First Strategy_**

1.  The system first checks Redis.
2.  If cached data exists, it returns it immediately without calling the
    external API.

**Endpoint**

    GET /weather

3.  Fetch weather data for a city.

---

## Query Parameters

| Parameter | Type               | Description                                  |
| --------- | ------------------ | -------------------------------------------- |
| city      | string             | Name of the city                             |
| full      | boolean (optional) | If `true`, returns full weather API response |

---

## Example Requests

Basic Weather Request

    GET /weather?city=cairo

Response example:

    {

    "description": "Partly cloudy",

    "temperature": "26.4",

    "maxTemperature": "29.1",

    "minTemperature": "21.7",

    "humidity": 65,

    "rainProbability": 10

    }

Full Weather Data

    GET /weather?city=cairo&full=true

Returns the complete response from the weather API.

## How Caching Works

- User requests weather for a city.

- The system checks Redis using a key:

weather:{city}

If cached data exists → return cached result.

If not → fetch data from the external weather API.

- Store the result in Redis for 12 hours (43200 seconds).

\*\*

## Tech Stack

\*\*

**Backend**

- [ ] NestJS

**Caching**

- [ ] Redis

- [ ] ioredis

**HTTP Requests**

- [ ] @nestjs/axios

- [ ] RxJS

**External API**

- [ ] Visual Crossing Weather API
