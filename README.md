
<img src="https://user-images.githubusercontent.com/4768226/210363824-9aeb9ceb-766d-4fed-9f0c-3e491bce3a4a.png" width="100%" />

# hwt-cli (In progress)


## Description

An opinionated human friendly JWT inspector for your terminal.

## Background

Why are we constantly using https://jwt.io/, but actually I don't know about you but personally I just new a few information.
But we get overwhelmed by this poor user experience. Adding to this the data privacy...
I decided that it was time to stop sharing data with 3rd party and take the controle back of my JWT. 🔥

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
hwt
```

Then from there you will receice the following response:

![image](https://user-images.githubusercontent.com/4768226/211049732-4dd3b127-3c74-482f-8a5f-73b52e3b5aed.png)

### Options


### `--raw`

```
hwt --raw
```

Result:

![image](https://user-images.githubusercontent.com/4768226/211049954-be214154-9f2e-4dcc-aefd-53185d4e0dde.png)
  
### `--claim` to filter

If you need to isolate a specific claim you can use the option `--claim`

```
jwt --table
```

```
| | |
```
