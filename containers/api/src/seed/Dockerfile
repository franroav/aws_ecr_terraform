FROM mongo

COPY subscribers.json /subscribers.json

CMD mongoimport                                 \
    # Host (docker-compose service name)
    --host db-mongo                        \
    # user and pass from .env file
    --username $MONGO_INITDB_ROOT_USERNAME      \
    --password $MONGO_INITDB_ROOT_PASSWORD      \
    --authenticationDatabase admin              \
    # initial db and collection from .env file
    --db $MONGO_INITDB_DATABASE                 \
    --collection $MONGO_INITDB_COLLECTION       \
    --type json                                 \
    --file /subscribers.json                      \
    --jsonArray                                 \
    # WARNING! drop collection before run import
    --drop                                      \
    # verbose
    -v                                          \