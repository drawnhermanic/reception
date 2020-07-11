$subscription = 'MyStory-DevTest'
$location = 'australiaeast'
$resourceGroupName = 'barnardos-reception'
$appServicePlanName = 'reception-appserviceplan'
$webAppName = 'barnardos-reception-web'

$fqdn= "reception.barnardos.org.au"
$pfxPath = "wildcard_barnardos_org_au.pfx"
$pfxPassword="<replace-with-your=.PFX-password>"

# login
az login

# set subscription to DevTest
az account set --subscription $subscription

# create resource group
az group create --name $resourceGroupName --location $location

# create app service plan in Basic tier (minimum required by custom domains)
az appservice plan create --name $appServicePlanName --resource-group $resourceGroupName --sku B1

# create web app 
az webapp create --name $webAppName --resource-group $resourceGroupName --plan $appServicePlanName --deployment-local-git

# Add the following to git 
# git remote add azure https://xxx.scm.azurewebsites.net/Reception.git
# git push azure master

echo "Configure a CNAME record that maps $fqdn to $webappname.azurewebsites.net"
read -p "Press [Enter] key when ready ..."

# Before continuing, go to your DNS configuration UI for your custom domain and follow the 
# instructions at https://aka.ms/appservicecustomdns to configure a CNAME record for the 
# hostname "www" and point it your web app's default domain name.

# Map your prepared custom domain name to the web app.
az webapp config hostname add --webapp-name $webAppName --resource-group $resourceGroupName --hostname $fqdn

# Upload the SSL certificate and get the thumbprint.
thumbprint=$(az webapp config ssl upload --certificate-file $pfxPath --certificate-password $pfxPassword --name $webAppName --resource-group $resourceGroupName --query thumbprint --output tsv)

# Binds the uploaded SSL certificate to the web app.
az webapp config ssl bind --certificate-thumbprint $thumbprint --ssl-type SNI --name $webAppName --resource-group $resourceGroupName

# destroy resource group and resources  
#az group delete --name $resourceGroupName -y