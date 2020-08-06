import { Request, Response, Router} from 'express'

import Post from '../models/Post'

class PostRoutes {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await Post.find()
        res.json(posts)
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        const {url} = req.params
        const post = await Post.findOne({url: url})
        res.json(post)
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        const {title, url, content} = req.body;
        const newPost = new Post({title, url, content})
 
        await newPost.save()
        
        res.json({data: newPost})
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        const {url} = req.params
        const post = await Post.findOneAndUpdate({url: url}, req.body)
        res.json(post)
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        const {url} = req.params
        await Post.findOneAndDelete({url: url})
        res.json({response: 'Deleted successfully'})
    }

    routes() { 
        this.router.get('/', this.getPosts)
        this.router.get('/:url', this.getPost)
        this.router.post('/', this.createPost)
        this.router.put('/:url', this.updatePost)
        this.router.delete('/:url', this.deletePost)
    }
}

const postRoutes = new PostRoutes();

export default postRoutes.router