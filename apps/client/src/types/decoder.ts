import * as t from "io-ts";

const listItemCodec = t.type({
  title: t.string,
  completed: t.boolean,
});

export const storedDataCodec = t.type({
  versionId: t.string,
  elementList: t.array(t.string),
  elementMap: t.record(t.string, listItemCodec),
});
