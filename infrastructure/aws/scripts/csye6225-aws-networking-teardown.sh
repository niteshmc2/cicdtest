echo $1
RT_ID=`aws ec2 describe-route-tables --filters "Name=tag:Name, Values=$1" | jq '.RouteTables[0].RouteTableId' | tr -d '"' `

echo $RT_ID

if [ -z "$RT_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Route Table fetched"
aws ec2 delete-route-table --route-table-id $RT_ID
echo "Route Table deleted"
#echo $1
#aws ec2 describe-vpcs --filters "Name=tag:Name,Values=$1" 

