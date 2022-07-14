echo "wait for mysql server"
# Local .env
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
sleep 55
echo "sync database"
npx sequelize-cli db:create
npx sequelize-cli db:migrate