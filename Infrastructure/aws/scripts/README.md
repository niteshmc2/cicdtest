Run the Script files 

To create resources
bash csye6225-aws-networking-setup.sh

To delete resources
bash csye6225-aws-networking-teardown.sh <Route Table Name> <Internet gateway name> <subnet1 name> <subnet2 name> <subnet3 name> <vpc name>

The csye6225-aws-networking-setup.sh names the resources as follows
bash csye6225-aws-networking-teardown.sh CLOUD_STACK-csye6225-public-route-table CLOUD_STACK-csye6225-InternetGateway CLOUD_STACK-csye6225-sub1 CLOUD_STACK-csye6225-sub2 CLOUD_STACK-csye6225-sub3 CLOUD_STACK-csye6225-vpc

Note:[<> should not be included]
