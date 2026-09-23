import { NotFound, RuleViolation } from '../errors'
import { Company, NewCompany } from '../types'
import { CompanyRepository } from '../repositories/company.repository'
import { EmployeeRepository } from '../repositories/employee.repository'

export class CompanyService {
    constructor(
        private companies: CompanyRepository,
        private employees: EmployeeRepository
    ) { }

    findAll(): Company[] {
        return this.companies.findAll()
    }

    findById(id: number): Company {
        const company = this.companies.findById(id)

        if (!company) {
            throw new NotFound('company')
        }

        return company
    }

    create(data: NewCompany): Company {
        const existing = this.companies.findByCnpj(data.cnpj)

        if (existing) {
            throw new RuleViolation('cnpj already exists')
        }

        return this.companies.save(data)
    }

    remove(id: number): void {
        this.findById(id)

        if (this.employees.countByCompany(id) > 0) {
            throw new RuleViolation('company has employees')
        }

        this.companies.remove(id)
    }
}
