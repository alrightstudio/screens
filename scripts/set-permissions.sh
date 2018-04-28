#!/bin/bash

# Write proper directory permissions
chmod    744 .env
chmod    744 composer.json
chmod    744 composer.lock
chmod    744 config/license.key
chmod -R 744 storage
chmod -R 744 vendor