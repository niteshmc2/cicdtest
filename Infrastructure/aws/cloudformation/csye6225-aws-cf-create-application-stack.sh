#User Inputs:
echo "Please enter Application Stack Name:"
read appStackName
if [ -z "$appStackName" ]
then
	echo "StackName error exiting!"
	exit 1
fi
echo "$appStackName"

echo "Please enter Network Stack Name:"
read networkStackName
if [ -z "$networkStackName" ]
then
	echo "StackName error exiting!"
	exit 1
fi
echo "$networkStackName"

# Create CloudFormation Stack
echo "Validating template"
TMP_code=`aws cloudformation validate-template --template-body file://./csye6225-cf-application.json`
if [ -z "$TMP_code" ]
then
	echo "Template error exiting!"
	exit 1
fi
echo "Cloudformation template validation success"

echo "Now Creating CloudFormation Stack"

CRTSTACK_Code=`aws cloudformation create-stack --stack-name $appStackName --template-body file://./csye6225-cf-application.json --parameters ParameterKey=NetworkStackNameParameter,ParameterValue=$networkStackName ParameterKey=ApplicationStackNameParameter,ParameterValue=$appStackName`
if [ -z "$CRTSTACK_Code" ]
then
	echo "Stack Creation error exiting!"
	exit 1
fi

aws cloudformation wait stack-create-complete --stack-name $appStackName
echo "Application Stack Created"
echo "Check AWS Cloudformation"
