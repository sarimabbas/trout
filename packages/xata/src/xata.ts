// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "sources",
    columns: [
      { name: "name", type: "string" },
      { name: "clerkOrgOrUserId", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Sources = InferredTypes["sources"];
export type SourcesRecord = Sources & XataRecord;

export type DatabaseSchema = {
  sources: SourcesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://Capy-37ev59.us-east-1.xata.sh/db/trout",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
