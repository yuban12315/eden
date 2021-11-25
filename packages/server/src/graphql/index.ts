import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";

// resolvers
import NoteResolver from "./note/resolver";

export function getSchema(): GraphQLSchema {
  return buildSchemaSync({ resolvers: [NoteResolver] });
}
