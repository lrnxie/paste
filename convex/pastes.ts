import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import {
  AnyDataModel,
  GenericMutationCtx,
  GenericQueryCtx,
} from 'convex/server';

async function checkIsAdmin(
  ctx: GenericQueryCtx<AnyDataModel> | GenericMutationCtx<AnyDataModel>
) {
  const currentUser = await ctx.auth.getUserIdentity();

  if (currentUser) {
    const admins = await ctx.db.query('users').collect();
    const adminEmails = admins.map((admin) => admin.email);

    if (adminEmails.includes(currentUser.email)) {
      return true;
    }
  }

  return false;
}

export const getAll = query({
  handler: async (ctx) => {
    const isAdmin = await checkIsAdmin(ctx);

    if (isAdmin) {
      return await ctx.db.query('pastes').order('desc').collect();
    }

    return await ctx.db
      .query('pastes')
      .filter((q) => q.eq(q.field('isPublic'), true))
      .order('desc')
      .collect();
  },
});

export const create = mutation({
  args: { content: v.string(), isPublic: v.boolean() },
  handler: async (ctx, args) => {
    const isAdmin = await checkIsAdmin(ctx);

    if (isAdmin) {
      return await ctx.db.insert('pastes', {
        content: args.content,
        isPublic: args.isPublic,
      });
    }
  },
});

export const remove = mutation({
  args: { id: v.id('pastes') },
  handler: async (ctx, args) => {
    const isAdmin = await checkIsAdmin(ctx);

    if (isAdmin) {
      return await ctx.db.delete(args.id);
    }
  },
});
