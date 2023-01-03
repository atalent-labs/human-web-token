# inspect-jwt-cli (In progress)

## Description

A human friendly JWT inspector for your terminal.

## Background

Why are we constantly using https://jwt.io/ when actually we can craft faster and better user experience.
It's time to stop sharing data with 3rd party and take the controle back of our JWT. 🔥

## Installation

```sh
curl https://simple-jwt.atalent-labs./install.sh | bash
```


## Usage

#### Copy your JWT, we take care of the rest

Actually most of the time when we want to inspect a JWT the first step is to copy it into the clipboard.
So... Let's get a good use of that clipboard!

Only run:

```
jwt
```

Then from there you will receice the following response:

```
{
  "token_id": "b9a5fb2b-370d-4492-aab7-bf5ade322bb6",
  "type": "Bearer",
  "expirate_at": "2022-02-01 12:00",
  "issue_at": "2022-02-01 11:00",
  "issue_by": "https://example.com",
  "user_id": "2f78666a-ef79-4014-9ae9-66ad7813be4b",
  "client_id": "64a891e9-1bf2-46ee-9771-059e61ecc449",
  "permissions": [
    "read:leads",
    "email"
  ],
  "session_id": "874fe383-966e-4e94-9717-9748bd1ccc81",
  "session_state": "874fe383-966e-4e94-9717-9748bd1ccc81",
  "validity": "10 minutes"
  "is_valide": "true"
}
```

### Options


### `--raw`

```
jwt --raw
```

```
{
  "exp": 1665039752,
  "iat": 1665039152,
  "jti": "b9a5fb2b-370d-4492-aab7-bf5ade322bb6",
  "iss": "https://example.com",
  "sub": "2f78666a-ef79-4014-9ae9-66ad7813be4b",
  "typ": "Bearer",
  "azp": "64a891e9-1bf2-46ee-9771-059e61ecc449",
  "session_state": "874fe383-966e-4e94-9717-9748bd1ccc81",
  "acr": "1",
  "scope": "read:leads:consents",
  "sid": "874fe383-966e-4e94-9717-9748bd1ccc81",
  "profiles_advisorId": "6113655"
}
```

### `--table`

```
jwt --table
```

```
| | |
```
