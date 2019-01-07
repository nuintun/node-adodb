# 5.0.1 / 2019/01/07
- Bump dev deps

# 5.0.0 / 2018/11/20

- Add `ADODB.PATH` configrue
- [Breaking] Drop `node < 6.0.0` support

# 4.2.2 / 2018/05/06

- Update typescript declaration file

# 4.2.1 / 2018/05/06

- Update json.js
- Add message for SQL contain reserved words and symbols [#55](https://github.com/nuintun/node-adodb/issues/55)

# 4.2.0 / 2018/05/02

- Support x64
- Fixed spawn error catch bugs

# 4.1.0 / 2018/04/28

- Refactoring code
- Add node 10 test

# 4.0.9 / 2018/03/31

- Clean code and file
- Update configure file
- Refactoring proxy.js, ensure the integrity of data reception

# 4.0.8 / 2018/03/14

- Clean `package.json`
- Use `require.resolve` instead `__dirname`

# 4.0.7 / 2018/01/15

- Update deps

# 4.0.6 / 2017/12/28

- Update deps
- Update docs
- Fixed .editorconfig

# 4.0.5 / 2017/11/27

- Improving structure
- Clean .npmignore
- Update deps
- Update test case

# 4.0.4 / 2017/11/22

- Update docs
- Update deps
- Use prettier format code
- Support binary data [#45](https://github.com/nuintun/node-adodb/issues/45)
- Support long SQL(use child process stdin instead of command line arguments)

# 4.0.3 / 2017/11/16

- `package.json` add `os` limit

# 4.0.2 / 2017/11/16

- Improving structure and clean code

# 4.0.1 / 2017/11/13

- Add js docs comments

# 4.0.0 / 2017/11/13

- Rewrite with ES6
- Add `schema` method
- Break changed
  - `execute` return a promise
  - `query` remove schema param(use `schema` method instead) and return a promise

# 3.1.3 / 2017-11-07

- Update deps
- Update docs

# 3.1.2 / 2017-09-13

- Update deps
- Update LICENSE
- Update rollup config
- Update editorconfig

# 3.1.1 / 2017-08-09

- Update deps
- Update examples and docs

# 3.1.0 / 2017-06-12

- Support fields schema [#31](https://github.com/nuintun/node-adodb/issues/31) [#34](https://github.com/nuintun/node-adodb/issues/34)
- Remove `message` param in event `done`

# 3.0.3 / 2017-05-11

- Update debug
- Update uglify-js

# 3.0.2 / 2017-04-27

- Remove `executeScalar` and combine it to `execute` method
- Use `debug` lib
- Use faster `events` lib
- Use `encodeURI` instead of `base64` encode
- Use new build tools `rollup` build cscript lib
- Add `AppVeyor` test and badges
- Add `Coveralls` badges
- Fixed a fatal error
- Better error catch

# 2.0.3 / 2016-02-29

- Fixed date parse bug

# 2.0.2 / 2015-06-01

- Bug fixed

# 2.0.1 / 2015-06-01

- Clean code

# 2.0.0 / 2015-05-31

- Fixed [#10](https://github.com/nuintun/node-adodb/issues/10)

# 1.3.3 / 2015-05-20

- Update json.js

# 1.3.2 / 2015-05-19

- Update license

# 1.3.1 / 2015-05-19

- Update deps

# 1.3.0 / 2015-04-20

- Add executeScalar method
- Update json shim code

# 1.2.0 / 2015-03-16

- Add encoding setting
- Support date/time
- Improve reliability
- Add english document

# 1.0.2 / 2014-04-07

- Change author name

# 1.0.1 / 2014-04-05

- Useing npm colors and add npm colors dependencies
