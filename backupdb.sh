#!/bin/bash

DB_NAME="standing"
COLLECTION_NAME="people"

mongoexport --db $DB_NAME --collection $COLLECTION_NAME --out dbbak.json
