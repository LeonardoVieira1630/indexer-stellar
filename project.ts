import {
  StellarDatasourceKind,
  StellarHandlerKind,
  StellarProject,
} from "@subql/types-stellar";

const project: StellarProject = {
  specVersion: "1.0.0",
  name: "soroban-testnet-starter",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-stellar",
      version: "*"
    },
    query: {
      name: "@subql/query",
      version: "*"
    }
  },
  description: "This project indexes events from the Scorer Contract on Stellar Soroban testnet",
  repository: "https://github.com/subquery/stellar-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    chainId: "Test SDF Network ; September 2015",
    endpoint: ["https://horizon-testnet.stellar.org"],
    sorobanEndpoint: "https://soroban-testnet.stellar.org:443",
    dictionary: "https://gx.api.subquery.network/sq/subquery/soroban-testnet-dictionary",
  },
  dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      startBlock: 498918,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: StellarHandlerKind.Event,
            filter: {
              contractId: "CBZKVQ6OOBPUOR5D35OBY5EVM4AMDZOS2NQHD3NGJRCZHARUM3U6XI5E",
              topics: [
                "AAAADgAAAAZzY29yZXIAAA==",
                "AAAADwAAAAZjcmVhdGUAAA==",
                "manager", 
                "add"
              ],
            },
          },
        ],
      },
    },
  ],
};

export default project;
