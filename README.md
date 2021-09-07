This repository contains code to try out [SQL Frames](https://sqlframes.com/) and related applications.

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
npm install [path to sqlframes-abc-x.y.z.tgz] --no-save
```

This will install SQL Frames dependency

4. Start the local server

```sh
> yarn serve
```