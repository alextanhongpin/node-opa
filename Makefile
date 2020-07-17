build:
	opa build -t wasm -e 'example/hello' ./example.rego
	tar -xzf ./bundle.tar.gz /policy.wasm
