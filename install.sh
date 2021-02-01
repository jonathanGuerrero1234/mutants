echo 'inicio de inistalacion'

echo 'calculate stats build started'
cd lambdas/calculateStats/
npm i
npm run build
echo 'calculate stats build finish'


echo 'find mutant build started'
cd ../findMutantLambda/
npm i
npm run build
echo 'find mutatn build finished'

echo 'terraform init'
cd ../../terraform/  
terraform init 
terraform plan 
terraform apply 
echo 'terraform finished'