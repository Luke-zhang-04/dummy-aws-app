FROM amazonlinux

USER root

WORKDIR /

RUN yum install -y go

COPY . .

RUN env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -v -ldflags '-d -s -w' -a -tags netgo -installsuffix netgo -o ./build/main main.go

CMD tail -f /dev/null
