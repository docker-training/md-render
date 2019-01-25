build this as `docker image build -t render:dev .`

then use this as a base image, placing root content at `/app/content/README.md`:

Dockerfile:
```
FROM render:dev
ARG SOURCE
COPY $SOURCE /app/content
CMD npm start
```

Build: `docker image build -t myimage:xxx --build-arg SOURCE=mysource .`

Launch: `docker container run --rm -d -p 8000:8080 myimage:xxx`
