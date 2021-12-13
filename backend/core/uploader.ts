import multer from 'multer'
import { v4 as uuid } from 'uuid'

export const uploader = multer({
    storage: multer.diskStorage({
        destination: function (_, __, cb) {
            cb(null, 'public/avatars')
        },
        filename: function (_, file, cb) {
            cb(
                null,
                file.fieldname +
                    '-' +
                    uuid() +
                    '.' +
                    file.mimetype.split('/').pop()
            )
        },
    }),
})
