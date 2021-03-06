[![Codeship Status for sneelagiri/ticketGet-server](https://app.codeship.com/projects/a669e1a0-5261-0138-9828-32c16e40bf41/status?branch=master)](https://app.codeship.com/projects/390433)

# 🎟️ TicketGet 🎟️

![Preview](https://i.imgur.com/sr0gVYK.png)

## What this project is about

This is my own attempt at making a platform where buyers and sellers can meet to buy/sell event tickets. For more info on why I am doing this, checkout: **[Goals for this project](#goals-for-this-project)**

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Goals for this project](#goals-for-this-project)**
- **[Requirements briefing](#requirements)**
- **[Features built so far overview with commits](#features-built-so-far-overview-with-commits)**
- **[My git workflow](#my-git-workflow)**

## Technologies used

#### 👀👇 Click links to view some samples in this project 👇👀

- **[Express](./index.js)**  
- **[Sequelize & PostgreSQL](./tickets/model.js)**
- **[BCrypt & JWTs](./authentication)**
  

## Goals for this project:

- Show my teachers what I have learned 
- Make use of all the tools and technologies that I have learned to use over the duration of the course
- **[To showcase disciplined git usage](#my-git-workflow)**

## Requirements

Checkout out: **[requirements.md](./requirements.md)**

## Features built so far overview with commits

#### 👀👇 Click links to view the commits 👇👀

- **[Risk Algorithm](https://github.com/sneelagiri/ticketGet-server/commit/f89d74ee7b4d4651b0d939b0459eca51c13e8437)**
- **[Adding Events](https://github.com/sneelagiri/ticketGet-server/commit/6a7ca87307efc7d5957661110a4b27e5247ecda0)**
- **[Authentication](https://github.com/sneelagiri/ticketGet-server/commit/8fea9a61e63f0a31e9a41a5f7de241b6d5b5221f)**
- **[Pagination](https://github.com/sneelagiri/ticketGet-server/commit/7eaf81c191f395640b51f6674edeb7c5ea04214b)**
- **[Show only future events](https://github.com/sneelagiri/ticketGet-server/commit/39e5e1ead598a48823193a742960c4a5e98370ef)**

## My git workflow

In this project I try to use:

- Good commit messages
- Pull requests with summaries

If you have feedback to improve my git usage: **[please drop me a line!](https://www.linkedin.com/in/shashank-neelagiri/)** 

Here is my branching model for this project.

```
master (auto deploys) ____________________
                         \           /
dev                       \_commits_/- pull request
```
