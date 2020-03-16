export const apiUrl = 'https://staffo.herokuapp.com'

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