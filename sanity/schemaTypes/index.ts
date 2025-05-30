import { type SchemaTypeDefinition } from "sanity";
// import { author } from "./author";
// import { startup } from "./startup";
// import { playlist } from "./playlist";
import { author } from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";
import { playlist } from "@/sanity/schemaTypes/playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist],
};
