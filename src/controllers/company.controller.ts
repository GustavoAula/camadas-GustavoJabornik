import { Request, Response, NextFunction } from 'express'
import { companyDTO } from '../dtos/company.dto'
import { CompanyService } from '../services/company.service'

export class CompanyController {
    constructor(private service: CompanyService) { }

    findAll(req: Request, res: Response, next: NextFunction): void {
        try {
            const companies = this.service.findAll()
            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }

    findById(req: Request, res: Response, next: NextFunction): void {
        try {
            const id = Number(req.params.id)
            const company = this.service.findById(id)
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }

    create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = companyDTO(req.body)
            const company = this.service.create(data)
            res.status(201).json(company)
        } catch (error) {
            next(error)
        }
    }

    remove(req: Request, res: Response, next: NextFunction): void {
        try {
            const id = Number(req.params.id)
            this.service.remove(id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}
