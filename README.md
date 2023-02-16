# Sanctum / SPA authentication

A React app that authenticates with the [Laravel Sanctum](https://laravel.com/docs/7.x/sanctum) package. See [this repo](https://github.com/unlikenesses/sanctum-backend-example) for an example API that works with this project.

This project is only intended to demonstrate what Sanctum can do. It is not recommended to use it as a model for your own SPA projects.

#Requirements
- 3 number of ssl certificate key(be in project root)
  - sellerhub.co.kr.20200831.key
  - sellerhub.co.kr.20200831.pem
  - sellerhub.co.kr.20200831-key.pem
  - https://drive.lately.co.kr/d/f/nUNRgTZRncNHV9Ie5R6JVk6zDN6kEkJi
- edit /etc/hosts
  - ```shell
      ## /etc/hosts
      127.0.0.1  test.sellerhub.co.kr
```
# Starts
```shell
npm start
```
