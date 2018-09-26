VPC_ID=`aws ec2 create-vpc --cidr-block 10.0.0.0/16 | jq '.Vpc.VpcId' | tr -d '"'`
if [ -z "$VPC_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "VPC created"
aws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=CLOUD_STACK-csye6225-vpc
SUB1_ID=`aws ec2 create-subnet --availability-zone us-east-1c --cidr-block 10.0.2.0/24 --vpc-id $VPC_ID | jq '.Subnet.SubnetId' | tr -d '"'`
if [ -z "$SUB1_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Subnet1 created"
SUB2_ID=`aws ec2 create-subnet --availability-zone us-east-1a --cidr-block 10.0.1.0/24 --vpc-id $VPC_ID | jq '.Subnet.SubnetId' | tr -d '"'`
if [ -z "$SUB2_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Subnet2 created"
SUB3_ID=`aws ec2 create-subnet --availability-zone us-east-1b --cidr-block 10.0.0.0/24 --vpc-id $VPC_ID | jq '.Subnet.SubnetId' | tr -d '"'`
if [ -z "$SUB3_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Subnet3 created"
IG_ID=`aws ec2 create-internet-gateway | jq '.InternetGateway.InternetGatewayId' | tr -d '"'`
if [ -z "$IG_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Internet gateway created"
aws ec2 create-tags --resources $IG_ID --tags Key=Name,Value=CLOUD_STACK-csye6225-InternetGateway
aws ec2 attach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID
RT_ID=`aws ec2 create-route-table --vpc-id $VPC_ID | jq '.RouteTable.RouteTableId' | tr -d '"'`
if [ -z "$RT_ID" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Route table created"
aws ec2 create-tags --resources $RT_ID --tags Key=Name,Value=CLOUD_STACK-csye6225-public-route-table
AS_ID1=`aws ec2 associate-route-table --route-table-id $RT_ID --subnet-id $SUB1_ID | jq '.AssociationId'`
if [ -z "$AS_ID1" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
AS_ID2=`aws ec2 associate-route-table --route-table-id $RT_ID --subnet-id $SUB2_ID | jq '.AssociationId'`
if [ -z "$AS_ID2" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
AS_ID3=`aws ec2 associate-route-table --route-table-id $RT_ID --subnet-id $SUB3_ID | jq '.AssociationId'`
if [ -z "$AS_ID3" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
RT=`aws ec2 create-route --destination-cidr-block 0.0.0.0/0 --route-table-id $RT_ID --gateway-id $IG_ID | jq '.Return'`
if [ -z "$RT" ]
then
	echo "Error occurred, exiting!"
	exit 1
fi
echo "Network setup successful"
