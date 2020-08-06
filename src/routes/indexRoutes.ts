import { Request, Response, Router } from 'express'

class IndexRoutes {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.get('/', (req: Request, res: Response) => res.send('DEMO CRUD TYPESCRIPT'))
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router