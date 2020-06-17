import mockApi from './config';
import { Request, Response, UserProps } from 'umi';

export default {
  [mockApi('/login', 'post')]: (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      res.send({ token: '123456', code: 200 });
    } else {
      res.send({ msg: '用户名或密码错误', code: 400 });
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
      const flag = Math.random() * 10 > 3 ? true : false;
      setTimeout(() => {
        if (flag) {
          res.send({ user, code: 200 });
        } else {
          res.send({ msg: '用户登陆信息有误，请重新登陆', code: 401 });
        }
      }, 1000);
    } else {
      res.send({ msg: '用户登陆信息有误，请重新登陆', code: 401 });
    }
  },
};
