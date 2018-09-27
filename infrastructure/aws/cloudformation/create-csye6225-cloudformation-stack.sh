# Create CloudFormation Stack
echo "Validating template"
aws cloudformation validate-template --template-body file://./cloudformation-ec2.json
echo "Cloudformation template validation success"
echo "Creating CloudFormation Stack"
aws cloudformation create-stack --stack-name $1  --template-body file://./cloudformation-ec2.json
echo "Cloudformation Stack created"


