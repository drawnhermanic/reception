
[![Build status](https://ci.appveyor.com/api/projects/status/ehs1oynofatousqq?svg=true)](https://ci.appveyor.com/project/RichardNewman/reception)

## Description

A simple app to record visitors. 

Users are registered with basic credentials or OAuth. 

1. User registers or signs in
2. User records visit details
3. User ends visit

### Admin

Admin users can log in and see a record of all visitors

## Future development

* Filter visitors on admin page based on date. 
* Use refresh token
* Integrate with Azure AD to find Barnardos employees
* Add notifications so host is notified that a visitor has arrived 

## Install Dependencies

After creating your project go to your `Reception` folder and install your client App dependencies with:

    $ npm install

If your IDE doesn't automatically install your .NET NuGet Dependencies, you can manually install them with:

    $ dotnet restore

Add the dev cert for https

    $ dotnet dev-certs https --trust
    
## Dev Workflow

Start a [watched .NET Core build](https://docs.servicestack.net/templates-websites#watched-net-core-builds) in the background from the command-line with:

    $ dotnet watch run

In a new terminal window start a watched nuxt dev server build with:

    $ npm run dev

Then open [http://localhost:3000](http://localhost:3000) in your browser to view your App served directly from Nuxt.js dev server and will proxy all Server requests to ServiceStack Server running on [http://localhost:5000](http://localhost:5000).

## Update DTOs

Whilst Nuxt.js is a JavaScript (ES 6/7) App it still benefits from [ServiceStack's TypeScript Add Reference](https://docs.servicestack.net/typescript-add-servicestack-reference) where you can generate typed DTOs with the `dtos` npm script:

    $ npm run dtos

This will update the Servers `dtos.ts` and generate its corresponding `dtos.js` which can be imported as normal classes as seen in 
[gateway.js](https://github.com/NetCoreTemplates/vue-nuxt/blob/master/Reception/src/shared/gateway.js#L3). Despite the App not being built with TypeScript, developing using a "TypeScript-aware" IDE like VS Code will still be able to utilize the TypeScript classes in [@servicestack/client](https://github.com/ServiceStack/servicestack-client) and the generated `dtos.ts` to provide a rich, typed intelli-sense experience.

## Generate Static Production Build

Most of the time during development you'll be viewing your App through Nuxt.js dev server to take advantage of it's Hot Module Replacement for instant UI updates. At any time you can also view a production build of your App with:

    $ npm run build

Which will generate an encapsulated production build of your App in `/wwwroot` which you can view running from your ServiceStack Server App directly:

 - http://localhost:5000

## Publishing App for Deployment

To create a release client and server build of your App run:

    $ npm run publish

Which will publish your App to `bin/Release/netcoreapp3.1/publish` which you can deploy as a standard .NET Core App.


## Provision an environment

#### Prerequisites
* [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

Commands can be run individual through the Azure Cloud Shell or via powershell. If running via powershell, change the extension to .ps1.
The script will create a app service under a resource group.

1. Run the provision.azcli script in the 'Scripts' folder. 

2. If required, install the SSL certificate (found in the 'Scripts' folder along with the installation script). After the application has been installed the website bindings would need to be configured to reference the certificate. A CNAME entry needs to be requested from IT Support. Provide the DNS label that has been created from the provisioning script.