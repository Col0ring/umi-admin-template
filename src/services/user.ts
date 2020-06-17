import request from '@/utils/request';

export function reqLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function reqGetUserInfo() {
  return request({
    url: '/getUserInfo',
  });
}
