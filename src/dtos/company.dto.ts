import { InvalidInput } from '../errors'
import { NewCompany } from '../types'

export function companyDTO(body: unknown): NewCompany {
    if (!body || typeof body !== 'object') {
        throw new InvalidInput(['body'])
    }

    const data = body as Record<string, unknown>
    const fields: string[] = []

    const name = typeof data.name === 'string' ? data.name.trim() : ''
    const cnpj = typeof data.cnpj === 'string' ? data.cnpj : ''
    const state = typeof data.state === 'string' ? data.state.toUpperCase() : ''

    if (name.length < 3) {
        fields.push('name')
    }

    if (!/^\d{14}$/.test(cnpj)) {
        fields.push('cnpj')
    }

    if (!/^[A-Za-z]{2}$/.test(state)) {
        fields.push('state')
    }

    if (fields.length > 0) {
        throw new InvalidInput(fields)
    }

    return {
        name,
        cnpj,
        state
    }
}
