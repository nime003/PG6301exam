# PG6301exam
Hello!
MUST DO following in terminal:

npm install concurrently
npm install axios
npm install express
npm install cors

or else you will get errors

here is my final solution. 
It's a bit wonky mut it makes do in my opinion. I've chosen to use local json files as my databse as i couldn't get mongodb to work.
As for Azure developement i tried multiple ways of making a fat jar that would be possible to deploy but through all my efforts i couldnt make it start the Express server and the frontend.
its started by running the start-server script in package.json then running the start script.
All tests run green.
A known bug is that for some reason the server stops responing at random times, solution is to restart server.
Accounts that can be used are in the users.json file
the one i used for debugging is johnDoe and password hello

I've accomplished running an express server with react as frontend, i've accomplished reading data from a "database" and making a functional login page that serves the user with a personalised greeting message.
i've accomplished only showing the default employee options to employees without "isadmin" status and all four options to employees with "isadmin" status however it changes nothing.

I know i CANNOT change database from mongodb but what else was i supposed to do :/ i've run out of time

(for some reason adding assignents and saving it to json file doesnt work anymore, same with logging hours)
