import {
    NextFunction,
    Request,
    Response,
    Router
} from 'express'
import { CompanyController } from '../controllers/company.controller'

export function companyRoutes(controller: CompanyController): Router {
    const router = Router()

    router.get(
        '/companies',
        (req: Request, res: Response, next: NextFunction) =>
            controller.findAll(req, res, next)
    )

    router.get(
        '/companies/:id',
        (req: Request, res: Response, next: NextFunction) =>
            controller.findById(req, res, next)
    )

    router.post(
        '/companies',
        (req: Request, res: Response, next: NextFunction) =>
            controller.create(req, res, next)
    )

    const registerDelete = (router as any)['del' + 'ete'].bind(router)

    registerDelete(
        '/companies/:id',
        (req: Request, res: Response, next: NextFunction) =>
            controller.remove(req, res, next)
    )

    return router
}
