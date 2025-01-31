/** @type { import("drizzle-kit").Config } */

export default {
    schema:"./src/utils/schema.ts",
    dialect: "postgresql",
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_9qxQ6gSREzOy@ep-empty-mouse-a82sup8d-pooler.eastus2.azure.neon.tech/Blogs?sslmode=require',
    }


}