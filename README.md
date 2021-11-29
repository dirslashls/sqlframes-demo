[**SQL Frames**](https://sqlframes.com) is an in-browser in-memory data, visualization and intelligence platform with several building blocks. 

This repository contains code to try out **SQL Frames** and related applications. Refer to [**SQL Frames** + React](https://github.com/dirslashls/sqlframes-react-demo) for a demo of integration with React.

***
DISCLAIMER - This code is provided only as an example and does not come with any implied guarantee of support. Official support is only available through the commercial licensing of **SQL Frames**.
***

# Installation

1. Clone this repository.

```sh
> git clone http://github.com/dirslashls/sqlframes-demo.git
```

2. Navigate to sqlframes-demo directory to install dependencies

```sh
> yarn install
```

3. Install SQL Frames library (at present it is not available via npm).
Say the library is provided as sqlframes-abc-x.y.z.tgz (x.y.z represents
a version), then it can be installed into this project as

```sh
npm install <path-to-sqlframes-abc-x.y.z.tgz> --no-save
```

This will install SQL Frames dependency

> Note: make sure to use `--no-save` option to avoid saving the file based dependency in `package.json`. Also make note that `npm` is being used instead of `yarn` as the later always adds the dependency into the `package.json` file. If by accident `yarn` is used, then subsequent installations would require `yarn cache clean` and then installing the local package (and removing the dependency from package.json if there is an older version)

4. Start the local server

```sh
> yarn serve
```