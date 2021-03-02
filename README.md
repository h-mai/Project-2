# Project-2

PsuedoCode

User Story - Betting App between 2 Friends 

Users - 2 people can create a friendly bet between eachother for with in a predetermined period of time 

WHEN the first user makes a bet 
THEN the second user will then be notified via email of the deatils of the bet and wager
THEN the second user can accept or add modifications to the bet
IF modifications are made the first user must approve (handshake)
THEN the end date will be synced to BOTH users calendars 
THEN either user will need to perform the bet before the end date
WHEN the end date is reached either user can determine who has won lost or drawn. 
THEN a public record of the bets between these two users can be displayed on the page (highscores page)

Users can create multiple bets with multiple statuses - APPROVED, PENDING, ENDED 

MVP:

-database
-API - googlecalendar
-sending emails
-date/time library
-css library, bootstrap
-figma for wireframing
-passport - signin authentication

Bets Table inputs:

id 
userID1
userID2
Wager
Bet
TimeCreated
TimeExpire
Votes1
Votes2
Winner (won, lost, draw)
Status (approve, pending, ended)

User Table inputs: 

id
name
email 
password

Stretch Goals:

-changing points system to money
-duplicate the bet to use as you own
-integrate to pay gateways 
-mobile app and notifications


