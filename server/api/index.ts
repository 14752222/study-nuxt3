export default defineEventHandler((event) => {
    console.log(`event`,event)
    return {
        message: "Hello World index.ts",
    }
})
