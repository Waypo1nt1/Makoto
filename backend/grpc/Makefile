.SILENT:

gen-auth-go:
	protoc --go_out=./gen/auth/go --go_opt=paths=source_relative \
    --go-grpc_out=./gen/auth/go --go-grpc_opt=paths=source_relative \
    ./proto/auth.proto
