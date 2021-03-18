import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

@Resolver()
export  class PostResolver{
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]>{
    return ctx.em.find(Post, {});
  }

  @Query(() =>  Post, {nullable: true})
  post(
    @Arg('id', () => Int) _id: number,
    @Ctx() ctx: MyContext): Promise<Post | null>{
    return ctx.em.findOne(Post, { _id });
  }
}
