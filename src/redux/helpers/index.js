export const apiUrl = 'http://localhost:8000'

export const validationHeader = { ...{'Content-Type': 'application/json'}}

export const postOptions = (employee) => ({
    method: 'POST',
    headers: validationHeader,
    body: JSON.stringify(employee)
})

export const updateOptions = (employee) => ({
    method: 'PATCH',
    headers: validationHeader,
    body: JSON.stringify(employee)
})

export const handleResponse = (response) => {
    return response.json()
}