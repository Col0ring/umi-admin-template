import request from '@/utils/request';

export function reqLoginByPassword({
  username,
  password,
}: {
  username: string;
  password: string;
}): Api {
  return request({
    url: '/login/password',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function reqGetAuthCode(
  phone: string,
): Api<{ code: number; authCode: string }> {
  return request({
    url: '/getAuthCode',
    params: {
      phone,
    },
  }) as any;
}

export function reqLoginByCode({
  phone,
  code,
}: {
  phone: string;
  code: string;
}): Api {
  return request({
    url: '/login/code',
    method: 'post',
    data: {
      phone,
      code,
    },
  });
}

export function reqGetUserInfo(): Api {
  return request({
    url: '/getUserInfo',
  });
}
