
echo $1

RT_ID=`aws ec2 describe-route-tables --filters "Name=tag:Name, Values=$1" | jq '.RouteTables[0].RouteTableId' | tr -d '"' `
#echo $RT_ID
if [ $RT_ID = "null" ]
then
	echo "Error occurred, Route table not found, exiting!"
	exit 1
fi

RT_JS=`aws ec2 describe-route-tables --filters "Name=tag:Name, Values=$1"`
RT_AR=`echo $RT_JS | jq '.RouteTables[0].Associations'`
echo "Route Table fetched"
if [ "$RT_AR" = "[]" ]
then
	echo "No associations found"
else
	for row in $(echo "${RT_AR}" | jq -c '.[]')
	do
   		TEMP=`echo $row | jq '.RouteTableAssociationId' | tr -d '"'`
   		echo "Deleting Association"
   		aws ec2 disassociate-route-table --association-id $TEMP
	done
fi

aws ec2 delete-route-table --route-table-id $RT_ID
echo "Route Table deleted"


echo $2
IG_ID=`aws ec2 describe-internet-gateways --filters "Name=tag:Name, Values=$2" | jq '.InternetGateways[0].InternetGatewayId' | tr -d '"'`
#echo $IG_ID
if [ $IG_ID = "null" ]
then
	echo "Error occurred, Internet Gateway not found, exiting!"
	exit 1
fi
VPC_ID=`aws ec2 describe-vpcs --filter "Name=tag:Name, Values=$6" | jq '.Vpcs[0].VpcId' | tr -d '"'`
#echo $VPC_ID
if [ $VPC_ID = "null" ]
then
	echo "Error occurred, VPC not found, exiting!"
	exit 1
fi
echo "VPC fetcted"
echo "Internet gateway fetched"
aws ec2 detach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID

aws ec2 delete-internet-gateway --internet-gateway-id $IG_ID
echo "Internet gateway deleted"


echo $3
SUB1_ID=`aws ec2 describe-subnets --filter "Name=tag:Name, Values=$3" | jq '.Subnets[0].SubnetId' | tr -d '"'`
#echo $SUB1_ID
if [ $SUB1_ID = "null" ]
then
	echo "Error occurred, Subnet1 not found,exiting!"
	exit 1
fi
echo "Subnet1 fetched"
aws ec2 delete-subnet --subnet-id $SUB1_ID
echo "Subnet1 deleted"

echo $4
SUB2_ID=`aws ec2 describe-subnets --filter "Name=tag:Name, Values=$4" | jq '.Subnets[0].SubnetId' | tr -d '"'`
#echo $SUB2_ID
if [ $SUB2_ID = "null" ]
then
	echo "Error occurred, Subnet2 not found, exiting!"
	exit 1
fi
echo "Subnet2 fetched"
aws ec2 delete-subnet --subnet-id $SUB2_ID
echo "Subnet2 deleted"


echo $5
SUB3_ID=`aws ec2 describe-subnets --filter "Name=tag:Name, Values=$5"| jq '.Subnets[0].SubnetId' | tr -d '"'`
#echo $SUB3_ID
if [ $SUB3_ID = "null" ]
then
	echo "Error occurred, Subnet3 not found, exiting!"
	exit 1
fi
echo "Subnet3 fetched"
aws ec2 delete-subnet --subnet-id $SUB3_ID
echo "Subnet3 deleted"

echo $6

aws ec2 delete-vpc --vpc-id $VPC_ID

echo "VPC deleted"

