import { NotFound, RuleViolation } from '../errors'
import { Employee, NewEmployee } from '../types'
import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'

const MINIMUM_SALARY = 1518
const INSS_RATE = 0.11

export class EmployeeService {
    constructor(
        private employees: EmployeeRepository,
        private companies: CompanyRepository
    ) { }

    create(data: NewEmployee): Employee {
        const company = this.companies.findById(data.companyId)

        if (!company) {
            throw new NotFound('company')
        }

        if (data.salary < MINIMUM_SALARY) {
            throw new RuleViolation('salary below minimum wage')
        }

        const inss = data.salary * INSS_RATE
        const netSalary = data.salary - inss

        return this.employees.save(data, netSalary)
    }

    findByCompany(companyId: number): Employee[] {
        const company = this.companies.findById(companyId)

        if (!company) {
            throw new NotFound('company')
        }

        return this.employees.findByCompany(companyId)
    }
}
