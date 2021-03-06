import Express from 'express'
import sharp from 'sharp'
import fs from 'fs'

class UploadController {
    upload(req: Express.Request, res: Express.Response) {
        const filePath = req.file.path

        sharp(filePath)
            .resize(150, 150)
            .toFormat('jpeg')
            .toFile(filePath.replace('.png', '.jpeg'), (err) => {
                if (err) {
                    throw err
                }

                fs.unlinkSync(filePath)

                res.json({
                    url: `/avatars/${req.file.filename.replace(
                        '.png',
                        '.jpeg'
                    )}`,
                })
            })
    }
}
export default new UploadController()
