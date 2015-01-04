Read All About It
=================

####App Requirements
To create a news aggregator with the last 10 feeds from Sky, BBC and
Hacker News, using NodeJS and MongoDB. Bonus was to unit test the app
and use AngularJS to display data on the frontend.

####How to use the aggregator:

In order to run 'Read All About It' you will need NodeJS already installed on
your system. Go to http://nodejs.org and follow the installation
instructions.

Once NodeJs is installed clone this repository

``$ git clone git@github.com:ruthearle/read_all_about_it.git``

``$ cd cloned_directory`` into the newly cloned directory (replace ``cloned_directory`` with directory name).

``$ npm install`` install dependencies (modules).

Once all the modules have been installed you can start the server ``node server.js``.


Go to your browser of choice and type in ``http://localhost:8080`` and
voila!


The database is populated when the server is started. The data will
persist and you may render old feed items unless you clear the database (see Limitations). In order to clear the database go to a new terminal window and type:

``$ mongo``

``> use news``

``> db.dropDatabase()``

When you restart the server you will get new feed items in the database.


####Limitations
* The data is being pulled in from RSS feeds. And the database is
only being populated when the server is started. This is not ideal and
could not be used in production code.

  Next iteration: The database needs to be written
to periodically, i.e. hourly, to get the latest feed items.

* The data is stayng in the database indefinitely and I do not think
  the eventual volume is efficient or necessary for the task at hand.

  Next interation: Data needs to be expired after a set period.

* The data for Hacker News does not reflect the rich information that
  can be gleaned from their own API. However, because their API requires the news item number my solution could be used to harvest the news item number in order to interact with their API.

  Next iteration: Use Hacker News Firebase API to populate the database in order to display better information on the frontend of the app.

* The server has only one test for the main route. And there is no
  testing for the Angular frontend.

  Next interation: Fully test server and client-side.

