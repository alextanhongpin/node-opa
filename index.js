const Rego = require("@open-policy-agent/opa-wasm");
const fs = require("fs");

// For this to work, we need to instantiate the opa_println  function.
// Go to node_modules/@open-policy-agent/opa-wasm/src/opa.js, and modify the following:

//const wasm = await WebAssembly.instantiate(policy_wasm, {
//env: {
//// ...
//opa_println: console.log
//}
//}
async function main() {
  const rego = new Rego();
  console.log(rego);
  const policyWasm = fs.readFileSync("policy.wasm");
  const policy = await rego.load_policy(policyWasm);
  const input = '{"path": "/", "role": "admin"}';

  const resultSet = policy.evaluate(input);
  if (resultSet === null) {
    throw new Error("evaluation error");
  }
  if (resultSet.length === 0) {
    throw new Error("undefined");
  }
  console.log("allowed", resultSet[0].result);
}

main().catch(console.error);
