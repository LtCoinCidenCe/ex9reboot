#!/bin/bash
docker run --rm -it -v ./:/usr/src/app -w /usr/src/app -p 3001:3001 --name ex9 node:20 yarn run dev

docker exec -i ex9 yarn run lint --fix
