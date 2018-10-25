# Create CloudFormation Stack
echo "Validating template"
TMP_code=`aws cloudformation validate-template --template-body file://./csye6225-cf-networking.json`
if [ -z "$TMP_code" ]
then
	echo "Template error exiting!"
	exit 1
fi
echo "Cloudformation template validation success"

echo "Creating CloudFormation Stack"

CRTSTACK_Code=`aws cloudformation create-stack --stack-name $1 --template-body file://./csye6225-cf-networking.json --parameters ParameterKey=NetworkStackNameParameter,ParameterValue=$1`
if [ -z "$CRTSTACK_Code" ]
then
	echo "Stack Creation error exiting!"
	exit 1
fi
aws cloudformation wait stack-create-complete --stack-name $1
echo "Network Stack Created"
echo "Check AWS Cloudformation"
