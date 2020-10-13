lilBot-v2

### docker-compose.yml
```yml
version: '3.8'

services:
  lilbot:
    image: {org}/{repo}:{tag}
    environment:
      - BOT_TOKEN=
      - PREFIX=

```