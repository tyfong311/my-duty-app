import {rest} from 'msw'

export const handlers = [
    rest.delete("http://localhost/api/Duty/*", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ message: 'Duty deleted successfully' })
        )
    }),
    rest.delete("http://localhost:3000/api/Duty/*", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ message: 'Duty deleted successfully' })
        )
    })
    
]