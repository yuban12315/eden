# Eden Web-React

一个简单的自用小说管理网站

快速搭建原型，使用目前正在使用的技术，相关的配置不太多苛求

- ArcoDesgin
- WebPack
- StyledComponents

## 项目初期设想（更新于 2021.11.21）

作为 Eden 项目的 Web 端，Web 的主要功能是展示 MarkDown 文档，也保有一定的编辑功能。

在 Web 项目的早期阶段，开发都在一台电脑上，所以优先实现编辑功能，将接口调通之后就可以移植到其他端。

初期优先使用本地缓存，可以考虑 IndexDB，在功能完善后再开发 DB

### 文章管理

文章->文集

### 功能记录

1. 支持存储到 IndexDB，并支持导出成文件
