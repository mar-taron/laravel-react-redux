## React/Redux/Laravel API

## Installation

- Clone this repo
- from within the root directory:
    - npm install
    - composer install
    - php artisan key:generate
    - php artisan jwt:generate
    - set email log/pass in .env to get registration email
- Make sure your database is configured in the .env file and then
	- php artisan migrate
	- php artisan db:seed
I recommend you store it as JWT_SECRET in your .env file

## React Front end

npm run dev
