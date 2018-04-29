# Screens

Simple screen prototyping tool built on top of CraftCMS. It's like Invision or Marvel, but free!

![Project View](assets/project_detail.png)
![Client Index](assets/client_index.png)

## Requirements
- MAMP
- PHP 7+
- MySQL 5+
- Node 8+
- Yarn 

## Local Development

*Local development requires MAMP.*

1. Install Composer dependencies
```
$ composer install
```
2. Install Yarn dependencies
```
$ yarn install
```
3. Copy `.env.example` to `.env` and add your settings.
4. Pull down DB backup and import into your local MySQL environment.
5. Point `screens.local` in your hosts (via MAMP or hosts file) to the `web` directory and restart MAMP servers.
6. Start local development server for live reload changes
```
$ yarn start
```

## To Do

* Proper migrations
* Screen specific URLs
* Loading states maybe?