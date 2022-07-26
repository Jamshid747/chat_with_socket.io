import User from "./user.js"

export default async ({ io, db }) => {
    io.on("connection", async (socket) => {
        process.io = io
        process.socket = socket
        await User({ socket, io, db })        
    })
}