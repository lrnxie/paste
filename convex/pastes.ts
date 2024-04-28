import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query('pastes').order('desc').collect();
  },
});

export const create = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('pastes', { content: args.content });
  },
});

export const remove = mutation({
  args: { id: v.id('pastes') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
