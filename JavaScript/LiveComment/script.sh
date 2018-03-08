npm init
npm install -g express body-parser path --save
npm install pusher --save
curl -H "Content-Type: application/json" -X POST -d '{"name": "Ashutosh Narang", "email":"ashutoshnarang80@gmail.com", "comment": "Creating a smaple comment"}' http://localhost:9000/comment
