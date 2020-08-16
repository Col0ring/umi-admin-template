import mockApi from './config';
import { Request, Response, UserProps } from 'umi';
import { phoneReg } from '../src/utils/validators';
import { createAuthCode } from './helpers';
let authCode = '';

export default {
  [mockApi('/login/password', 'post')]: (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      setTimeout(() => {
        res.send({ token: '123456', code: 200 });
      }, 2000);
    } else {
      res.send({ msg: '用户名或密码错误', code: 400 });
    }
  },
  [mockApi('/getAuthCode')]: (req: Request, res: Response) => {
    const phone = req.query.phone as string;
    if (phoneReg.test(phone)) {
      authCode = createAuthCode();
      res.send({ authCode, code: 200 });
    } else {
      res.send({ msg: '手机号验证失败，请输入正确的手机号', code: 400 });
    }
  },
  [mockApi('/login/code', 'post')]: (req: Request, res: Response) => {
    if (!authCode) {
      res.send({ msg: '请先获取验证码', code: 400 });
    }
    const { phone, code } = req.body;
    if (phoneReg.test(phone) && code.toLowerCase() === authCode.toLowerCase()) {
      setTimeout(() => {
        res.send({ token: '123456', code: 200 });
        authCode = '';
      }, 2000);
    } else {
      res.send({ msg: '验证码错误', code: 400 });
    }
  },
  [mockApi('/getUserInfo')]: (req: Request, res: Response) => {
    const { token } = req.headers;
    if (token === '123456') {
      const user: UserProps = {
        email: '123456@163.com',
        phone: '123456789',
        name: 'admin',
      };
      const roles = ['admin'];
      // const flag = Math.random() * 10 > 3 ? true : false;
      // setTimeout(() => {
      //   if (flag) {
      //     res.send({ user, code: 200 });
      //   } else {
      //     res.send({ msg: '用户登陆信息有误，请重新登陆', code: 401 });
      //   }
      // }, 1000);
      res.send({ user, roles, code: 200 });
    } else {
      res.send({ msg: '用户登陆信息有误，请重新登陆', code: 401 });
    }
  },
};
