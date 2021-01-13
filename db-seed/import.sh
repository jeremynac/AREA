#! /bin/bash
import 
mongoimport --host mongo --port 27017 --db admin -u admin -p 'adpass' --collection script --type json --file /db-seed/init_scripts.json --jsonArray
mongoimport --host mongo --port 27017 --db admin -u admin -p 'adpass' --collection actions --type json --file /db-seed/init_actions.json --jsonArray
mongoimport --host mongo --port 27017 --db admin -u admin -p 'adpass' --collection reactions --type json --file /db-seed/init_reactions.json --jsonArray
mongoimport --host mongo --port 27017 --db admin -u admin -p 'adpass' --collection services --type json --file /db-seed/init_services.json --jsonArray