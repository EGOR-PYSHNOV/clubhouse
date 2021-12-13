import Express from 'express'
import { randomCode } from '../helpers/randomCode'
import { SmsCode, User } from '../models'
import { axios } from '../core/axios'

class AuthController {
    getMe(req: Express.Request, res: Express.Response) {
        res.json(req.user)
    }

    authCallback(req: Express.Request, res: Express.Response) {
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                req.user
            )}', '*');window.close();</script>`
        )
    }

    async activate(req: Express.Request, res: Express.Response) {
        const userId = req.user.id
        const { code, user } = req.body

        if (!code) {
            return res.status(400).json({ message: 'Введите код активации' })
        }

        const whereQuery = { code, user_id: userId }

        try {
            const findCode = await User.findOne({
                where: whereQuery,
            })

            if (findCode) {
                await SmsCode.destroy({
                    where: whereQuery,
                })
                await User.update(
                    { ...user, isActive: true },
                    { where: { id: userId } }
                )
                return res.send()
            } else {
                res.status(400).json({
                    message: 'Код не найден',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ошибка при активации аккаунта',
            })
        }
    }

    async sendSMS(req: Express.Request, res: Express.Response) {
        const phone = req.query.phone
        const userId = req.user.id
        const smsCode = randomCode()

        if (!phone) {
            return res.status(400).send()
        }

        try {
            const findCode = await SmsCode.findOne({
                where: {
                    user_id: userId,
                },
            })

            if (findCode) {
                return res.status(400).json({ message: 'Code was sended' })
            }

            await axios.post(
                `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=375291214809&msg=${smsCode}`
            )

            await SmsCode.create({
                code: smsCode,
                user_id: userId,
            })
            res.status(201).send()
        } catch (error) {
            res.status(500).json({
                message: 'Error while sending sms code',
            })
        }
    }
}

export default new AuthController()
