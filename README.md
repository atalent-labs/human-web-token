
<img src="https://user-images.githubusercontent.com/4768226/210363824-9aeb9ceb-766d-4fed-9f0c-3e491bce3a4a.png" width="100%" />

# hwt (command line tool)


## Description

An opinionated human friendly JWT inspector for your terminal.



https://user-images.githubusercontent.com/4768226/211298382-039b09d4-b5cb-4b77-8dce-82f73a9ba714.mp4



## Background

Why are we constantly using https://jwt.io/, but actually I don't know about you but personally I just new a few information.
But we get overwhelmed by this poor user experience. Adding to this the data privacy...
I decided that it was time to stop sharing data with 3rd party and take the controle back of my JWT. 🔥

## Installation

```sh
curl https://atalent-consulting.com/hwt/install.sh | bash 
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


### `--raw` or 

```
hwt --raw
```

Result:

![image](https://user-images.githubusercontent.com/4768226/211049954-be214154-9f2e-4dcc-aefd-53185d4e0dde.png)
  
### `--claim` or `-c` to filter

If you need to isolate a specific claim you can use the option `--claim`

<img width="1136" alt="image" src="https://user-images.githubusercontent.com/4768226/211145938-e521250f-0024-4586-8994-26a55ab31cab.png">


### Troubleshooting

If you are running into some issues you can use the environment variable `DEBUG`.

Example: 
```
DEBUG=hwt hwt
```


## Contribution Development

Surprisingly, this CLI is made with nodejs ^^. We are open to a remake in GO ... Especially knowing since we are using [pkg](https://github.com/vercel/pkg) the file is about 50M 😬.

In order to run the code locally you can
* Install the dependencies: `npm i`
* Run the test `npm test`

### Testing

In order to increase the understaing the Unit test has been made through a small framework from scratch leveraging yaml.

Each test are isolated by folder in `tests/fixtures`

Run the tests

```
npm test
```

Run the tests (Watch mode)

```
npm run test:watch
```

## Author

- [@olivierodo](https://www.github.com/olivierodo) - 🇫🇷

## License

[MIT License](./LICENSE)

