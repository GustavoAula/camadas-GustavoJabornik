import { InvalidInput } from '../errors'
import { NewEmployee } from '../types'

export function employeeDTO(body: unknown): NewEmployee {
    if (!body || typeof body !== 'object') {
        throw new InvalidInput(['body'])
    }

    const data = body as Record<string, unknown>
    const fields: string[] = []

    const name = typeof data.name === 'string' ? data.name.trim() : ''
    const email = typeof data.email === 'string' ? data.email : ''
    const salary = Number(data.salary)
    const companyId = Number(data.companyId)

    if (name.length < 3) {
        fields.push('name')
    }

    if (!email.includes('@')) {
        fields.push('email')
    }

    if (!Number.isFinite(salary)) {
        fields.push('salary')
    }

    if (!Number.isInteger(companyId) || companyId <= 0) {
        fields.push('companyId')
    }

    if (fields.length > 0) {
        throw new InvalidInput(fields)
    }

    return {
        name,
        email,
        salary,
        companyId
    }
}
