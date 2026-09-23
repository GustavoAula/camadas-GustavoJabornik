import { Request, Response, NextFunction } from 'express'
import { employeeDTO } from '../dtos/employee.dto'
import { EmployeeService } from '../services/employee.service'

export class EmployeeController {
    constructor(private service: EmployeeService) { }

    create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = employeeDTO(req.body)
            const employee = this.service.create(data)

            res.status(201).json(employee)
        } catch (error) {
            next(error)
        }
    }

    findByCompany(req: Request, res: Response, next: NextFunction): void {
        try {
            const companyId = Number(req.params.id)
            const employees = this.service.findByCompany(companyId)

            res.status(200).json(employees)
        } catch (error) {
            next(error)
        }
    }
}
