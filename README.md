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

3. Start the local server

```sh
> yarn serve
```

## Docker

It is also try this demo using Docker. After cloning this repository (step 1 above), perform the following steps from
within the root directory of the cloned repository.

1. Build docker image

```sh
docker build . -t sqlframes/sqlframes-demo
```

2. Run docker image

```sh
docker run -p 49160:8080 -d sqlframes/sqlframes-demo
```

3. Access the demo from the browser at http://localhost:49160/

4. Terminate the container (once done with the demo)

		i. get the container id
```sh
	docker container ls
```
		ii. terminate the container
```sh
docker kill <container-id>
```	