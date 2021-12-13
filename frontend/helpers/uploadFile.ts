import { axios } from '../core/axios'

export const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('photo', file)
    const url: string = (
        await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    ).data

    return url
}
