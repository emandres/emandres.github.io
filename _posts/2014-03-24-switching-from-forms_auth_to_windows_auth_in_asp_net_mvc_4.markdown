---
layout: default
title: Switching from Forms Authentication to Windows Authentication in ASP.NET MVC 4
---

{{ page.title }}
===========

I recently had the pleasure of trying to convert an ASP.NET MVC 4 project from Forms based authentication to Windows based. Since this seems to be completely undocumented on the internet, I thought I'd write down my solution.

Let's start with your project file. This will be the `.csproj` file created with your web project. Open the file in a text editor. Toward the top of your file you should find some XML like this.

    <IISExpressWindowsAuthentication/>

Now, a sane person would look at that particular gem of obviousness and think "Okay, it looks like IIS Express is configured to use Windows Authentication." Sanity, in this case, would be wrong. The `<IISExpressWindowsAuthentication>` tag only enables windows authentication if you put "enabled" inside.

    <IISExpressWindowsAuthentication>enabled</IISExpressWindowsAuthentication>

This change allows IIS Express to accept Windows Authentication for us. Next, we need to let ASP.NET know that we want to use Windows Authentication. To do that you need to patch your `Web.config` file.

    <configuration>
      <system.web>
        <authentication mode="Windows" />
      </system.web>
    </configuration>

This should be enough get ASP.NET to start using Windows auth. However, you will likely have an Account controller and models sticking around from the project template. You probably want to delete these, and remove any references to WebMatrix. See [this StackOverflow question](http://stackoverflow.com/questions/5009565/asp-net-mvc3-and-windows-auth-on-iis-keeps-redirecting-to-account-login) for details why.
