import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mkOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mkOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server running on localhost: 4000");
  });
};

main();

console.log("hello world");

/* await orm.em.nativeInsert(Post, {title: "my second way of adding a post"});
   const posts = await orm.em.find(Post, {});
   console.log(posts); 
   
   const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
  
  */
